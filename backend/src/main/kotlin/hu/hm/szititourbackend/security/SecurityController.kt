package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.TeamPasswordUpdateDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.LoginData
import hu.hm.szititourbackend.extramodel.LoginResponse
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_GOOGLE_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_PASSWORD_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_TOKEN_ID
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.PasswordUtils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/auth")
class SecurityController(private val teamService: TeamService, private val securityTokenService: SecurityTokenService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping
    fun authorize(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<LoginResponse> {
        val verification = securityTokenService.verifyToken(token)
        logger.debug("Authorize me ${verification.teamId}")

        if (!verification.verified) {
            throw CustomException("VERIFICATION FAILED", HttpStatus.UNAUTHORIZED, MessageConstants.VERIFICATION_FAILED)
        }
        try {
            val t = teamService.getTeamById(verification.teamId)
            return ResponseEntity(LoginResponse(true, "Authorization successful", MessageConstants.AUTH_SUCCESS, t.convertToDto()), HttpStatus.OK)
        } catch (e: CustomException) {
            if (e.statusCode == HttpStatus.NOT_FOUND) {
                throw CustomException("Team not found", HttpStatus.UNAUTHORIZED, MessageConstants.TEAM_NOT_FOUND)
            } else {
                throw e
            }
        }
    }

    @GetMapping("verifyEmail/{token}")
    fun verifyEmailWithToken(@PathVariable token: String): ResponseEntity<Response> {
        logger.debug("Verify email")
        val verification = securityTokenService.verifyEmailVerificationToken(token)
        return if (verification.verified) {
            teamService.verifyEmail(verification.teamId)
            ResponseEntity(Response(true, message = "Email verified", MessageConstants.EMAIL_VERIFIED), HttpStatus.OK)
        } else {
            ResponseEntity(Response(false, "Email verification failed", verification.messageCode), HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("login/google")
    fun authorizeByGoogle(
            @RequestHeader(HEADER_GOOGLE_TOKEN) googleToken: String,
            @RequestBody clientData: ClientData,
            request: HttpServletRequest,
            response: HttpServletResponse
    ): ResponseEntity<LoginResponse> {
        logger.debug("Authorize by google")
        val googleAccount = securityTokenService.verifyGoogleToken(googleToken)
        val googleResponse = teamService.continueWithGoogle(googleAccount)

        clientData.ipAddress = request?.remoteAddr ?: "unknown"
        val client = teamService.addClient(googleResponse.team, clientData, true)
        val token = securityTokenService.generateToken(team = googleResponse.team, client.tokenId, client.expireAt)
        response.addHeader(HEADER_TOKEN, "Bearer $token")
        response.addHeader(HEADER_TOKEN_ID, client.tokenId)
        if (googleResponse.isCreation) {
            return ResponseEntity(LoginResponse(true, "Register successful", MessageConstants.REGISTER_SUCCESS, googleResponse.team.convertToDto()), HttpStatus.OK)
        }
        return ResponseEntity(LoginResponse(true, "Login successful", MessageConstants.LOGIN_SUCCESS, googleResponse.team.convertToDto()), HttpStatus.OK)
    }

    @PostMapping("login")
    fun login(auth: Authentication, @RequestBody clientData: ClientData, request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<LoginResponse> {
        logger.info("Login for ${auth.name} - remote: ${request?.remoteAddr} - forwarded: ${request.getHeader("X-Forwarded-For")} - real: ${request.getHeader("X-Real-IP")}")

        val team = teamService.getTeamByEmail(email = auth.name)
        if (!team.enabled) {
            throw CustomException("User is not activated", HttpStatus.FORBIDDEN, MessageConstants.TEAM_INACTIVE)
        }
        clientData.ipAddress = request?.remoteAddr ?: "unknown"
        val client = teamService.addClient(team, clientData, false)
        val token = securityTokenService.generateToken(team = team, client.tokenId, client.expireAt)
        response.addHeader(HEADER_TOKEN, "Bearer $token")
        response.addHeader(HEADER_TOKEN_ID, client.tokenId)
        return ResponseEntity(LoginResponse(true, "Login Successful", MessageConstants.LOGIN_SUCCESS, team.convertToDto()), HttpStatus.OK)
    }

    @PostMapping("register")
    fun register(@RequestBody credentials: LoginData): ResponseEntity<Response> {
        logger.debug("Register for ${credentials.name}")
        if (credentials.email.isNullOrEmpty() || credentials.password.isNullOrEmpty()) {
            throw CustomException("Email or password is empty", HttpStatus.BAD_REQUEST, MessageConstants.EMPTY_CREDENTIALS)
        }
        if (PasswordUtils.validateEmail(credentials.email)) {
            if (PasswordUtils.validatePassword(credentials.password)) {
                try {

                    teamService.addTeam(
                            Team(
                                    email = credentials.email,
                                    password = PasswordUtils.encryptPassword(credentials.password),
                                    name = credentials.name
                            )
                    )
                } catch (e: DataIntegrityViolationException) {
                    throw CustomException("Email is already in use", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_TAKEN)
                }
                return ResponseEntity(Response(true, message = "Register Successful", MessageConstants.REGISTER_SUCCESS), HttpStatus.CREATED)
            } else {
                throw CustomException("Password is invalid", HttpStatus.BAD_REQUEST, MessageConstants.PASSWORD_INVALID)
            }
        } else {
            throw CustomException("Email is invalid", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_INVALID)
        }
    }

    @PostMapping("logout")
    fun logout(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<Response> {
        val verification = securityTokenService.verifyToken(token)
        if (verification.verified) {
            teamService.revokeClient(verification.tokenId, verification.teamId)
            return ResponseEntity<Response>(Response(success = true, messageCode = MessageConstants.LOGOUT_SUCCESS), HttpStatus.OK)
        }
        throw CustomException("Logout invalid token", HttpStatus.FORBIDDEN, MessageConstants.AUTH_TOKEN_INVALID)
    }

    @PostMapping("forgot-password")
    fun forgotPasswordRequest(@RequestBody email: String): ResponseEntity<Response> {
        logger.debug("Forgot password request")
        teamService.forgotTeamPasswordRequest(email)
        return ResponseEntity(Response(success = true, messageCode = MessageConstants.PASSWORD_CHANGE_EMAIL_SENT, message = "Password forgot email sent to user"), HttpStatus.OK)
    }

    @PostMapping("password")
    fun forgotPassword(@RequestHeader(HEADER_PASSWORD_TOKEN) token: String, @RequestBody passwordUpdateDto: TeamPasswordUpdateDto): ResponseEntity<Response> {
        logger.debug("Forgot password change")
        teamService.updateTeamPassword(passwordUpdateDto, token)
        return ResponseEntity(Response(true, message = "Password changed", MessageConstants.PASSWORD_CHANGED), HttpStatus.OK)
    }

}
package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.LoginData
import hu.hm.szititourbackend.extramodel.LoginResponse
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_GOOGLE_TOKEN
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_TOKEN_ID
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.PasswordUtils
import hu.hm.szititourbackend.util.Utils
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import javax.servlet.http.HttpServletRequest


@RestController
@RequestMapping("/auth")
class SecurityController(private val teamService: TeamService, private val securityService: SecurityService) {

    val logger: Logger = LoggerFactory.getLogger(SecurityController::class.java)

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping
    fun authorize(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<LoginResponse> {
        val verification = securityService.verifyToken(token)
        logger.debug("Authorize me ${verification.teamId}")

        if(!verification.verified) {
            throw CustomException("VERIFICATION FAILED", HttpStatus.UNAUTHORIZED)
        }
        try {
            val t = teamService.getTeamById(verification.teamId)
            return ResponseEntity(LoginResponse(true, "", "", t.convertToDto()), HttpStatus.OK)
        } catch (e: CustomException) {
            if (e.statusCode == HttpStatus.NOT_FOUND) {
                throw CustomException("User not found", HttpStatus.UNAUTHORIZED)
            } else {
                throw e
            }
        }
    }

    @GetMapping("verifyEmail/{token}")
    fun verifyEmailWithToken(@PathVariable token: String): ResponseEntity<Response> {
        logger.debug("Verify email")
        val verification = securityService.verifyEmailVerificationToken(token)
        return if(verification.verified) {
            teamService.verifyEmail(verification.teamId)
            ResponseEntity(Response(true, "", "Email verified"), HttpStatus.OK)
        } else {
            ResponseEntity(Response(false, "verification.errorMessage"), HttpStatus.BAD_REQUEST)
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
        val googleAccount = securityService.verifyGoogleToken(googleToken)
        val googleResponse = teamService.continueWithGoogle(googleAccount)

        clientData.ipAddress = request.remoteAddr
        val client = teamService.addClient(googleResponse.team, clientData, true)
        val token = securityService.generateToken(team = googleResponse.team, client.tokenId, client.expireAt)
        response.addHeader(HEADER_TOKEN, "Bearer $token")
        response.addHeader(HEADER_TOKEN_ID, client.tokenId)
        if(googleResponse.isCreation) {
            return ResponseEntity(LoginResponse(true, "", "Register Successful", googleResponse.team.convertToDto()), HttpStatus.OK)
        }
        return ResponseEntity(LoginResponse(true, "", "Login Successful", googleResponse.team.convertToDto()), HttpStatus.OK)
    }

    @PostMapping("login")
    fun login(auth: Authentication, @RequestBody clientData: ClientData, request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<LoginResponse> {
        logger.info("Login for ${auth.name} - remote: ${request.remoteAddr} - forwarded: ${request.getHeader("X-Forwarded-For")} - real: ${request.getHeader("X-Real-IP")}")

        val team = teamService.getTeamByEmail(email = auth.name)
        if(!team.enabled) {
            throw CustomException("User is not activated", HttpStatus.FORBIDDEN)
        }
        clientData.ipAddress = request.remoteAddr
        val client = teamService.addClient(team, clientData, false)
        val token = securityService.generateToken(team = team, client.tokenId, client.expireAt)
        response.addHeader(HEADER_TOKEN, "Bearer $token")
        response.addHeader(HEADER_TOKEN_ID, client.tokenId)
        return ResponseEntity(LoginResponse(true, "", "Login Successful", team.convertToDto()), HttpStatus.OK)
    }

    @PostMapping("register")
    fun register(@RequestBody credentials: LoginData): ResponseEntity<Response> {
        logger.debug("Register for ${credentials.name}")
        if (credentials.email.isNullOrEmpty() || credentials.password.isNullOrEmpty()) {
            throw CustomException("Email or password is empty", HttpStatus.BAD_REQUEST)
        }
        if (Utils.validateEmail(credentials.email) && Utils.validatePassword(credentials.password)) {
            try {

                teamService.addTeam(
                        Team(
                                email = credentials.email,
                                password = PasswordUtils.encryptPassword(credentials.password),
                                name = credentials.name
                        )
                )
            } catch (e: DataIntegrityViolationException) {
                throw CustomException("Email is already in use", HttpStatus.BAD_REQUEST)
            }
            return ResponseEntity(Response(true, "", "Register Successful"), HttpStatus.CREATED)
        } else {
            throw CustomException("Email or password is invalid", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("logout")
    fun logout(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<Response> {
        val verification = securityService.verifyToken(token)
        if(verification.verified) {
            teamService.revokeClient(verification.tokenId, verification.teamId)
            return ResponseEntity<Response>(Response(success = true), HttpStatus.OK)
        }
        throw CustomException("Logout invalid token", HttpStatus.BAD_REQUEST)
    }

}
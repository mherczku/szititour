package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.response.TeamPasswordUpdateDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.dto.request.RegisterRequest
import hu.hm.szititourbackend.dto.response.LoginResponse
import hu.hm.szititourbackend.dto.response.Response
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
@Transactional
class SecurityService @Autowired constructor(private val teamService: TeamService, private val securityTokenService: SecurityTokenService) {

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY
    fun authorize(token: String): LoginResponse {
        val verification = securityTokenService.verifyToken(token)

        if (!verification.verified) {
            throw CustomException("VERIFICATION FAILED", HttpStatus.UNAUTHORIZED, MessageConstants.VERIFICATION_FAILED)
        }
        try {
            val t = teamService.getTeamById(verification.teamId)
            return LoginResponse(true, "Authorization successful", MessageConstants.AUTH_SUCCESS, t.convertToDto())
        } catch (e: CustomException) {
            if (e.statusCode == HttpStatus.NOT_FOUND) {
                throw CustomException("Team not found", HttpStatus.UNAUTHORIZED, MessageConstants.TEAM_NOT_FOUND)
            } else {
                throw e
            }
        }
    }

    fun authorizeWithGoogle(googleToken: String, clientData: ClientData, request: HttpServletRequest, response: HttpServletResponse): LoginResponse {
        val googleAccount = securityTokenService.verifyGoogleToken(googleToken)
        val googleResponse = teamService.continueWithGoogle(googleAccount)

        clientData.ipAddress = request?.remoteAddr ?: "unknown"
        val client = teamService.addClient(googleResponse.team, clientData, true)
        val token = securityTokenService.generateToken(team = googleResponse.team, client.tokenId, client.expireAt)
        response.addHeader(SecurityTokenService.HEADER_TOKEN, "Bearer $token")
        response.addHeader(SecurityTokenService.HEADER_TOKEN_ID, client.tokenId)
        if (googleResponse.isCreation) {
            return LoginResponse(true, "Register successful", MessageConstants.REGISTER_SUCCESS_GOOGLE, googleResponse.team.convertToDto())
        }
        return LoginResponse(true, "Login successful", MessageConstants.LOGIN_SUCCESS, googleResponse.team.convertToDto())

    }

    fun login(email: String, request: HttpServletRequest, response: HttpServletResponse, clientData: ClientData): LoginResponse {
        val team = teamService.getTeamByEmail(email = email)
        if (!team.enabled) {
            throw CustomException("User is not activated", HttpStatus.FORBIDDEN, MessageConstants.TEAM_INACTIVE)
        }
        clientData.ipAddress = request?.remoteAddr ?: "unknown"
        val client = teamService.addClient(team, clientData, false)
        val token = securityTokenService.generateToken(team = team, client.tokenId, client.expireAt)
        response.addHeader(SecurityTokenService.HEADER_TOKEN, "Bearer $token")
        response.addHeader(SecurityTokenService.HEADER_TOKEN_ID, client.tokenId)

        return LoginResponse(true, "Login Successful", MessageConstants.LOGIN_SUCCESS, team.convertToDto())
    }

    fun register(credentials: RegisterRequest): Response {
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
                return Response(true, message = "Register Successful", MessageConstants.REGISTER_SUCCESS)
            } else {
                throw CustomException("Password is invalid", HttpStatus.BAD_REQUEST, MessageConstants.PASSWORD_INVALID)
            }
        } else {
            throw CustomException("Email is invalid", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_INVALID)
        }
    }

    fun logout(token: String): Response {
        val verification = securityTokenService.verifyToken(token)
        if (verification.verified) {
            teamService.revokeClient(verification.tokenId, verification.teamId)
            return Response(success = true, messageCode = MessageConstants.LOGOUT_SUCCESS)
        }
        throw CustomException("Logout invalid token", HttpStatus.FORBIDDEN, MessageConstants.AUTH_TOKEN_INVALID)
    }

    fun forgotPasswordRequest(email: String): Response {
        teamService.forgotTeamPasswordRequest(email)
        return Response(success = true, messageCode = MessageConstants.PASSWORD_CHANGE_EMAIL_SENT, message = "Password forgot email sent to user")
    }

    fun forgotPassword(token: String, passwordUpdateDto: TeamPasswordUpdateDto): Response {
        teamService.updateTeamPassword(passwordUpdateDto, token)
        return Response(true, message = "Password changed", MessageConstants.PASSWORD_CHANGED)
    }

    fun verifyEmailWithToken(token: String): Response {
        val verification = securityTokenService.verifyEmailVerificationToken(token)
        return if (verification.verified) {
            teamService.verifyEmail(verification.teamId)
            Response(true, message = "Email verified", MessageConstants.EMAIL_VERIFIED)
        } else {
            Response(false, "Email verification failed", verification.messageCode)
        }
    }

}
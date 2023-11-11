package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.dto.request.RegisterRequest
import hu.hm.szititourbackend.dto.response.LoginResponse
import hu.hm.szititourbackend.dto.response.Response
import hu.hm.szititourbackend.dto.response.TeamPasswordUpdateDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_GOOGLE_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_PASSWORD_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.service.SecurityService
import hu.hm.szititourbackend.util.MessageConstants
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/auth")
class SecurityController(private val securityService: SecurityService, private val securityTokenService: SecurityTokenService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping
    fun authorize(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<LoginResponse> {
        val verification = securityTokenService.verifyToken(token)
        logger.debug("Authorize me ${verification.teamId}")

        if (!verification.verified) {
            throw CustomException("VERIFICATION FAILED", HttpStatus.UNAUTHORIZED, MessageConstants.VERIFICATION_FAILED)
        }
        return ResponseEntity(securityService.authorize(token), HttpStatus.OK)
    }

    @GetMapping("verifyEmail/{token}")
    fun verifyEmailWithToken(@PathVariable token: String): ResponseEntity<Response> {
        logger.debug("Verify email")
        val response =  securityService.verifyEmailWithToken(token)
        return if(response.success) {
            ResponseEntity(response, HttpStatus.OK)
        } else {
            ResponseEntity(response, HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("login/google")
    fun authorizeWihGoogle(
            @RequestHeader(HEADER_GOOGLE_TOKEN) googleToken: String,
            @RequestBody clientData: ClientData,
            request: HttpServletRequest,
            response: HttpServletResponse
    ): ResponseEntity<LoginResponse> {
        logger.debug("Authorize by google")
        return ResponseEntity(securityService.authorizeWithGoogle(googleToken, clientData, request, response), HttpStatus.OK)
    }

    @PostMapping("login")
    fun login(auth: Authentication, @RequestBody clientData: ClientData, request: HttpServletRequest, response: HttpServletResponse): ResponseEntity<LoginResponse> {
        logger.info("Login for ${auth.name}")
        return ResponseEntity(securityService.login(auth.name, request, response, clientData), HttpStatus.OK)
    }

    @PostMapping("register")
    fun register(@RequestBody credentials: RegisterRequest): ResponseEntity<Response> {
        logger.debug("Register for ${credentials.name}")
        return ResponseEntity(securityService.register(credentials), HttpStatus.CREATED)
    }

    @PostMapping("logout")
    fun logout(@RequestHeader(HEADER_TOKEN) token: String): ResponseEntity<Response> {
        return ResponseEntity<Response>(securityService.logout(token), HttpStatus.OK)
    }

    @PostMapping("forgot-password")
    fun forgotPasswordRequest(@RequestBody email: String): ResponseEntity<Response> {
        logger.debug("Forgot password request for $email")
        return ResponseEntity(securityService.forgotPasswordRequest(email), HttpStatus.OK)
    }

    @PostMapping("password")
    fun forgotPassword(@RequestHeader(HEADER_PASSWORD_TOKEN) token: String, @RequestBody passwordUpdateDto: TeamPasswordUpdateDto): ResponseEntity<Response> {
        logger.debug("Forgot password change")
        return ResponseEntity(securityService.forgotPassword(token, passwordUpdateDto), HttpStatus.OK)
    }

}
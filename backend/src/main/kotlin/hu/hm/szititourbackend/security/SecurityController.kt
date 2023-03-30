package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.LoginData
import hu.hm.szititourbackend.extramodel.LoginResponse
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.security.SecurityService.Companion.TOKEN_NAME
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.PasswordUtils
import hu.hm.szititourbackend.util.Utils
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/auth")
class SecurityController(private val teamService: TeamService, private val securityService: SecurityService) {

    //!//  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping
    fun authorize(
        @RequestHeader(TOKEN_NAME) token: String,
        response: HttpServletResponse
    ): ResponseEntity<LoginResponse> {
        val verification = securityService.verifyToken(token)
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

    @PostMapping("login")
    fun login(authentication: Authentication, response: HttpServletResponse): ResponseEntity<LoginResponse> {
        val team = teamService.getTeamByEmail(email = authentication.name)
        val token = securityService.generateToken(team = team)
        response.addHeader(TOKEN_NAME, "Bearer $token")
        return ResponseEntity(LoginResponse(true, "", "Login Successful", team.convertToDto()), HttpStatus.OK)
    }

    @PostMapping("register")
    fun register(@RequestBody credentials: LoginData): ResponseEntity<Response> {
        if (credentials.email.isNullOrEmpty() || credentials.password.isNullOrEmpty()) {
            throw CustomException("Email or password is empty", HttpStatus.BAD_REQUEST)
        }
        if (Utils.validateEmail(credentials.email) && Utils.validatePassword(credentials.password)) {
            try {
                teamService.addTeam(
                    Team(
                        email = credentials.email,
                        password = PasswordUtils.encryptPassword(credentials.password),
                        name = credentials.email.split('@')[0]
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

}
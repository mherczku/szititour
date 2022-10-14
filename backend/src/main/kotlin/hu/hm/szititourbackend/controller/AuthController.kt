package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.extramodel.LoginData
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.AuthUtils
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/auth")
class AuthController @Autowired constructor(private val teamService: TeamService) {

    @PostMapping("login")
    fun login(@RequestBody credentials: LoginData, response: HttpServletResponse): ResponseEntity<Response> {
        if(credentials.email.isNullOrEmpty() || credentials.password.isNullOrEmpty()) {
            return ResponseEntity(Response(false, "Email or password is empty"), HttpStatus.BAD_REQUEST)
        }
        val t = teamService.getTeamByEmail(email = credentials.email)
        if (t.isPresent) {
            val team =  t.get()
            if(team.password == credentials.password){
                val token = AuthUtils.createToken(team.id, team.admin)
                response.addHeader(AuthUtils.TOKEN_NAME, "Bearer $token")
                return ResponseEntity(Response(true, "", "Login Successful"), HttpStatus.OK)
            }
            return ResponseEntity(Response(false, "Email or password is wrong", ""), HttpStatus.UNAUTHORIZED)
        }
        else {
            return ResponseEntity(Response(false, "User not found", ""), HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("register")
    fun register(@RequestBody credentials: LoginData): ResponseEntity<Response> {
        if(credentials.email.isNullOrEmpty() || credentials.password.isNullOrEmpty()) {
            return ResponseEntity(Response(false, "Email or password is empty"), HttpStatus.BAD_REQUEST)
        }
        if (Utils.validateEmail(credentials.email) && Utils.validatePassword(credentials.password)) {
            try {
                teamService.addTeam(Team(email = credentials.email, password = credentials.password))
            } catch (e: DataIntegrityViolationException) {
                return ResponseEntity(Response(false, "Email is already in use", ""), HttpStatus.BAD_REQUEST)
            }
            return ResponseEntity(Response(true, "", "Register Successful"), HttpStatus.CREATED)
        }
        else {
            return ResponseEntity(Response(false, "Email or password is invalid", ""), HttpStatus.BAD_REQUEST)
        }
    }
}
package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.TeamDto
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.AuthUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/teams")
class TeamController @Autowired constructor(private val teamService: TeamService) {

    @PostMapping()
    fun addTeam(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @RequestBody team: Team): ResponseEntity<TeamDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newTeam = teamService.addTeam(team)
        return ResponseEntity(newTeam.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getTeamById(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @PathVariable id: Int): ResponseEntity<TeamDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val team: Optional<Team> = teamService.getTeamById(id)
        if (!team.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(team.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllTeams(@CookieValue(AuthUtils.COOKIE_NAME) token: String?): ResponseEntity<List<TeamDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val teams: MutableList<Team> = teamService.getAllTeam()
        return ResponseEntity(teams.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateTeam(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @RequestBody team: Team): ResponseEntity<TeamDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return ResponseEntity(teamService.updateTeam(team).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteTeamById(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            teamService.deleteTeamById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.TeamDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.TeamService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/teams")
class TeamController @Autowired constructor(private val teamService: TeamService) {

    @PostMapping()
    fun addTeam(@RequestBody team: Team): ResponseEntity<TeamDto> {
        val newTeam = teamService.addTeam(team)
        return ResponseEntity(newTeam.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getTeamById(@PathVariable id: Int): ResponseEntity<TeamDto?> {
        val team: Team = teamService.getTeamById(id)
        return ResponseEntity(team.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllTeams(): ResponseEntity<List<TeamDto>> {
        val teams: MutableList<Team> = teamService.getAllTeam()
        return ResponseEntity(teams.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateTeam(@RequestBody team: Team): ResponseEntity<TeamDto> {
        return ResponseEntity(teamService.updateTeam(team).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteTeamById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            teamService.deleteTeamById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND)
        }
    }
}
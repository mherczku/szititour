package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.TeamDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/teams")
class TeamController @Autowired constructor(private val teamService: TeamService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    @PostMapping()
    fun addTeam(@RequestBody team: Team): ResponseEntity<TeamDto> {
        logger.debug("Add team ${team.name}}")
        val newTeam = teamService.addTeam(team)
        return ResponseEntity(newTeam.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getTeamById(@PathVariable id: Int): ResponseEntity<TeamDto?> {
        logger.debug("Get team by id ${id}")
        val team: Team = teamService.getTeamById(id)
        return ResponseEntity(team.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllTeams(): ResponseEntity<List<TeamDto>> {
        logger.debug("Get all teams")
        val teams: MutableList<Team> = teamService.getAllTeam()
        return ResponseEntity(teams.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateTeam(@RequestBody team: Team): ResponseEntity<TeamDto> {
        logger.debug("Update team ${team.id}")
        return ResponseEntity(teamService.updateTeam(team).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteTeamById(@PathVariable id: Int): ResponseEntity<Nothing> {
        logger.debug("Delete team by id ${id}")
        return try {
            teamService.deleteTeamById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND, MessageConstants.TEAM_NOT_FOUND)
        }
    }
}
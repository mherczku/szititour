package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.TeamDto
import hu.hm.szititourbackend.dto.TeamUpdateProfileDto
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.repository.TeamRepository
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_USER
import hu.hm.szititourbackend.util.LocationUtils
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp
import java.util.*

@Service
@Transactional
class TeamService @Autowired constructor(private val teamRepository: TeamRepository, private val statusRepository: TeamGameStatusRepository) {

    fun getTeamByEmail(email: String): Optional<Team> {
        return teamRepository.findByEmail(email)
    }

    fun updateTeamProfile(teamId: Int, teamUpdateProfileDto: TeamUpdateProfileDto): Optional<TeamDto> {

        val updateTeamOptional = teamRepository.findById(teamId)
        if (!updateTeamOptional.isPresent) {
            return Optional.empty()
        }

        val updateTeam = updateTeamOptional.get()
        updateTeam.img = teamUpdateProfileDto.img ?: updateTeam.img
        updateTeam.password = teamUpdateProfileDto.password ?: PasswordUtils.encryptPassword(updateTeam.password)
        updateTeam.name = teamUpdateProfileDto.name ?: updateTeam.name
        updateTeam.members = teamUpdateProfileDto.members?.toMutableList() ?: updateTeam.members

        return Optional.of(this.updateTeam(updateTeam).convertToDto())
    }

    fun addTeam(team: Team): Team {
        team.role = ROLE_USER
        team.createdAt = Timestamp(System.currentTimeMillis())
        team.updatedAt = Timestamp(System.currentTimeMillis())
        return teamRepository.save(team)
    }

    fun getAllTeam(): MutableList<Team> {
        return teamRepository.findAll()
    }

    fun getTeamById(id: Int): Optional<Team> {
        return teamRepository.findById(id)
    }

    fun updateTeam(team: Team): Team {
        team.role = ROLE_USER
        team.updatedAt = Timestamp(System.currentTimeMillis())
        return teamRepository.save(team)
    }

    fun deleteTeamById(id: Int) {
        return teamRepository.deleteById(id)
    }

    fun getTeamsApplicationByTeamId(teamId: Int, gameId: Int): Optional<Application> {
        val team = this.getTeamById(teamId)
        if (!team.isPresent) {
            return Optional.empty()
        }
        return Optional.ofNullable(team.get().applications.find { it.game.id == gameId })
    }

    fun updateGameStatus(gameId: Int, theTeam: Team) {
        val gameStatus = theTeam.teamGameStatuses.find { it.game.id == gameId }
        if(gameStatus !== null && gameStatus.game.active){

            if(gameStatus.placeStatuses.size > gameStatus.nextUnreachedPlaceIndex) {
                val placeStatus = gameStatus.placeStatuses[gameStatus.nextUnreachedPlaceIndex]
                val place = gameStatus.game.places.find { it.id == placeStatus.placeId }
                if(place !== null) {
                    val distanceInMeter = LocationUtils.getDistance(place.latitude, place.longitude, theTeam.lastLatitude, theTeam.lastLongitude)
                    if(distanceInMeter <= 50) {
                        placeStatus.reached = true
                        gameStatus.nextUnreachedPlaceIndex = gameStatus.nextUnreachedPlaceIndex + 1
                        placeStatus.reachedAt = Timestamp(System.currentTimeMillis())
                        gameStatus.updatedAt = Timestamp(System.currentTimeMillis())
                        this.statusRepository.save(gameStatus)
                    }
                }
            }
        }
    }
}
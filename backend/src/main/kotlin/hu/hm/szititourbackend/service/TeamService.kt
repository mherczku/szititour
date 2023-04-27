package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.dto.TeamUpdateProfileDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.repository.TeamRepository
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_USER
import hu.hm.szititourbackend.util.LocationUtils
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp

@Service
@Transactional
class TeamService @Autowired constructor(private val teamRepository: TeamRepository, private val statusRepository: TeamGameStatusRepository) {

    fun getTeamByEmail(email: String): Team {
        val team = teamRepository.findByEmail(email)
        if(team.isPresent) {
            return team.get()
        } else {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND)
        }
    }

    fun updateTeamProfile(teamId: Int, teamUpdateProfileDto: TeamUpdateProfileDto): Team {

        val updateTeam = getTeamById(teamId)
        updateTeam.img = teamUpdateProfileDto.img ?: updateTeam.img
        updateTeam.password = teamUpdateProfileDto.password ?: PasswordUtils.encryptPassword(updateTeam.password)
        updateTeam.name = teamUpdateProfileDto.name ?: updateTeam.name
        updateTeam.members = teamUpdateProfileDto.members?.toMutableList() ?: updateTeam.members

        return this.updateTeam(updateTeam)
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

    fun getTeamById(id: Int): Team {
        val team =  teamRepository.findById(id)
        if(team.isPresent) {
            return team.get()
        } else {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND)
        }
    }

    fun updateTeam(team: Team, isAdminMethod: Boolean = false): Team {
        if(!isAdminMethod) {
            team.role = ROLE_USER
        }
        team.updatedAt = Timestamp(System.currentTimeMillis())
        return teamRepository.save(team)
    }

    fun deleteTeamById(id: Int) {
        val team = getTeamById(id)
        return teamRepository.deleteById(id)
    }

    fun getTeamsApplicationByTeamId(teamId: Int, gameId: Int): Application? {
        val team = this.getTeamById(teamId)
        return team.applications.find { it.game.id == gameId }
    }

    fun updateGameStatusAuto(gameId: Int, theTeam: Team) {
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
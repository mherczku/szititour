package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.dto.TeamUpdateProfileDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.GoogleAccount
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.repository.TeamRepository
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_ADMIN
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_USER
import hu.hm.szititourbackend.util.LocationUtils
import hu.hm.szititourbackend.util.PasswordUtils
import hu.hm.szititourbackend.util.PasswordUtils.encryptPassword
import hu.hm.szititourbackend.util.PasswordUtils.generatePassword
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp


@Service
@Transactional
class TeamService @Autowired constructor(private val securityService: SecurityService, private val teamRepository: TeamRepository, private val statusRepository: TeamGameStatusRepository, private val emailService: EmailService) {

    fun getTeamByEmail(email: String): Team {
        val team = teamRepository.findByEmail(email)
        if (team.isPresent) {
            return team.get()
        } else {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND)
        }
    }

    fun updateTeamProfile(teamId: Int, teamUpdateProfileDto: TeamUpdateProfileDto): Team {

        val updateTeam = getTeamById(teamId)
        updateTeam.img = teamUpdateProfileDto.img ?: updateTeam.img
        updateTeam.name = teamUpdateProfileDto.name ?: updateTeam.name
        updateTeam.email = teamUpdateProfileDto.email ?: updateTeam.email
        updateTeam.members = teamUpdateProfileDto.members?.toMutableList() ?: updateTeam.members
        if (!teamUpdateProfileDto.passwordBefore.isNullOrBlank() && !teamUpdateProfileDto.password.isNullOrBlank()) {
            if (PasswordUtils.encryptPassword(teamUpdateProfileDto.passwordBefore) == updateTeam.password) {
                updateTeam.password = PasswordUtils.encryptPassword(teamUpdateProfileDto.password)
            } else {
                throw CustomException("Wrong password", HttpStatus.BAD_REQUEST)
            }
        }

        return this.updateTeam(updateTeam, true)
    }

    fun addTeam(team: Team, isAdmin: Boolean = false, isTester: Boolean = false): Team {
        if (team.name.isBlank()) {
            team.name = team.email.split('@')[0]
        }
        if (isAdmin) {
            team.role = ROLE_ADMIN
        } else {
            team.role = ROLE_USER
        }
        team.enabled = isTester
        team.createdAt = Timestamp(System.currentTimeMillis())
        team.updatedAt = Timestamp(System.currentTimeMillis())
        val saved = teamRepository.save(team)
        if (!isTester) {
            try {
                emailService.sendWelcomeMail(team.email, team.name, verificationToken = securityService.generateEmailVerificationToken(team))
            } catch(e: Exception) {
                teamRepository.delete(team)
                throw e
            }
        }
        return saved
    }

    fun getAllTeam(): MutableList<Team> {
        return teamRepository.findAll()
    }

    fun getTeamById(id: Int): Team {
        val team = teamRepository.findById(id)
        if (team.isPresent) {
            return team.get()
        } else {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND)
        }
    }

    fun updateProfileEmail(teamId: Int, nextEmail: String): Team {
        val team = getTeamById(teamId)
        val teamWithEmail = teamRepository.findByEmail(nextEmail)
        if(teamWithEmail.isPresent) {
            throw CustomException("Email is already in use", HttpStatus.BAD_REQUEST)
        }
        team.nextEmail = nextEmail
        val updated = updateTeam(team, true)
        try {
            emailService.sendModifyEmailMail(team.nextEmail, team.name, securityService.generateEmailVerificationToken(updated))
            return updated
        } catch (e: Exception) {
            updated.nextEmail = ""
            updateTeam(updated)
            throw e
        }
    }

    fun updateTeam(team: Team, isAdminMethod: Boolean = false): Team {
        if (!isAdminMethod) {
            team.role = ROLE_USER
        }

        team.updatedAt = Timestamp(System.currentTimeMillis())
        return teamRepository.save(team)
    }

    fun deleteTeamById(id: Int) {
        getTeamById(id)
        return teamRepository.deleteById(id)
    }

    fun getTeamsApplicationByTeamId(teamId: Int, gameId: Int): Application? {
        val team = this.getTeamById(teamId)
        return team.applications.find { it.game.id == gameId }
    }

    fun updateGameStatusAuto(gameId: Int, theTeam: Team) {
        val gameStatus = theTeam.teamGameStatuses.find { it.game.id == gameId }
        if (gameStatus !== null && gameStatus.game.active) {

            if (gameStatus.placeStatuses.size > gameStatus.nextUnreachedPlaceIndex) {
                val placeStatus = gameStatus.placeStatuses[gameStatus.nextUnreachedPlaceIndex]
                val place = gameStatus.game.places.find { it.id == placeStatus.placeId }
                if (place !== null) {
                    val distanceInMeter = LocationUtils.getDistance(place.latitude, place.longitude, theTeam.lastLatitude, theTeam.lastLongitude)
                    if (distanceInMeter <= 50) {
                        placeStatus.reached = true
                        gameStatus.nextUnreachedPlaceIndex = gameStatus.nextUnreachedPlaceIndex + 1
                        placeStatus.reachedAt = Timestamp(System.currentTimeMillis())
                    }
                    gameStatus.updatedAt = Timestamp(System.currentTimeMillis())
                    this.statusRepository.save(gameStatus)
                }
            }
        }
    }

    private fun enableTeam(team: Team): Team {
        team.enabled = true
        return updateTeam(team, true)
    }

    fun verifyEmail(teamId: Int) {
        val team = getTeamById(teamId)
        if(team.enabled && team.nextEmail.isNotBlank()) {
            if(Utils.validateEmail(team.nextEmail)) {
                team.email = team.nextEmail
                updateTeam(team, true)
            } else {
                throw CustomException("New email is not valid", HttpStatus.BAD_REQUEST)
            }
        } else {
            enableTeam(team)
        }
    }

    fun continueWithGoogle(googleAccount: GoogleAccount): Team {
        if (!googleAccount.emailVerified) {
            throw CustomException("Google email not verified", HttpStatus.BAD_REQUEST)
        }
        val teamOptional = teamRepository.findByEmail(googleAccount.email)
        return if (teamOptional.isPresent) {
            val team = teamOptional.get()
            if (team.enabled) {
                team
            } else {
                // activate since he is logged in to gmail
                team.enabled = true
                updateTeam(team)
            }
        } else {
            addTeamByGoogle(googleAccount)
        }
    }

    private fun addTeamByGoogle(googleAccount: GoogleAccount): Team {
        var name = googleAccount.email.split('@')[0]
        if (googleAccount.name != null) {
            name = googleAccount.name
        }

        val team: Team = Team(
                email = googleAccount.email,
                role = ROLE_USER,
                password = encryptPassword(generatePassword()),
                isGoogle = true,
                name = name,
                createdAt = Timestamp(System.currentTimeMillis()),
                updatedAt = Timestamp(System.currentTimeMillis()),
                enabled = true,
                img = googleAccount.pictureUrl.toString()

        )
        if(team.email == "mherczku@gmail.com") {
            team.role = ROLE_ADMIN
        }
        return teamRepository.save(team)
    }
}
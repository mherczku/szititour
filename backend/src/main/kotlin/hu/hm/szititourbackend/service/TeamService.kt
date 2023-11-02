package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.dto.response.TeamPasswordUpdateDto
import hu.hm.szititourbackend.dto.response.TeamUpdateProfileDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.dto.response.ContinueGoogleResponse
import hu.hm.szititourbackend.extramodel.GoogleAccount
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.repository.TeamRepository
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.ROLE_ADMIN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.ROLE_USER
import hu.hm.szititourbackend.util.LocationUtils
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.PasswordUtils
import hu.hm.szititourbackend.util.PasswordUtils.encryptPassword
import hu.hm.szititourbackend.util.PasswordUtils.generatePassword
import hu.hm.szititourbackend.util.ImgUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp
import java.time.Instant
import java.util.*


@Service
@Transactional
class TeamService @Autowired constructor(private val securityTokenService: SecurityTokenService, private val teamRepository: TeamRepository, private val statusRepository: TeamGameStatusRepository, private val emailService: EmailService) {

    fun getTeamByEmail(email: String): Team {
        val team = teamRepository.findByEmail(email)
        if (team.isPresent) {
            return team.get()
        } else {
            throw CustomException("Team not found", HttpStatus.NOT_FOUND, MessageConstants.TEAM_NOT_FOUND)
        }
    }

    fun updateTeamProfile(teamId: Int, teamUpdateProfileDto: TeamUpdateProfileDto): Team {

        val updateTeam = getTeamById(teamId)
        updateTeam.name = teamUpdateProfileDto.name ?: updateTeam.name
        updateTeam.members = teamUpdateProfileDto.members?.toMutableList() ?: updateTeam.members
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
                emailService.sendWelcomeMail(team.email, team.name, verificationToken = securityTokenService.generateEmailVerificationToken(team))
            } catch (e: Exception) {
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
            throw CustomException("Team not found", HttpStatus.NOT_FOUND, MessageConstants.TEAM_NOT_FOUND)
        }
    }

    fun updateProfileEmail(teamId: Int, nextEmail: String): Team {
        val team = getTeamById(teamId)
        if (team.email == nextEmail) {
            team.nextEmail = ""
            return updateTeam(team, true)
        }
        val teamWithEmail = teamRepository.findByEmail(nextEmail)
        if (teamWithEmail.isPresent) {
            throw CustomException("Email is already in use", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_TAKEN)
        }
        team.nextEmail = nextEmail
        val updated = updateTeam(team, true)
        try {
            emailService.sendModifyEmailMail(team.nextEmail, team.name, securityTokenService.generateEmailVerificationToken(updated))
            return updated
        } catch (e: Exception) {
            updated.nextEmail = ""
            updateTeam(updated, true)
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
        val team = getTeamById(id)
        ImgUtils.deleteImage(team.img)
        return teamRepository.deleteById(id)
    }

    fun getTeamsApplicationByTeamId(teamId: Int, gameId: Int): Application {
        val team = this.getTeamById(teamId)
        return team.applications.find { it.game.id == gameId }
                ?: throw CustomException("Application not found", HttpStatus.NOT_FOUND, MessageConstants.APPLICATION_NOT_FOUND)
    }

    fun hasTeamApplication(teamId: Int, gameId: Int): Boolean {
        val team = this.getTeamById(teamId)
        return team.applications.any { it.game.id == gameId }
    }

    fun updateGameStatusAuto(gameId: Int, theTeam: Team) {
        val gameStatus = theTeam.teamGameStatuses.find { it.game.id == gameId }
        if (gameStatus !== null && gameStatus.game.active) {
            val nextPlaceStatus = gameStatus.placeStatuses.find { it.orderNumber == gameStatus.nextUnreachedPlaceIndex }
            val nextPlace = gameStatus.game.places.find { it.id == nextPlaceStatus?.placeId }
            if (nextPlace != null && nextPlaceStatus != null) {
                val distanceInMeter = LocationUtils.getDistance(nextPlace.latitude, nextPlace.longitude, theTeam.lastLatitude, theTeam.lastLongitude)
                if (distanceInMeter <= 50) {
                    nextPlaceStatus.reached = true
                    gameStatus.nextUnreachedPlaceIndex = nextPlaceStatus.orderNumber + 1
                    nextPlaceStatus.reachedAt = Timestamp(System.currentTimeMillis())
                }
                gameStatus.updatedAt = Timestamp(System.currentTimeMillis())
                this.statusRepository.save(gameStatus)
            }
        }
    }

    private fun enableTeam(team: Team): Team {
        team.enabled = true
        return updateTeam(team, true)
    }

    fun verifyEmail(teamId: Int) {
        val team = getTeamById(teamId)
        if (team.enabled) {
            if (team.nextEmail.isNotBlank()) {
                if (PasswordUtils.validateEmail(team.nextEmail)) {
                    team.email = team.nextEmail
                    team.isGoogle = false
                    updateTeam(team, true)
                } else {
                    throw CustomException("New email is not valid", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_INVALID)
                }
            } else {
                throw CustomException("New email is empty", HttpStatus.BAD_REQUEST, MessageConstants.EMAIL_EMPTY)
            }
        } else {
            enableTeam(team)
        }
    }

    fun continueWithGoogle(googleAccount: GoogleAccount): ContinueGoogleResponse {
        if (!googleAccount.emailVerified) {
            throw CustomException("Google email not verified", HttpStatus.BAD_REQUEST, MessageConstants.GOOGLE_NOT_VERIFIED)
        }
        val teamOptional = teamRepository.findByEmail(googleAccount.email)
        return if (teamOptional.isPresent) {
            val team = teamOptional.get()
            if (team.enabled) {
                if (!team.isGoogle) {
                    team.isGoogle = true
                    ContinueGoogleResponse(updateTeam(team, true), false)
                } else {
                    ContinueGoogleResponse(team, false)
                }
            } else {
                // activate since he is logged in to gmail
                team.enabled = true
                team.isGoogle = true
                ContinueGoogleResponse(updateTeam(team, true), false)
            }
        } else {
            ContinueGoogleResponse(addTeamByGoogle(googleAccount), true)
        }
    }

    private fun addTeamByGoogle(googleAccount: GoogleAccount): Team {
        var name = googleAccount.email.split('@')[0]
        if (googleAccount.name != null) {
            name = googleAccount.name
        }

        val team = Team(
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
        if (team.email == "mherczku@gmail.com") {
            team.role = ROLE_ADMIN
        }
        return teamRepository.save(team)
    }

    fun revokeClient(tokenId: String, teamId: Int): Team {
        val team = getTeamById(teamId)
        team.clients.removeIf { it.tokenId == tokenId }
        return updateTeam(team, true)
    }

    fun addClient(team: Team, clientData: ClientData, isGoogle: Boolean): ClientData {
        clientData.isGoogle = isGoogle
        val tokenId = UUID.randomUUID().toString()
        clientData.tokenId = tokenId
        clientData.expireAt = Instant.now().plusSeconds(SecurityTokenService.JWT_TOKEN_VALIDITY_1HOUR.toLong())
        team.clients.add(clientData)
        updateTeam(team, true)
        return clientData
    }

    fun updateTeamImage(teamId: Int, img: MultipartFile): Team {
        val team = getTeamById(teamId)
        val imagePath = ImgUtils.saveImage(img, ImgUtils.imageDirectoryTeamsName, team.img)
        team.img = imagePath
        return updateTeam(team, true)
    }

    fun deleteTeamByUser(deleteToken: String) {
        val verification = securityTokenService.verifyTeamDeleteToken(deleteToken)
        if (verification.verified) {
            val team = getTeamById(verification.teamId)
            if (verification.messageCode != team.passwordChangeId) {
                throw CustomException("Invalid Token PasswordChangeID", HttpStatus.FORBIDDEN, MessageConstants.TEAM_DELETE_TOKEN_INVALID)
            }
            deleteTeamById(team.id)

        } else {
            throw CustomException("Team delete failed", HttpStatus.BAD_REQUEST, verification.messageCode)
        }
    }

    fun deleteTeamRequest(teamId: Int) {
        val team = getTeamById(teamId)
        if (team.nextEmail.isNotBlank() || !team.enabled) {
            throw CustomException("Cannot delete team while email is not verified", HttpStatus.FORBIDDEN, MessageConstants.EMAIL_NOT_VERIFIED_DELETE)
        }
        team.passwordChangeId = UUID.randomUUID().toString()
        updateTeam(team, true)
        emailService.sendTeamDeleteMail(team.email, team.name, securityTokenService.generateTeamDeleteToken(team))
    }

    fun updateTeamPasswordRequest(teamId: Int) {
        val team = getTeamById(teamId)
        if (team.nextEmail.isNotBlank() || !team.enabled) {
            throw CustomException("Cannot modify password while email is not verified", HttpStatus.FORBIDDEN, MessageConstants.EMAIL_NOT_VERIFIED)
        }
        team.passwordChangeId = UUID.randomUUID().toString()
        updateTeam(team, true)
        emailService.sendModifyPasswordMail(team.email, team.name, securityTokenService.generatePasswordChangeToken(team))
    }

    fun forgotTeamPasswordRequest(email: String) {
        val team = getTeamByEmail(email)
        if (team.nextEmail.isNotBlank() || !team.enabled) {
            throw CustomException("Cannot modify password while email is not verified", HttpStatus.FORBIDDEN, MessageConstants.EMAIL_NOT_VERIFIED)
        }
        team.passwordChangeId = UUID.randomUUID().toString()
        updateTeam(team, true)
        emailService.sendForgotPasswordMail(team.email, team.name, securityTokenService.generatePasswordChangeToken(team))
    }

    fun updateTeamPassword(passwordUpdateDto: TeamPasswordUpdateDto, passwordChangeToken: String): Team {
        val verification = securityTokenService.verifyPasswordChangeToken(passwordChangeToken)
        if (verification.verified) {
            val team = getTeamById(verification.teamId)
            if (verification.messageCode != team.passwordChangeId) {
                throw CustomException("Invalid Token PasswordChangeID", HttpStatus.FORBIDDEN, MessageConstants.PASSWORD_TOKEN_INVALID)
            }
            if (passwordUpdateDto.newPassword.isNotBlank()) {
                if (PasswordUtils.validatePassword(passwordUpdateDto.newPassword)) {
                    if (team.nextEmail.isNotBlank()) {
                        throw CustomException("Cannot modify password while email is not verified", HttpStatus.FORBIDDEN, MessageConstants.EMAIL_NOT_VERIFIED)
                    }
                    team.passwordChangeId = ""
                    team.password = PasswordUtils.encryptPassword(passwordUpdateDto.newPassword)
                    emailService.sendPasswordUpdatedEmail(team.email, team.name)
                    return updateTeam(team, true)
                } else {
                    throw CustomException("New password is not acceptable", HttpStatus.BAD_REQUEST, MessageConstants.PASSWORD_INVALID)
                }
            } else {
                throw CustomException("Password cannot be blank", HttpStatus.BAD_REQUEST, MessageConstants.PASSWORD_EMPTY)
            }
        } else {
            throw CustomException("Password changed failed", HttpStatus.BAD_REQUEST, verification.messageCode)
        }
    }
}
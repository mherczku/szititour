package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.convertToActiveDto
import hu.hm.szititourbackend.dto.*
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.TOKEN_NAME
import hu.hm.szititourbackend.service.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/user")
class LoggedInController @Autowired constructor(
    private val teamService: TeamService,
    private val gameService: GameService,
    private val applicationService: ApplicationService,
    private val questionService: QuestionService,
    private val answerService: AnswerService,
    private val securityService: SecurityService
) {

    // AVAILABLE ONLY FOR LOGGED-IN USERS:

    @PostMapping("update")
    fun updateProfile(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody profileUpdate: TeamUpdateProfileDto
    ): ResponseEntity<TeamDto> {
        val verification = securityService.verifyToken(token)
        val updatedTeam = teamService.updateTeamProfile(verification.teamId, profileUpdate)
        if (!updatedTeam.isPresent) {
            throw CustomException("Profile update unsuccessful", HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(updatedTeam.get(), HttpStatus.OK)
    }

    @GetMapping("games")
    fun getAllAvailableGames(): ResponseEntity<List<GameOnlyBasicDto>> {
        return ResponseEntity(gameService.getAllAvailableGames(), HttpStatus.OK)
    }

    @PostMapping("apply")
    fun applyForGame(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody gameId: Int
    ): ResponseEntity<Response> {
        val verification = securityService.verifyToken(token)
        val application = teamService.getTeamsApplicationByTeamIds(verification.teamId, gameId)
        if (application.isPresent) {
            throw CustomException("This Team has an application already", HttpStatus.ALREADY_REPORTED)
        }
        applicationService.createApplication(gameId, verification.teamId)
        return ResponseEntity(Response(success = true), HttpStatus.CREATED)
    }

    @PostMapping("cancel")
    fun cancelApplicationForGame(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody gameId: Int
    ): ResponseEntity<Response> {
        val verification = securityService.verifyToken(token)
        val application = teamService.getTeamsApplicationByTeamIds(verification.teamId, gameId)
        if (!application.isPresent) {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND)
        } else {
            val applicationGot: Application = application.get()
            if (applicationGot.accepted == null) {
                applicationService.deleteApplicationById(application.get().id)
                return ResponseEntity(Response(success = true), HttpStatus.OK)
            } else if (applicationGot.accepted!!) {
                applicationService.deleteApplicationById(application.get().id)
                return ResponseEntity(Response(success = true), HttpStatus.OK)
            } else {
                throw CustomException("Cannot cancel refused application", HttpStatus.FORBIDDEN)
            }
        }
    }

    fun logout() {
        // blocklist?
    }

    // AVAILABLE ONLY FOR USERS WITH VALID APPLICATION FOR "THE" GAME WHICH IS ACTIVE:

    @PostMapping("activegame")
    fun getGameData(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody gameId: Int
    ): ResponseEntity<GameActiveDto> {
        val verification = securityService.verifyToken(token)

        if (hasTeamAcceptedApplicationToGame(verification.teamId, gameId)) {
            val game = gameService.getGameById(gameId)
            if (!game.isPresent) {
                throw CustomException("Game not found", HttpStatus.NOT_FOUND)
            }
            return ResponseEntity(game.get().convertToActiveDto(), HttpStatus.OK)
        }
        throw CustomException("Your application has not been accepted yet", HttpStatus.FORBIDDEN)
    }

    @PostMapping("answer/{questionId}")
    fun answerQuestion(
        @RequestHeader(TOKEN_NAME) token: String,
        @PathVariable questionId: Int,
        answer: Answer
    ): ResponseEntity<Response> {
        val verification = securityService.verifyToken(token)

        if (hasTeamAcceptedApplicationToGameByQuestionId(verification.teamId, questionId)) {
            val question = questionService.getQuestionById(questionId)
            if (!question.isPresent) {
                throw CustomException("Question not found", HttpStatus.NOT_FOUND)
            }
            answerService.createAnswer(answer, verification.teamId, question.get())
            return ResponseEntity(Response(success = true), HttpStatus.CREATED)
        }
        throw CustomException("Your application has not been accepted yet or game not started", HttpStatus.FORBIDDEN)
    }

    private fun hasTeamAcceptedApplicationToGame(teamId: Int, gameId: Int): Boolean {
        val application = teamService.getTeamsApplicationByTeamIds(teamId, gameId)
        return if (application.isPresent && application.get().accepted != null) {
            (application.get().accepted!!)
        } else false
    }

    private fun hasTeamAcceptedApplicationToGameByQuestionId(teamId: Int, questionId: Int): Boolean {
        val gameId = questionService.getQuestionById(questionId).get().place.game.id
        val application = teamService.getTeamsApplicationByTeamIds(teamId, gameId)
        return if (application.isPresent && application.get().accepted != null) {
            (application.get().accepted!!)
        } else false
    }

}
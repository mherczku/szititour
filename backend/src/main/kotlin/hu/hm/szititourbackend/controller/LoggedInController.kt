package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.*
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
import org.springframework.web.multipart.MultipartFile

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/user")
class LoggedInController @Autowired constructor(
    private val teamService: TeamService,
    private val gameService: GameService,
    private val applicationService: ApplicationService,
    private val questionService: QuestionService,
    private val answerService: AnswerService,
    private val securityService: SecurityService,
    private val loggedInService: LoggedInService
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
    fun getAllAvailableGames(@RequestHeader(TOKEN_NAME) token: String): ResponseEntity<List<GameOnlyBasicDto>> {
        val verification = securityService.verifyToken(token)
        return ResponseEntity(gameService.getAllAvailableGames(verification.teamId), HttpStatus.OK)
    }

    @PostMapping("apply")
    fun applyForGame(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody gameId: Int
    ): ResponseEntity<Response> {
        val verification = securityService.verifyToken(token)
        val application = teamService.getTeamsApplicationByTeamId(verification.teamId, gameId)
        if (application.isPresent) {
            throw CustomException("This Team has an application already", HttpStatus.BAD_REQUEST)
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
        val application = teamService.getTeamsApplicationByTeamId(verification.teamId, gameId)
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

        checkTeamAcceptedApplicationToGame(verification.teamId, gameId)
        val game = gameService.getGameById(gameId)
        if (!game.isPresent) {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND)
        } else {
            val theGame = game.get()
            checkGameActive(theGame)
            return ResponseEntity(game.get().convertToActiveDto(), HttpStatus.OK)
        }
    }


    @GetMapping("status/{gameId}")
    fun getTeamGameStatus(
        @RequestHeader(TOKEN_NAME) token: String,
        @PathVariable gameId: Int
    ): ResponseEntity<TeamGameStatusDto> {
        val verification = securityService.verifyToken(token)
        checkTeamAcceptedApplicationToGame(verification.teamId, gameId)
        return ResponseEntity(loggedInService.getTeamGameStatus(gameId, verification.teamId), HttpStatus.OK)

    }

    @PostMapping("answers")
    fun answerQuestions(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestBody answers: AnswersRequestBody
    ): ResponseEntity<TeamGameStatusDto> {

        val verification = securityService.verifyToken(token)

        checkTeamAcceptedApplicationToGame(verification.teamId, gameId = answers.gameId)
        val game = gameService.getGameById(answers.gameId)
        if (!game.isPresent) {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND)
        } else {
            val theGame = game.get()
            checkGameActive(theGame)
            answers.questionAnswers.forEach { answer ->
                val question = questionService.getQuestionById(answer.questionId)
                if (question.isPresent) {
                    answerService.createAnswer(
                        Answer(
                            answerBoolean = answer.answer.answerBoolean,
                            answerNumber = answer.answer.answerNumber,
                            answerText = answer.answer.answerText,
                            img = answer.answer.img
                        ),
                        question = question.get(),
                        teamId = verification.teamId
                    )

                } else {
                    throw CustomException("Question not exist", HttpStatus.BAD_REQUEST)
                }
            }
            return ResponseEntity(
                loggedInService.getTeamGameStatus(theGame.id, verification.teamId),
                HttpStatus.OK
            )
        }
    }

    @PostMapping("answer/{questionId}")
    fun answerQuestion(
        @RequestHeader(TOKEN_NAME) token: String,
        @PathVariable questionId: Int,
        @RequestBody answer: Answer
    ): ResponseEntity<TeamGameStatusDto> {
        val verification = securityService.verifyToken(token)

        return ResponseEntity(
            loggedInService.answerQuestion(verification.teamId, questionId, answer),
            HttpStatus.OK
        )
    }

    @PostMapping("answer/{questionId}/image")
    fun answerQuestionWithImage(
        @RequestHeader(TOKEN_NAME) token: String,
        @RequestParam("image") file: MultipartFile,
        @PathVariable questionId: Int,
    ): ResponseEntity<TeamGameStatusDto> {

        val verification = securityService.verifyToken(token)
        return ResponseEntity(loggedInService.answerWithImage(questionId, verification.teamId, file), HttpStatus.OK)
    }

    private fun checkTeamAcceptedApplicationToGame(teamId: Int, gameId: Int) {
        val application = teamService.getTeamsApplicationByTeamId(teamId, gameId)
        if (!application.isPresent || application.get().accepted == null || !application.get().accepted!!) {
            throw CustomException("Your application is not accepted", HttpStatus.FORBIDDEN)
        }
    }

    private fun checkGameActive(game: Game) {
        if (!game.active) {
            throw CustomException("This game is not active", HttpStatus.FORBIDDEN)
        }
    }

}
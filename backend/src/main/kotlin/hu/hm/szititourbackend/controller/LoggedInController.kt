package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.*
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.service.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication


@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/user")
class LoggedInController @Autowired constructor(
    private val teamService: TeamService,
    private val gameService: GameService,
    private val applicationService: ApplicationService,
    private val questionService: QuestionService,
    private val answerService: AnswerService,
    private val loggedInService: LoggedInService
) {

    //! AVAILABLE ONLY FOR LOGGED-IN USERS:

    val logger: Logger = LoggerFactory.getLogger(LoggedInController::class.java)

    @PostMapping("update")
    fun updateProfile(
        @RequestBody profileUpdate: TeamUpdateProfileDto,
        auth: Authentication
    ): ResponseEntity<TeamDto> {
        logger.debug("Update user profile ${auth.name}")
        val updatedTeam = teamService.updateTeamProfile(auth.name.toInt(), profileUpdate)
        return ResponseEntity(updatedTeam.convertToDto(), HttpStatus.OK)
    }

    @PostMapping("update/password")
    fun updateProfilePassword(
            @RequestBody profileUpdate: TeamPasswordUpdateDto,
            auth: Authentication
    ): ResponseEntity<TeamDto> {
        logger.debug("Update user password ${auth.name}")
        val updatedTeam = teamService.updateTeamPassword(auth.name.toInt(), profileUpdate)
        return ResponseEntity(updatedTeam.convertToDto(), HttpStatus.OK)
    }

     @PostMapping("update/email")
    fun updateProfileEmail(
        @RequestBody email: String,
        auth: Authentication
    ): ResponseEntity<TeamDto> {
        logger.debug("Update user profile email ${auth.name}")
        val updatedTeam = teamService.updateProfileEmail(auth.name.toInt(), email)
        return ResponseEntity(updatedTeam.convertToDto(), HttpStatus.OK)
    }



    @GetMapping("games")
    fun getAllAvailableGames(auth: Authentication): ResponseEntity<List<GameOnlyBasicDto>> {
        logger.debug("Get available games")
        return ResponseEntity(gameService.getAllAvailableGames().convertToBasicDto(auth.name.toInt()), HttpStatus.OK)
    }

    @PostMapping("apply")
    fun applyForGame(
        @RequestBody gameId: Int,
        auth: Authentication
    ): ResponseEntity<GameOnlyBasicDto> {
        logger.debug("Apply for game ${gameId} by user ${auth.name}")

        val game = gameService.getGameById(gameId)
        if (game.active) {
            throw CustomException("Cannot apply for an active game", HttpStatus.FORBIDDEN)
        }
        val application = teamService.getTeamsApplicationByTeamId(auth.name.toInt(), gameId)
        if (application != null) {
            throw CustomException("This Team has an application already", HttpStatus.BAD_REQUEST)
        }
        val newApplication = applicationService.createApplication(gameId, auth.name.toInt())
        return ResponseEntity(gameService.getGameById(newApplication.game.id).convertToBasicDto(auth.name.toInt()), HttpStatus.CREATED)
    }

    @PostMapping("cancel")
    fun cancelApplicationForGame(
        @RequestBody gameId: Int,
        auth: Authentication
    ): ResponseEntity<GameOnlyBasicDto> {

        logger.debug("Cancel application for game ${gameId} by user ${auth.name}")

        val application = teamService.getTeamsApplicationByTeamId(auth.name.toInt(), gameId)
        if (application == null) {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND)
        } else {
            if (application.game.active) {
                throw CustomException("Cannot cancel application for an active game", HttpStatus.FORBIDDEN)
            }
            if (application.accepted == null) {
                applicationService.deleteApplicationById(application.id)
                return ResponseEntity(application.game.convertToBasicDto(auth.name.toInt()), HttpStatus.OK)
            } else if (application.accepted!!) {
                applicationService.deleteApplicationById(application.id)
                return ResponseEntity(application.game.convertToBasicDto(auth.name.toInt()), HttpStatus.OK)
            } else {
                throw CustomException("Cannot cancel refused application", HttpStatus.FORBIDDEN)
            }
        }
    }

    @PostMapping("revoke")
    fun revokeToken(@RequestBody tokenId: String, auth: Authentication): ResponseEntity<Team> {
        return ResponseEntity<Team>(teamService.revokeClient(tokenId, auth.name.toInt()), HttpStatus.OK)
    }

    @PostMapping("logout")
    fun logout(@RequestBody tokenId: String, auth: Authentication): ResponseEntity<Response> {
        teamService.revokeClient(tokenId, auth.name.toInt())
        return ResponseEntity<Response>(Response(success = true), HttpStatus.OK)
    }

    //! AVAILABLE ONLY FOR USERS WITH VALID APPLICATION FOR "THE" GAME WHICH IS ACTIVE:

    @GetMapping("activegame/{gameId}")
    fun getGameData(
        @PathVariable gameId: Int,
        auth: Authentication
    ): ResponseEntity<GameActiveDto> {

        logger.debug("Get game data by user ${auth.name}")

        checkTeamAcceptedApplicationToGame(auth.name.toInt(), gameId)
        val game = gameService.getGameById(gameId)

        checkGameActive(game)
        return ResponseEntity(
            game.convertToActiveDto(loggedInService.getTeamGameStatus(game.id, auth.name.toInt())),
            HttpStatus.OK
        )
    }


    @GetMapping("status/{gameId}")
    fun getTeamGameStatus(
        @PathVariable gameId: Int,
        auth: Authentication
    ): ResponseEntity<TeamGameStatusDto> {
        logger.debug("Get teamGameStatus by user ${auth.name}")

        checkTeamAcceptedApplicationToGame(auth.name.toInt(), gameId)
        return ResponseEntity(loggedInService.getTeamGameStatus(gameId, auth.name.toInt()), HttpStatus.OK)

    }

    @PostMapping("answers")
    fun answerQuestions(
        @RequestBody answers: AnswersRequestBody,
        auth: Authentication
    ): ResponseEntity<TeamGameStatusDto> {

        logger.debug("Answer questions by user ${auth.name}")

        checkTeamAcceptedApplicationToGame(auth.name.toInt(), gameId = answers.gameId)
        val theGame = gameService.getGameById(answers.gameId)

        checkGameActive(theGame)
        answers.questionAnswers.forEach { answer ->
            val question = questionService.getQuestionById(answer.questionId)

            answerService.createOrUpdateAnswer(
                Answer(
                    answerBoolean = answer.answer.answerBoolean,
                    answerNumber = answer.answer.answerNumber,
                    answerText = answer.answer.answerText,
                    img = answer.answer.img
                ),
                question = question,
                teamId = auth.name.toInt()
            )
        }
        return ResponseEntity(
            loggedInService.getTeamGameStatus(theGame.id, auth.name.toInt()),
            HttpStatus.OK
        )

    }

    @PostMapping("answer/{questionId}")
    fun answerQuestion(
        @PathVariable questionId: Int,
        @RequestBody answer: Answer,
        auth: Authentication
    ): ResponseEntity<TeamGameStatusDto> {
        logger.debug("Answer question ${questionId} by user ${auth.name}")

        return ResponseEntity(
            loggedInService.answerQuestion(auth.name.toInt(), questionId, answer),
            HttpStatus.OK
        )
    }
    @PostMapping("answer/{questionId}/image")
    fun answerQuestionWithImage(
        @RequestParam("image") file: MultipartFile,
        @PathVariable questionId: Int,
        auth: Authentication
    ): ResponseEntity<TeamGameStatusDto> {

        logger.debug("Answer question with image ${questionId} by user ${auth.name}")
        return ResponseEntity(loggedInService.answerWithImage(questionId, auth.name.toInt(), file), HttpStatus.OK)
    }

    private fun checkTeamAcceptedApplicationToGame(teamId: Int, gameId: Int) {
        logger.debug("Check team application to game ${gameId} by user ${teamId}")

        val application = teamService.getTeamsApplicationByTeamId(teamId, gameId)
        if (application?.accepted == null || !application.accepted!!) {
            throw CustomException("Your application is not accepted", HttpStatus.FORBIDDEN)
        }
    }

    private fun checkGameActive(game: Game) {
        logger.debug("Check game active to game ${game.id}")
        if (!game.active) {
            throw CustomException("This game is not active", HttpStatus.FORBIDDEN)
        }
    }

}

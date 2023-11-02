package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.request.AnswersRequestBody
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.ImgUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp

@Service
@Transactional
class LoggedInService @Autowired constructor(
        private val gameService: GameService,
        private val teamGameStatusRepository: TeamGameStatusRepository,
        private val teamService: TeamService,
        private val questionService: QuestionService,
        private val answerService: AnswerService,
        private val applicationService: ApplicationService
) {

    fun getAllAvailableGames(): MutableList<Game> {
        return gameService.getAllGames()
    }
    fun answerQuestions(teamId: Int, answers: AnswersRequestBody): TeamGameStatus {
        checkApplicationAndGameActive(teamId, gameId = answers.gameId)
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
                    teamId = teamId
            )
        }
        return getTeamGameStatus(theGame.id, teamId)
    }
    fun getGameData(gameId: Int, teamId: Int): Game {
        checkApplicationAndGameActive(teamId, gameId)
        val game = gameService.getGameById(gameId)
        checkGameActive(game)
        return game
    }

    fun applyForGame(teamId: Int, gameId: Int): Game {
        val game = gameService.getGameById(gameId)
        if (game.active) {
            throw CustomException("Cannot apply for an active game", HttpStatus.FORBIDDEN, MessageConstants.CANNOT_APPLY_ACTIVE_GAME)
        }
        if (teamService.hasTeamApplication(teamId, gameId)) {
            throw CustomException("This Team has an application already", HttpStatus.BAD_REQUEST, MessageConstants.TEAM_ALREADY_APPLIED)
        }
        applicationService.createApplication(gameId, teamId)
        return gameService.getGameById(gameId)
    }

    fun cancelApplicationForGame(teamId: Int, gameId: Int): Game {
        val application = teamService.getTeamsApplicationByTeamId(teamId, gameId)
        if (application.game.active) {
            throw CustomException("Cannot cancel application for an active game", HttpStatus.FORBIDDEN, MessageConstants.CANNOT_CANCEL_ACTIVE)
        }
        return if (application.accepted == null) {
            applicationService.deleteApplicationById(application.id)
            application.game
        } else if (application.accepted!!) {
            applicationService.deleteApplicationById(application.id)
            application.game
        } else {
            throw CustomException("Cannot cancel refused application", HttpStatus.FORBIDDEN, MessageConstants.CANNOT_CANCEL_REFUSED)
        }
    }

    fun getTeamGameStatus(gameId: Int, teamId: Int): TeamGameStatus {
        val game = gameService.getGameById(gameId)
        checkApplicationAndGameActive(teamId, null, game)
        val status = game.teamGameStatuses.find { it.team.id == teamId }
        if (status !== null) {
            return status
        } else {
            val statuses = mutableListOf<PlaceStatus>()
            game.places.forEach {
                statuses.add(PlaceStatus(it.id, it.ordernumber, false))
            }
            statuses.firstOrNull()?.reached = true
            val statusNew = TeamGameStatus(
                    game = game,
                    team = Team(id = teamId),
                    createdAt = Timestamp(System.currentTimeMillis()),
                    updatedAt = Timestamp(System.currentTimeMillis()),
                    placeStatuses = statuses
            )
            return teamGameStatusRepository.save(statusNew)
        }
    }


    fun answerWithImage(questionId: Int, teamId: Int, file: MultipartFile): TeamGameStatus {
        val game = checkApplicationAndGameActive(teamId, null, null, questionId)
        val answer = answerService.findByTeamAndQuestion(teamId, questionId)
        val imagePath = ImgUtils.saveImage(file, ImgUtils.imageDirectoryTeamsName)
        return if (answer.isPresent) {
            val updateAnswer = answer.get()
            updateAnswer.img = imagePath
            answerService.updateAnswer(updateAnswer)
            getTeamGameStatus(updateAnswer.question.place.game.id, teamId)
        } else {
            val newAnswer = Answer(
                    team = Team(id = teamId),
                    question = Question(id = questionId),
                    img = imagePath,
                    correct = null
            )
            answerService.addAnswer(newAnswer)
            getTeamGameStatus(game.id, teamId)
        }
    }

    fun answerQuestion(teamId: Int, questionId: Int, answer: Answer): TeamGameStatus {
        checkApplicationAndGameActive(teamId, null, null, questionId)
        val question = questionService.getQuestionById(questionId)
        answerService.createOrUpdateAnswer(answer, teamId, question)
        return getTeamGameStatus(question.place.game.id, teamId)
    }

    private fun checkApplicationAndGameActive(teamId: Int, gameId: Int?, game: Game? = null, questionId: Int? = null): Game {
        val theGameId: Int =
                game?.id ?: gameId ?: questionId?.let { questionService.getQuestionById(it).place.game.id }
                ?: throw CustomException(
                        "Game and GameId and QuestionId cannot be null at the same time",
                        HttpStatus.BAD_REQUEST,
                        MessageConstants.GAME_GAMEID_QUESTIONID_NULL
                )
        var theGame = game
        if (theGame == null) {
            theGame = gameService.getGameById(theGameId)
        }
        checkGameActive(theGame)
        val application = teamService.getTeamsApplicationByTeamId(teamId, theGameId)
        if (application.accepted == null || !application.accepted!!) {
            throw CustomException("Your application is not accepted", HttpStatus.FORBIDDEN, MessageConstants.APPLICATION_NOT_ACCEPTED)
        }
        return theGame
    }

    private fun checkGameActive(game: Game) {
        if (!game.active) {
            throw CustomException("This game is not active", HttpStatus.FORBIDDEN, MessageConstants.GAME_INACTIVE)
        }
    }

}
package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.TeamGameStatusDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.AnswerRepository
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.Utils
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
        private val answerRepository: AnswerRepository,
        private val teamService: TeamService,
        private val questionService: QuestionService,
        private val answerService: AnswerService
) {

    fun getTeamGameStatus(gameId: Int, teamId: Int): TeamGameStatusDto {
        val game = gameService.getGameById(gameId)
        checkApplicationAndGameActive(teamId, null, game)
        val status = game.teamGameStatuses.find { it.team.id == teamId }
        if (status !== null) {
            return status.convertToDto()
        } else {
            val statuses = mutableListOf<PlaceStatus>()
            game.places.forEach {
                statuses.add(PlaceStatus(it.id, false))
            }
            statuses.first().reached = true
            val statusNew = TeamGameStatus(
                    game = game,
                    team = Team(id = teamId),
                    createdAt = Timestamp(System.currentTimeMillis()),
                    updatedAt = Timestamp(System.currentTimeMillis()),
                    placeStatuses = statuses
            )
            val savedStatus = teamGameStatusRepository.save(statusNew)
            teamGameStatusRepository.flush()
            return savedStatus.convertToDto()
        }
    }


    fun answerWithImage(questionId: Int, teamId: Int, file: MultipartFile): TeamGameStatusDto {
        checkApplicationAndGameActive(teamId, null, null, questionId)
        val answer = answerRepository.findByTeamAndQuestion(Team(id = teamId), Question(id = questionId))
        val imagePath = Utils.saveImage(file, Utils.imageDirectoryTeamsName)
        return if (answer.isPresent) {
            val updateAnswer = answer.get()
            updateAnswer.img = imagePath
            answerRepository.save(updateAnswer)
            getTeamGameStatus(updateAnswer.question.place.game.id, teamId)
        } else {
            val newAnswer = Answer(
                    team = Team(id = teamId),
                    question = Question(id = questionId),
                    img = imagePath,
                    correct = null
            )
            val gameId = answerRepository.save(newAnswer).question.place.game.id
            getTeamGameStatus(gameId, teamId)
        }
    }

    fun answerQuestion(teamId: Int, questionId: Int, answer: Answer): TeamGameStatusDto {
        checkApplicationAndGameActive(teamId, null, null, questionId)
        val question = questionService.getQuestionById(questionId)
        answerService.createOrUpdateAnswer(answer, teamId, question)
        return getTeamGameStatus(question.place.game.id, teamId)
    }

    private fun checkApplicationAndGameActive(teamId: Int, gameId: Int?, game: Game? = null, questionId: Int? = null) {
        val theGameId: Int =
                game?.id ?: gameId ?: questionId?.let { questionService.getQuestionById(it).place.game.id }
                ?: throw CustomException(
                        "Game and GameId and QuestionId cannot be null at the same time",
                        HttpStatus.BAD_REQUEST,
                        MessageConstants.GAME_GAMEID_QUESTIONID_NULL
                )

        if (game == null) {
            val gameGot = gameService.getGameById(theGameId)
            checkGameActive(gameGot)
        }
        val application = teamService.getTeamsApplicationByTeamId(teamId, theGameId)
        if (application.accepted == null || !application.accepted!!) {
            throw CustomException("Your application is not accepted", HttpStatus.FORBIDDEN, MessageConstants.APPLICATION_NOT_ACCEPTED)
        }
    }

    private fun checkGameActive(game: Game) {
        if (!game.active) {
            throw CustomException("This game is not active", HttpStatus.FORBIDDEN, MessageConstants.GAME_INACTIVE)
        }
    }

}
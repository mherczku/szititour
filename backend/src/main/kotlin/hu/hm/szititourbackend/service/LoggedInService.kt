package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.TeamGameStatusDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.AnswerRepository
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
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
    private val gameRepository: GameRepository,
    private val teamGameStatusRepository: TeamGameStatusRepository,
    private val answerRepository: AnswerRepository,
    private val teamService: TeamService,
    private val questionService: QuestionService,
    private val answerService: AnswerService
) {

    fun getTeamGameStatus(gameId: Int, teamId: Int): TeamGameStatusDto {
        val game = gameRepository.findById(gameId)
        if (!game.isPresent) {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND)
        } else {
            val theGame = game.get()
            checkApplicationAndGameActive(teamId, null, theGame)
            val status = theGame.teamGameStatuses.find { it.team.id == teamId }
            if (status !== null) {
                return status.convertToDto()
            } else {
                println("WARNING ----> No status for ${theGame.id} - $teamId")
                val statuses = mutableListOf<PlaceStatus>()
                theGame.places.forEach {
                    statuses.add(PlaceStatus(it.id, false))
                }
                statuses.first().reached = true
                val statusNew = TeamGameStatus(
                    game = theGame,
                    team = Team(id = teamId),
                    createdAt = Timestamp(System.currentTimeMillis()),
                    updatedAt = Timestamp(System.currentTimeMillis()),
                    placeStatuses = statuses
                )
                return teamGameStatusRepository.save(statusNew).convertToDto()
            }
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
        val question = checkQuestionExist(questionId)
        answerService.createAnswer(answer, teamId, question)
        return getTeamGameStatus(question.place.game.id, teamId)
    }

    private fun checkQuestionExist(questionId: Int): Question {
        val question = questionService.getQuestionById(questionId)
        if (!question.isPresent) {
            throw CustomException("Question not found", HttpStatus.NOT_FOUND)
        }
        return question.get()
    }

    private fun checkApplicationAndGameActive(teamId: Int, gameId: Int?, game: Game? = null, questionId: Int? = null) {
        val theGameId: Int =
            game?.id ?: gameId ?: questionId?.let { questionService.getQuestionById(it).get().place.game.id }
            ?: throw CustomException(
                "Game and GameId and QuestionId cannot be null at the same time",
                HttpStatus.BAD_REQUEST
            )

        if (game == null) {
            val gameOptional = gameRepository.findById(theGameId)
            if (gameOptional.isPresent) {
                checkGameActive(gameOptional.get())
            } else {
                throw CustomException("Game not exist", HttpStatus.NOT_FOUND)
            }
        }
        val application = teamService.getTeamsApplicationByTeamId(teamId, theGameId)
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
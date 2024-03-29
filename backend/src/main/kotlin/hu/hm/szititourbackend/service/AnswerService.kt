package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.AnswerRepository
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.ImgUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional

@Service
@Transactional
class AnswerService @Autowired constructor(private val answerRepository: AnswerRepository, private val teamService: TeamService){

    fun createOrUpdateAnswer(answer: Answer, teamId: Int, question: Question): Answer {
        val answerOptional = answerRepository.findByTeamAndQuestion(Team(id = teamId), question = question)
        return if(answerOptional.isPresent) {
            val answerFound = answerOptional.get()
            answerFound.answerBoolean = answer.answerBoolean
            answerFound.answerNumber = answer.answerNumber
            answerFound.answerText = answer.answerText
            answerFound.img = answer.img
            answerFound.correct = null
            addAnswer(answerFound)
        } else {
            answer.team = Team(id = teamId)
            answer.correct = null
            answer.question = question
            addAnswer(answer)
        }
    }

    fun addAnswer(answer: Answer): Answer {
        return answerRepository.save(answer)
    }

    fun findByTeamAndQuestion(teamId: Int, questionId: Int): Optional<Answer> {
        return answerRepository.findByTeamAndQuestion(Team(id = teamId), Question(id = questionId))
    }

    fun getAllAnswers() : MutableList<Answer>{
        return answerRepository.findAll()
    }

    fun getAnswerById(id :Int): Answer {
        val answer = answerRepository.findById(id)
        if(!answer.isPresent) {
            throw CustomException("Answer not Found", HttpStatus.NOT_FOUND, MessageConstants.ANSWER_NOT_FOUND)
        } else {
            return answer.get()
        }
    }

    fun updateAnswer(answer: Answer): Answer {
        getAnswerById(answer.id)
        return answerRepository.save(answer)
    }

    fun deleteAnswerById(id: Int) {
        val answer = getAnswerById(id)
        ImgUtils.deleteImage(answer.img)
        return answerRepository.deleteById(id)
    }

    fun evaluateAnswer(id: Int, isCorrect: Boolean): Answer {
        val answer = getAnswerById(id)
        answer.correct = isCorrect
        if(answer.question.riddle) {
            updatePlaceStatus(answer, isCorrect)
        }
        return answerRepository.save(answer)
    }

    private fun updatePlaceStatus(answer: Answer, isCorrect: Boolean) {
        if(isCorrect) {
            val team = answer.team
            val nextPlace = answer.question.place.game.places.find { it.ordernumber == answer.question.place.ordernumber + 1 }
            if(nextPlace != null) {
                team.lastLatitude = nextPlace.latitude
                team.lastLongitude = nextPlace.longitude
                teamService.updateGameStatusAuto(nextPlace.game.id, teamService.updateTeam(team, true))
            }
        }
    }

}
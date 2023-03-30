package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.AnswerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class AnswerService @Autowired constructor(private val answerRepository: AnswerRepository){

    fun createAnswer(answer: Answer, teamId: Int, question: Question): Answer {
        answer.team = Team(id = teamId)
        answer.correct = null
        answer.question = question
        return addAnswer(answer)
    }

    private fun addAnswer(answer: Answer): Answer {
        return answerRepository.save(answer)
    }

    fun getAllAnswers() : MutableList<Answer>{
        return answerRepository.findAll()
    }

    fun getAnswerById(id :Int): Answer {
        val answer = answerRepository.findById(id)
        if(!answer.isPresent) {
            throw CustomException("Answer not Found", HttpStatus.NOT_FOUND)
        } else {
            return answer.get()
        }
    }

    fun updateAnswer(answer: Answer): Answer {
        getAnswerById(answer.id)
        return answerRepository.save(answer)
    }

    fun deleteAnswerById(id: Int) {
        return answerRepository.deleteById(id)
    }

}
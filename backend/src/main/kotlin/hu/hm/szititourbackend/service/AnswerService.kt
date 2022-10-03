package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.repository.AnswerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class AnswerService @Autowired constructor(private val answerRepository: AnswerRepository){

    fun createAnswer(answer: Answer, teamId: Int, question: Question) {
        answer.team = Team(id = teamId)
        answer.correct = null
        answer.question = question
        addAnswer(answer)
    }

    fun addAnswer(answer: Answer): Answer {
        return answerRepository.save(answer)
    }

    fun getAllAnswers() : MutableList<Answer>{
        return answerRepository.findAll()
    }

    fun getAnswerById(id :Int): Optional<Answer> {
        return answerRepository.findById(id)
    }

    fun updateAnswer(answer: Answer): Answer {
        return answerRepository.save(answer)
    }

    fun deleteAnswerById(id: Int) {
        return answerRepository.deleteById(id)
    }

}
package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.repository.QuestionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class QuestionService @Autowired constructor(private val questionRepository: QuestionRepository){

    fun addQuestion(question: Question): Question {
        return questionRepository.save(question)
    }

    fun getAllQuestion() : MutableList<Question>{
        return questionRepository.findAll()
    }

    fun getQuestionById(id: Int): Optional<Question> {
        return questionRepository.findById(id)
    }

    fun updateQuestion(question: Question): Question {
        return questionRepository.save(question)
    }

    fun deleteQuestionById(id: Int) {
        return questionRepository.deleteById(id)
    }
}
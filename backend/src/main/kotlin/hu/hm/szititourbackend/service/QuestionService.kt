package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.repository.PlaceRepository
import hu.hm.szititourbackend.repository.QuestionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class QuestionService @Autowired constructor(
    private val questionRepository: QuestionRepository,
    private val placeRepository: PlaceRepository
) {

    fun addQuestionToPlace(questionDto: QuestionDto): Optional<Question> {
        val placeOptional = placeRepository.findById(questionDto.placeId)
        return if (placeOptional.isPresent) {
            val newQuestion = Question(
                place = placeOptional.get(),
                type = questionDto.type,
                img = questionDto.img,
                name = questionDto.name,
                riddle = questionDto.riddle,
                answers = mutableListOf()
            )
            Optional.of(questionRepository.save(newQuestion))
        } else {
            Optional.empty()
        }
    }

    fun addQuestion(question: Question): Question {
        return questionRepository.save(question)
    }

    fun getAllQuestion(): MutableList<Question> {
        return questionRepository.findAll()
    }

    fun getQuestionById(id: Int): Optional<Question> {
        return questionRepository.findById(id)
    }

    fun updateQuestion(questionDto: QuestionDto): Question {
        val question = Question(
            place = Place(id = questionDto.placeId),
            riddle = questionDto.riddle,
            type = questionDto.type,
            img = questionDto.img,
            name = questionDto.name,
            id = questionDto.id
        )
        return questionRepository.save(question)
    }

    fun deleteQuestionById(id: Int) {
        return questionRepository.deleteById(id)
    }
}
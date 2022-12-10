package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.repository.PlaceRepository
import hu.hm.szititourbackend.repository.QuestionRepository
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.*

@Service
@Transactional
class QuestionService @Autowired constructor(
    private val questionRepository: QuestionRepository,
    private val placeRepository: PlaceRepository
) {

    fun addQuestionToPlaceWithImage(questionDto: QuestionDto, file: MultipartFile): Optional<Question> {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryQuestionsName)
            questionDto.img = imagePath
            val addedQuestion = addQuestionToPlace(questionDto)
            Optional.of(addedQuestion.get())
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            Optional.empty()
        }
    }

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

    fun updateQuestionWithImage(questionDto: QuestionDto, file: MultipartFile): Question {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryQuestionsName, questionDto.img)
            questionDto.img = imagePath
            val updated = updateQuestion(questionDto)
            updated
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            throw e
        }
    }

    fun updateQuestion(questionDto: QuestionDto): Question {
        val optional = questionRepository.findById(questionDto.id)
        if (!optional.isPresent) {
            throw Exception("Question not exist")
        }
        val question = optional.get()
        question.type = questionDto.type
        question.img = questionDto.img
        question.name = questionDto.name
        question.riddle = questionDto.riddle
        return questionRepository.save(question)
    }

    fun deleteQuestionById(id: Int) {
        val question = questionRepository.findById(id)
        if (question.isPresent) {
            Utils.deleteImage(question.get().img)
        }
        return questionRepository.deleteById(id)
    }
}
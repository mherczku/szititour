package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.QuestionRepository
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

@Service
@Transactional
class QuestionService @Autowired constructor(
    private val questionRepository: QuestionRepository,
    private val placeService: PlaceService
) {

    fun addQuestionToPlaceWithImage(questionDto: QuestionDto, file: MultipartFile): Question {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryQuestionsName)
            questionDto.img = imagePath
            val addedQuestion = addQuestionToPlace(questionDto)
            addedQuestion
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            throw e
        }
    }

    fun addQuestionToPlace(questionDto: QuestionDto): Question {
        val place = placeService.getPlaceById(questionDto.placeId)
        val newQuestion = Question(
            place = place,
            type = questionDto.type,
            img = questionDto.img,
            name = questionDto.name,
            riddle = questionDto.riddle,
            answers = mutableListOf()
        )
        return questionRepository.save(newQuestion)
    }

    fun addQuestion(question: Question): Question {
        return questionRepository.save(question)
    }

    fun getAllQuestion(): MutableList<Question> {
        return questionRepository.findAll()
    }

    fun getQuestionById(id: Int): Question {
        val question = questionRepository.findById(id)
        if (question.isPresent) {
            return question.get()
        } else {
            throw CustomException("Question not found", HttpStatus.NOT_FOUND)
        }
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
        val question = getQuestionById(questionDto.id)
        question.type = questionDto.type
        question.img = questionDto.img
        question.name = questionDto.name
        question.riddle = questionDto.riddle
        return questionRepository.save(question)
    }

    fun deleteQuestionById(id: Int) {
        val question = getQuestionById(id)
        Utils.deleteImage(question.img)
        return questionRepository.deleteById(id)
    }
}
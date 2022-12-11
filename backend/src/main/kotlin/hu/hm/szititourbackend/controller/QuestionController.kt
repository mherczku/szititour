package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.enum.QuestionType
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.QuestionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/questions")
class QuestionController @Autowired constructor(private val questionService: QuestionService) {

    @PostMapping()
    fun addQuestion(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("placeId") placeId: String,
        @RequestParam("type") type: String,
        @RequestParam("name") name: String,
        @RequestParam("riddle") riddle: String
    ): ResponseEntity<QuestionDto> {
        val questionDto = QuestionDto(
            name = name,
            placeId = placeId.toInt(),
            type = QuestionType.valueOf(type),
            riddle = riddle == "true"
        )

        val createdQuestion: Optional<Question> = if (file != null) {
            questionService.addQuestionToPlaceWithImage(questionDto, file)
        } else {
            questionService.addQuestionToPlace(questionDto)
        }

        if (!createdQuestion.isPresent) {
            throw CustomException("Creation unsuccessful", HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(createdQuestion.get().convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getQuestionById(@PathVariable id: Int): ResponseEntity<QuestionDto?> {
        val question: Optional<Question> = questionService.getQuestionById(id)
        if (!question.isPresent) {
            throw CustomException("Question not found", HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(question.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllQuestions(): ResponseEntity<List<QuestionDto>> {
        val questions: MutableList<Question> = questionService.getAllQuestion()
        return ResponseEntity(questions.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateQuestion(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("questionId") questionId: String,
        @RequestParam("currentImage") img: String,
        @RequestParam("type") type: String,
        @RequestParam("name") name: String,
        @RequestParam("riddle") riddle: String
    ): ResponseEntity<QuestionDto> {

        val questionDto = QuestionDto(
            name = name,
            id = questionId.toInt(),
            type = QuestionType.valueOf(type),
            riddle = riddle == "true",
            img = img
        )
        val updatedQuestion: Question = if (file != null) {
            questionService.updateQuestionWithImage(questionDto, file)
        } else {
            questionService.updateQuestion(questionDto)
        }

        return ResponseEntity(updatedQuestion.convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteQuestionById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            questionService.deleteQuestionById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Question not found", HttpStatus.NOT_FOUND)
        }
    }
}
package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.enum.QuestionType
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.QuestionService
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/questions")
class QuestionController @Autowired constructor(private val questionService: QuestionService) {

    val logger: Logger = LoggerFactory.getLogger(QuestionController::class.java)

    @PostMapping()
    fun addQuestion(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("placeId") placeId: String,
        @RequestParam("type") type: String,
        @RequestParam("name") name: String,
        @RequestParam("riddle") riddle: String
    ): ResponseEntity<QuestionDto> {

        logger.debug("Add question to place ${placeId}")

        val questionDto = QuestionDto(
            name = name,
            placeId = placeId.toInt(),
            type = QuestionType.valueOf(type),
            riddle = riddle == "true"
        )

        val createdQuestion: Question = if (file != null) {
            questionService.addQuestionToPlaceWithImage(questionDto, file)
        } else {
            questionService.addQuestionToPlace(questionDto)
        }
        return ResponseEntity(createdQuestion.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getQuestionById(@PathVariable id: Int): ResponseEntity<QuestionDto?> {
        logger.debug("Get question by id ${id}")
        val question: Question = questionService.getQuestionById(id)
        return ResponseEntity(question.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllQuestions(): ResponseEntity<List<QuestionDto>> {
        logger.debug("Get all questions")
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

        logger.debug("Update question ${questionId}")

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
        logger.debug("Delete question by id ${id}")
        return try {
            questionService.deleteQuestionById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Question not found", HttpStatus.NOT_FOUND, MessageConstants.QUESTION_NOT_FOUND)
        }
    }
}
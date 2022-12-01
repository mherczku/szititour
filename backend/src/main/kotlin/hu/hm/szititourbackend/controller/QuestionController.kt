package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.service.QuestionService
import hu.hm.szititourbackend.util.AuthUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/questions")
class QuestionController @Autowired constructor(private val questionService: QuestionService) {

    @PostMapping()
    fun addQuestion(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody question: QuestionDto): ResponseEntity<QuestionDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newQuestion = questionService.addQuestionToPlace(question)
        if(!newQuestion.isPresent) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(newQuestion.get().convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getQuestionById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<QuestionDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val question: Optional<Question> = questionService.getQuestionById(id)
        if (!question.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(question.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllQuestions(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?): ResponseEntity<List<QuestionDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val questions: MutableList<Question> = questionService.getAllQuestion()
        return ResponseEntity(questions.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateQuestion(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody question: QuestionDto): ResponseEntity<QuestionDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return ResponseEntity(questionService.updateQuestion(question).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteQuestionById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            questionService.deleteQuestionById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
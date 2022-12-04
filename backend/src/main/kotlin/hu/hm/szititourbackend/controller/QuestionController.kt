package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.service.QuestionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/questions")
class QuestionController @Autowired constructor(private val questionService: QuestionService) {

    @PostMapping()
    fun addQuestion(@RequestBody question: QuestionDto): ResponseEntity<QuestionDto> {
        val newQuestion = questionService.addQuestionToPlace(question)
        if(!newQuestion.isPresent) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(newQuestion.get().convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getQuestionById(@PathVariable id: Int): ResponseEntity<QuestionDto?> {
        val question: Optional<Question> = questionService.getQuestionById(id)
        if (!question.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(question.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllQuestions(): ResponseEntity<List<QuestionDto>> {
        val questions: MutableList<Question> = questionService.getAllQuestion()
        return ResponseEntity(questions.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateQuestion(@RequestBody question: QuestionDto): ResponseEntity<QuestionDto> {
        return ResponseEntity(questionService.updateQuestion(question).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteQuestionById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            questionService.deleteQuestionById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
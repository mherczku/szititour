package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.AnswerDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.AnswerService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/answers")
class AnswerController @Autowired constructor(private val answerService: AnswerService) {

    @PostMapping()
    fun addAnswer(@RequestBody answer: Answer): ResponseEntity<AnswerDto> {
        val newAnswer = answerService.addAnswer(answer)
        return ResponseEntity(newAnswer.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getAnswerById(@PathVariable id: Int): ResponseEntity<AnswerDto?> {
        val answer: Optional<Answer> = answerService.getAnswerById(id)
        if (!answer.isPresent) {
            throw CustomException("Answer not found", HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(answer.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllAnswers(): ResponseEntity<List<AnswerDto>> {
        val answers: MutableList<Answer> = answerService.getAllAnswers()
        return ResponseEntity(answers.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateAnswer(@RequestBody answer: Answer): ResponseEntity<AnswerDto> {
        return ResponseEntity(answerService.updateAnswer(answer).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteAnswerById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            answerService.deleteAnswerById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Answer not found", HttpStatus.NOT_FOUND)
        }
    }
}
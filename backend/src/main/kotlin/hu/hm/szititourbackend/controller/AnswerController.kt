package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.AnswerDto
import hu.hm.szititourbackend.service.AnswerService
import hu.hm.szititourbackend.util.AuthUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/answers")
class AnswerController @Autowired constructor(private val answerService: AnswerService) {

    @PostMapping()
    fun addAnswer(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody answer: Answer): ResponseEntity<AnswerDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newAnswer = answerService.addAnswer(answer)
        return ResponseEntity(newAnswer.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getAnswerById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<AnswerDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val answer: Optional<Answer> = answerService.getAnswerById(id)
        if (!answer.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(answer.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllAnswers(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?): ResponseEntity<List<AnswerDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val answers: MutableList<Answer> = answerService.getAllAnswers()
        return ResponseEntity(answers.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateAnswer(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody answer: Answer): ResponseEntity<AnswerDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return ResponseEntity(answerService.updateAnswer(answer).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteAnswerById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            answerService.deleteAnswerById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
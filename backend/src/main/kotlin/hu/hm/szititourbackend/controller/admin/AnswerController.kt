package hu.hm.szititourbackend.controller.admin
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.response.AnswerDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.AnswerService
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/answers")
class AnswerController @Autowired constructor(private val answerService: AnswerService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    @GetMapping("/{id}/correct")
    fun markAsCorrect(@PathVariable id: Int): ResponseEntity<AnswerDto?> {
        logger.debug("Mark answer $id as correct")
        return ResponseEntity(answerService.evaluateAnswer(id,true).convertToDto(), HttpStatus.OK)
    }

    @GetMapping("/{id}/incorrect")
    fun markAsIncorrect(@PathVariable id: Int): ResponseEntity<AnswerDto?> {
        logger.debug("Mark answer $id as incorrect")
        return ResponseEntity(answerService.evaluateAnswer(id,false).convertToDto(), HttpStatus.OK)
    }

    @GetMapping("/{id}")
    fun getAnswerById(@PathVariable id: Int): ResponseEntity<AnswerDto?> {
        logger.debug("Get answer by id $id")
        val answer: Answer = answerService.getAnswerById(id)
        return ResponseEntity(answer.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllAnswers(): ResponseEntity<List<AnswerDto>> {
        logger.debug("Get all answers")
        val answers: MutableList<Answer> = answerService.getAllAnswers()
        return ResponseEntity(answers.convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteAnswerById(@PathVariable id: Int): ResponseEntity<Nothing> {
        logger.debug("Delete answer $id")
        return try {
            answerService.deleteAnswerById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Answer not found", HttpStatus.NOT_FOUND, MessageConstants.ANSWER_NOT_FOUND)
        }
    }
}
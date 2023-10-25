import hu.hm.szititourbackend.controller.admin.AnswerController
import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.repository.AnswerRepository
import hu.hm.szititourbackend.service.AnswerService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.invocation.InvocationOnMock
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import java.util.*


@ExtendWith(MockitoExtension::class)
class AnswerControllerTest {

    private lateinit var answerController: AnswerController

    @Mock
    lateinit var answerRepository: AnswerRepository

    @BeforeEach
    fun setUp() {
        val answerService = AnswerService(answerRepository)
        this.answerController = AnswerController(answerService)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(answerRepository.findById(anyInt())).thenReturn(Optional.of(Answer(1)))

        // Act
        val response = answerController.getAnswerById(1)

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.id)
    }

    @Test
    fun testGetAll() {
        // Arrange

        `when`(answerRepository.findAll()).thenReturn(listOf(Answer()))

        // Act
        val response = answerController.getAllAnswers()

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        doNothing().`when`(answerRepository).deleteById(anyInt())
        `when`(answerRepository.findById(anyInt())).thenReturn((Optional.of(Answer())))

        // Act
        val response = answerController.deleteAnswerById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

    @Test
    fun testMarkAsIncorrect() {
        // Arrange
        `when`(answerRepository.findById(anyInt())).thenReturn((Optional.of(Answer())))
        `when`(answerRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = answerController.markAsIncorrect(1)

        // Assert
        assertEquals(false, response.body?.correct)
    }

    @Test
    fun testMarkAsCorrect() {
        // Arrange
        val answer = Answer()
        `when`(answerRepository.findById(anyInt())).thenReturn((Optional.of(answer)))
        `when`(answerRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = answerController.markAsCorrect(1)

        // Assert
        assertEquals(true, response.body?.correct)
    }

}
import hu.hm.szititourbackend.controller.admin.QuestionController
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.repository.*
import hu.hm.szititourbackend.service.GameService
import hu.hm.szititourbackend.service.PlaceService
import hu.hm.szititourbackend.service.QuestionService
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
class QuestionControllerTest {

    private lateinit var controller: QuestionController

    @Mock
    private lateinit var repository: QuestionRepository

    @Mock
    private lateinit var placeRepository: PlaceRepository

    @Mock
    private lateinit var gameRepository: GameRepository

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @BeforeEach
    fun setUp() {
        val gameService = GameService(gameRepository, statusRepository)
        val placeService = PlaceService(placeRepository, gameService)
        val service = QuestionService(repository, placeService)
        this.controller = QuestionController(service)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Question(id = 1)))

        // Act
        val response = controller.getQuestionById(1)

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.id)
    }

    @Test
    fun testGetAll() {
        // Arrange
        `when`(repository.findAll()).thenReturn(listOf(Question()))

        // Act
        val response = controller.getAllQuestions()

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.size)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Question())))

        // Act
        val response = controller.deleteQuestionById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

    @Test
    fun testAddQuestion() {
        // Arrange
        `when`(placeRepository.findById(anyInt())).thenReturn((Optional.of(Place())))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.addQuestion(null, "1","shortText", "TestQuestion", "false")

        // Assert
        assertEquals(HttpStatus.CREATED, response.statusCode)
        assertNotNull(response.body)
        assertEquals("TestQuestion", response.body?.name)
    }

    @Test
    fun testUpdateQuestion() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Question())))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updateQuestion(null, "1","shortText", "TestQuestionUpdated", "false")

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
        assertEquals("TestQuestionUpdated", response.body?.name)
    }

}
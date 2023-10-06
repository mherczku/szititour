import hu.hm.szititourbackend.controller.GameController
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.TeamGameStatus
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.service.GameService
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
class GameControllerTest {

    private lateinit var controller: GameController

    @Mock
    private lateinit var repository: GameRepository

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @BeforeEach
    fun setUp() {
        val service = GameService(repository, teamGameStatusRepository = statusRepository)
        this.controller = GameController(service)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Game()))

        // Act
        val response = controller.getGameById(1)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testGetAll() {
        // Arrange
        `when`(repository.findAll()).thenReturn(listOf(Game()))

        // Act
        val response = controller.getAllGames()

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Game())))

        // Act
        val response = controller.deleteGameById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

    @Test
    fun testAddGame() {
        // Arrange
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.addGameWithImage(null, "TestGame", "1696590278563", "1696590278564")

        // Assert
        assertEquals(HttpStatus.CREATED, response.statusCode)
        assertNotNull(response.body)
    }

    @Test
    fun testGetStatusById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Game()))

        // Act
        val response = controller.getGameWithStatusesById(1)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testActivateGame() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Game()))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.activateGame(1)

        // Assert
        assertNotNull(response.body)
        assertEquals(true,  response.body?.active)
    }

    @Test
    fun testDeactivateGame() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Game(teamGameStatuses = mutableListOf(TeamGameStatus(1)))))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.deactivateGame(1)

        // Assert
        assertNotNull(response.body)
        assertEquals(false,  response.body?.active)
    }

    @Test
    fun testUpdateGame() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Game()))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updateGame(null, "1", "TestGame", "1696590278564", "1696590278565")

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
    }

}
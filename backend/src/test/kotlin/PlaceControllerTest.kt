import hu.hm.szititourbackend.controller.admin.PlaceController
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.PlaceRepository
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.service.GameService
import hu.hm.szititourbackend.service.PlaceService
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
class PlaceControllerTest {

    private lateinit var controller: PlaceController

    @Mock
    private lateinit var repository: PlaceRepository

    @Mock
    private lateinit var gameRepository: GameRepository

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @BeforeEach
    fun setUp() {
        val gameService = GameService(gameRepository, statusRepository)
        val service = PlaceService(repository, gameService)
        this.controller = PlaceController(service)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Place(id = 1)))

        // Act
        val response = controller.getPlaceById(1)

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.id)
    }

    @Test
    fun testGetAll() {
        // Arrange
        `when`(repository.findAll()).thenReturn(listOf(Place()))

        // Act
        val response = controller.getAllPlaces()

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.size)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Place())))

        // Act
        val response = controller.deletePlaceById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

    @Test
    fun testAddPlaceToGame() {
        // Arrange
        `when`(gameRepository.findById(anyInt())).thenReturn((Optional.of(Game())))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.addPlaceToGame(null, "1","TestPlace", "Test utca 1", "12.12", "12.12")

        // Assert
        assertEquals(HttpStatus.CREATED, response.statusCode)
        assertNotNull(response.body)
        assertEquals("TestPlace", response.body?.name)
    }

    @Test
    fun testUpdatePlace() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Place())))
        `when`(repository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updatePlace(null, "1", "12.12", "12.12", "TestPlaceUpdated", "Test utca 2")

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
        assertEquals("TestPlaceUpdated", response.body?.name)
    }

}
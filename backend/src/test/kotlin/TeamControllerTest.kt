import hu.hm.szititourbackend.controller.admin.TeamController
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.repository.*
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.service.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import java.util.*


@ExtendWith(MockitoExtension::class)
class TeamControllerTest {

    private lateinit var controller: TeamController

    @Mock
    private lateinit var repository: TeamRepository

    @Mock
    private lateinit var securityTokenService: SecurityTokenService

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @Mock
    private lateinit var emailService: EmailService

    @BeforeEach
    fun setUp() {
        val service = TeamService(securityTokenService, repository, statusRepository, emailService)
        this.controller = TeamController(service)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Team()))

        // Act
        val response = controller.getTeamById(1)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testGetAll() {
        // Arrange
        `when`(repository.findAll()).thenReturn(listOf(Team()))

        // Act
        val response = controller.getAllTeams()

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn((Optional.of(Team())))

        // Act
        val response = controller.deleteTeamById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

}
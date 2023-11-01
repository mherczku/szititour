import hu.hm.szititourbackend.controller.user.LoggedInController
import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.request.AnswersRequestBody
import hu.hm.szititourbackend.dto.request.QuestionAnswer
import hu.hm.szititourbackend.dto.response.TeamPasswordUpdateDto
import hu.hm.szititourbackend.dto.response.TeamUpdateProfileDto
import hu.hm.szititourbackend.extramodel.VerificationResponse
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
import org.mockito.invocation.InvocationOnMock
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.http.HttpStatus
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import java.util.*

@ExtendWith(MockitoExtension::class)
class LoggedInControllerTest {

    private lateinit var controller: LoggedInController
    private lateinit var authentication: JwtAuthenticationToken

    @Mock
    private lateinit var teamRepository: TeamRepository

    @Mock
    private lateinit var securityTokenService: SecurityTokenService

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @Mock
    private lateinit var gameRepository: GameRepository

    @Mock
    private lateinit var applicationRepository: ApplicationRepository

    @Mock
    private lateinit var questionRepository: QuestionRepository

    @Mock
    private lateinit var placeRepository: PlaceRepository

    @Mock
    private lateinit var answerRepository: AnswerRepository

    @Mock
    private lateinit var emailService: EmailService

    @BeforeEach
    fun setUp() {
        val teamService = TeamService(securityTokenService, teamRepository, statusRepository, emailService)
        val gameService = GameService(gameRepository, statusRepository)
        val placeService = PlaceService(placeRepository, gameService)
        val applicationService = ApplicationService(applicationRepository)
        val questionService = QuestionService(questionRepository, placeService)
        val answerService = AnswerService(answerRepository)
        val service = LoggedInService(gameService, statusRepository, teamService, questionService, answerService, applicationService)
        this.controller = LoggedInController(teamService, service)
        authentication = JwtAuthenticationToken(mock(Jwt::class.java), listOf(mock(SimpleGrantedAuthority::class.java)), "1")
    }

    @Test
    fun testUpdateProfile() {
        // Arrange
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(Team()))
        val update = TeamUpdateProfileDto("UpdatedName", listOf("1", "2", "3"))

        // Act
        val response = controller.updateProfile(update, authentication)

        // Assert
        assertNotNull(response.body)
        assertEquals("UpdatedName", response.body?.name)

    }

    @Test
    fun testUpdateTeamPasswordRequest() {
        // Arrange
        val team = Team(enabled = true)
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(securityTokenService.generatePasswordChangeToken(team)).thenReturn("")
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updateProfilePasswordRequest(authentication)

        // Assert
        assertNotNull(response.body)
        verify(emailService, times(1)).sendModifyPasswordMail("", "", "")
    }

    @Test
    fun testUpdateTeamPassword() {
        // Arrange
        val team = Team(enabled = true, passwordChangeId = "test")
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(securityTokenService.verifyPasswordChangeToken(anyString())).thenReturn(VerificationResponse(verified = true, false, messageCode = "test"))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updateProfilePassword("", TeamPasswordUpdateDto("NewPass123"), authentication)

        // Assert
        assertNotNull(response.body)
        verify(emailService, times(1)).sendPasswordUpdatedEmail("", "")
    }

    @Test
    fun testUpdateProfileEmail() {
        // Arrange
        val team = Team(enabled = true)
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(teamRepository.findByEmail(anyString())).thenReturn(Optional.empty())
        `when`(securityTokenService.generateEmailVerificationToken(team)).thenReturn("")
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.updateProfileEmail("newEmail@test.hu", authentication)

        // Assert
        assertNotNull(response.body)
        verify(emailService, times(1)).sendModifyEmailMail("newEmail@test.hu", "", "")
    }

    @Test
    fun testGetAllAvailable() {
        // Arrange
        `when`(gameRepository.findAll()).thenReturn(mutableListOf(Game()))

        // Act
        val response = controller.getAllAvailableGames(authentication)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
    }

    @Test
    fun testApplyForGame() {
        // Arrange
        `when`(gameRepository.findById(1)).thenReturn(Optional.of(Game(active = false)))
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(Team()))
        `when`(applicationRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.applyForGame(1, authentication)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
    }

    @Test
    fun testCancelApplicationForGame() {
        // Arrange
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(Team(id = 1, applications = mutableListOf(Application(1, game = Game(id = 1), team = Team(1))))))

        // Act
        val response = controller.cancelApplicationForGame(1, authentication)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
    }

    @Test
    fun testRevokeToken() {
        // Arrange
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(Team(clients = mutableListOf(ClientData("1")))))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.revokeToken("1", authentication)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
        assertNotNull(response.body)
        assertEquals(0, response.body?.clients?.size)
    }

    @Test
    fun testDeleteTeamRequest() {
        // Arrange
        val team = Team(enabled = true)
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(securityTokenService.generateTeamDeleteToken(team)).thenReturn("")
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.deleteTeamRequest(authentication)

        // Assert
        assertNotNull(response.body)
        verify(emailService, times(1)).sendTeamDeleteMail("", "", "")
    }

    @Test
    fun testDeleteTeam() {
        // Arrange
        val team = Team(id = 1, enabled = true, passwordChangeId = "test")
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(securityTokenService.verifyTeamDeleteToken(anyString())).thenReturn(VerificationResponse(verified = true, false, teamId = 1, messageCode = "test"))

        // Act
        val response = controller.deleteTeam("")

        // Assert
        assertNotNull(response.body)
        verify(teamRepository, times(1)).deleteById(1)
    }

    @Test
    fun testGetGameData() {
        // Arrange
        val team = Team(id = 1, enabled = true, passwordChangeId = "test", applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))))
        val game = Game(id = 1, applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))), active = true)
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(gameRepository.findById(1)).thenReturn(Optional.of(game))
        `when`(statusRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.getGameData(1, authentication)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testGetTeamGameStatus() {
        // Arrange
        val team = Team(id = 1, enabled = true, passwordChangeId = "test", applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))))
        val game = Game(id = 1, applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))), active = true)
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(gameRepository.findById(1)).thenReturn(Optional.of(game))
        `when`(statusRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.getTeamGameStatus(1, authentication)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testAnswerQuestions() {
        // Arrange
        val team = Team(id = 1, enabled = true, passwordChangeId = "test", applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))))
        val game = Game(id = 1, applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))), active = true)
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(gameRepository.findById(1)).thenReturn(Optional.of(game))
        `when`(questionRepository.findById(1)).thenReturn(Optional.of(Question(1)))
        `when`(statusRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }
        `when`(answerRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.answerQuestions(AnswersRequestBody(1, listOf(QuestionAnswer(1, Answer(answerText = "test")))), authentication)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testAnswerQuestion() {
        // Arrange
        val team = Team(id = 1, enabled = true, passwordChangeId = "test", applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))))
        val game = Game(id = 1, applications = mutableListOf(Application(1, accepted = true, team = Team(1), game = Game(1))), active = true)
        `when`(teamRepository.findById(anyInt())).thenReturn(Optional.of(team))
        `when`(gameRepository.findById(anyInt())).thenReturn(Optional.of(game))
        `when`(questionRepository.findById(anyInt())).thenReturn(Optional.of(Question(1, place = Place(1, game = Game(1)))))
        `when`(statusRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }
        `when`(answerRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.answerQuestion(1, Answer(answerText = "test"), authentication)

        // Assert
        assertNotNull(response.body)
    }

}
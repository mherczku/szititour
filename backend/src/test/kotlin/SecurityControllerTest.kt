import hu.hm.szititourbackend.datamodel.*
import hu.hm.szititourbackend.dto.TeamPasswordUpdateDto
import hu.hm.szititourbackend.extramodel.LoginData
import hu.hm.szititourbackend.extramodel.VerificationResponse
import hu.hm.szititourbackend.repository.*
import hu.hm.szititourbackend.security.SecurityController
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
import java.util.*


@ExtendWith(MockitoExtension::class)
class SecurityControllerTest {

    private lateinit var controller: SecurityController

    @Mock
    private lateinit var teamRepository: TeamRepository

    @Mock
    private lateinit var securityTokenService: SecurityTokenService

    @Mock
    private lateinit var statusRepository: TeamGameStatusRepository

    @Mock
    private lateinit var emailService: EmailService

    @BeforeEach
    fun setUp() {
        val teamService = TeamService(securityTokenService, teamRepository, statusRepository, emailService)
        this.controller = SecurityController(teamService, securityTokenService)
    }

    @Test
    fun testAuthorize() {
        // Arrange
        `when`(securityTokenService.verifyToken("1")).thenReturn(VerificationResponse(true, teamId = 1, messageCode = "TEST_SUCCESS"))
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(Team(1)))

        // Act
        val response = controller.authorize("1")

        // Assert
        assertNotNull(response.body)
        assertEquals(1, response.body?.team?.id)
    }

    @Test
    fun testVerifyEmailWithToken() {
        // Arrange
        `when`(securityTokenService.verifyEmailVerificationToken("1")).thenReturn(VerificationResponse(true, teamId = 1, messageCode = "TEST_SUCCESS"))
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(Team(1, enabled = true, nextEmail = "testEmail@test.hu")))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.verifyEmailWithToken("1")

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
    }

    /* TODO KELL? @Test
    fun testAuthorizeByGoogle() {
        // Arrange
        val team = Team(1, enabled = true, isGoogle = true)
        `when`(securityService.verifyGoogleToken("1")).thenReturn(GoogleAccount("1", "test@test.hu", true, "", "", "", "", ""))
        `when`(securityService.generateToken(team, anyString(), any<Instant>(Instant::class.java))).thenReturn("test_token")
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(teamRepository.findByEmail(anyString())).thenReturn(Optional.of(team))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.authorizeByGoogle("1", ClientData(), mock(HttpServletRequest::class.java), mock(HttpServletResponse::class.java))

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
    }*/

    /*@Test
    fun testLogin() {
        // Arrange
        val authentication = JwtAuthenticationToken(mock(Jwt::class.java), listOf(mock(SimpleGrantedAuthority::class.java)), "test@test.hu")

        val team = Team(1, enabled = true, isGoogle = true)
        `when`(securityService.verifyGoogleToken("1")).thenReturn(GoogleAccount("1", "test@test.hu", true, "", "", "", "", ""))
        `when`(securityService.generateToken(team, anyString(), any())).thenReturn("test_token")
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(teamRepository.findByEmail(anyString())).thenReturn(Optional.of(team))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.login(authentication, ClientData(), mock(HttpServletRequest::class.java), mock(HttpServletResponse::class.java))

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
    }*/

    @Test
    fun testRegister() {
        // Arrange
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.register(LoginData("test@testtest.hu", "Alma1234", "TestTest"))

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
    }

    @Test
    fun testLogout() {
        // Arrange
        `when`(securityTokenService.verifyToken("1")).thenReturn(VerificationResponse(true, teamId = 1, messageCode = "TEST_SUCCESS"))
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(Team(1, clients = mutableListOf(ClientData("1")))))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.logout("1")

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
    }

    @Test
    fun testForgotPasswordRequest() {
        // Arrange
        val team = Team(1, clients = mutableListOf(ClientData("1")), enabled = true)
        `when`(securityTokenService.generatePasswordChangeToken(team)).thenReturn("")
        `when`(teamRepository.findByEmail("test@test.hu")).thenReturn(Optional.of(team))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.forgotPasswordRequest("test@test.hu")

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
        verify(emailService, times(1)).sendForgotPasswordMail(anyString(), anyString(), anyString())
    }

    @Test
    fun testForgotPassword() {
        // Arrange
        val team = Team(1, clients = mutableListOf(ClientData("1")), enabled = true, passwordChangeId = "test")
        `when`(securityTokenService.verifyPasswordChangeToken(anyString())).thenReturn(VerificationResponse(true, teamId = 1, messageCode = "test"))
        `when`(teamRepository.findById(1)).thenReturn(Optional.of(team))
        `when`(teamRepository.save(any())).thenAnswer { i: InvocationOnMock -> i.arguments[0] }

        // Act
        val response = controller.forgotPassword("", TeamPasswordUpdateDto("Alma1234"))

        // Assert
        assertNotNull(response.body)
        assertEquals(true, response.body?.success)
        verify(emailService, times(1)).sendPasswordUpdatedEmail(anyString(), anyString())
    }


}
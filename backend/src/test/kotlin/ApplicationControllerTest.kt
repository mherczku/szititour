import hu.hm.szititourbackend.controller.ApplicationController
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.repository.ApplicationRepository
import hu.hm.szititourbackend.service.ApplicationService
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
class ApplicationControllerTest {

    private lateinit var controller: ApplicationController

    @Mock
    private lateinit var repository: ApplicationRepository

    @BeforeEach
    fun setUp() {
        val service = ApplicationService(repository)
        this.controller = ApplicationController(service)
    }

    @Test
    fun testGetById() {
        // Arrange
        `when`(repository.findById(anyInt())).thenReturn(Optional.of(Application()))

        // Act
        val response = controller.getApplicationById(1)

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testGetAll() {
        // Arrange
        `when`(repository.findAll()).thenReturn(listOf(Application()))

        // Act
        val response = controller.getAllApplications()

        // Assert
        assertNotNull(response.body)
    }

    @Test
    fun testDeleteById() {
        // Arrange
        // Act
        val response = controller.deleteApplicationById(1)

        // Assert
        assertEquals(HttpStatus.OK, response.statusCode)
    }

}
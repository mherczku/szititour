package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.service.ApplicationService
import hu.hm.szititourbackend.util.AuthUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/applications")
class ApplicationController @Autowired constructor(private val applicationService: ApplicationService) {

    @PostMapping()
    fun addApplication(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @RequestBody application: Application): ResponseEntity<ApplicationDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newApplication = applicationService.addApplication(application)
        return ResponseEntity(newApplication.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getApplicationById(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @PathVariable id: Int): ResponseEntity<ApplicationDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val application: Optional<Application> = applicationService.getApplicationById(id)
        if (!application.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(application.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllApplications(@CookieValue(AuthUtils.COOKIE_NAME) token: String?): ResponseEntity<List<ApplicationDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val applications: List<ApplicationDto> = applicationService.getAllApplications()
        return ResponseEntity<List<ApplicationDto>>(applications, HttpStatus.OK)
    }

    @PutMapping
    fun updateApplication(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @RequestBody application: Application): ResponseEntity<ApplicationDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return ResponseEntity(applicationService.updateApplication(application).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteApplicationById(@CookieValue(AuthUtils.COOKIE_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            applicationService.deleteApplicationById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
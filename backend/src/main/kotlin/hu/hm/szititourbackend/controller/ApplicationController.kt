package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.ApplicationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/applications")
class ApplicationController @Autowired constructor(private val applicationService: ApplicationService) {

    @PostMapping()
    fun addApplication(@RequestBody application: Application): ResponseEntity<ApplicationDto> {
        val newApplication = applicationService.addApplication(application)
        return ResponseEntity(newApplication.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getApplicationById(@PathVariable id: Int): ResponseEntity<ApplicationDto?> {
        val application: Optional<Application> = applicationService.getApplicationById(id)
        if (!application.isPresent) {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(application.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllApplications(): ResponseEntity<List<ApplicationDto>> {
        val applications: List<ApplicationDto> = applicationService.getAllApplications()
        return ResponseEntity<List<ApplicationDto>>(applications, HttpStatus.OK)
    }

    @PutMapping
    fun updateApplication(@RequestBody application: Application): ResponseEntity<ApplicationDto> {
        return ResponseEntity(applicationService.updateApplication(application).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteApplicationById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            applicationService.deleteApplicationById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND)
        }
    }
}
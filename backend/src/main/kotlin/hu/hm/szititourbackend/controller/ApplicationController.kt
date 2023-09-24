package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.ApplicationService
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/applications")
class ApplicationController @Autowired constructor(private val applicationService: ApplicationService) {

    val logger: Logger = LoggerFactory.getLogger(ApplicationController::class.java)

    @GetMapping("/{id}")
    fun getApplicationById(@PathVariable id: Int): ResponseEntity<ApplicationDto?> {
        logger.debug("Get application by id ${id}")
        val application: Application = applicationService.getApplicationById(id)
        return ResponseEntity(application.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllApplications(): ResponseEntity<List<ApplicationDto>> {
        logger.debug("Get all applications")
        val applications: List<ApplicationDto> = applicationService.getAllApplications().convertToDto()
        return ResponseEntity<List<ApplicationDto>>(applications, HttpStatus.OK)
    }

    @PutMapping
    fun updateApplication(@RequestBody application: Application): ResponseEntity<ApplicationDto> {
        logger.debug("Update application ${application.id}")
        return ResponseEntity(applicationService.updateApplication(application).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteApplicationById(@PathVariable id: Int): ResponseEntity<Nothing> {
        logger.debug("Delete application ${id}")
        return try {
            applicationService.deleteApplicationById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND, MessageConstants.APPLICATION_NOT_FOUND)
        }
    }
}
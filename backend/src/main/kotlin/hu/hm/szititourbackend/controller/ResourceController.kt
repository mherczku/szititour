package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_RESOURCE_TOKEN
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.*
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/resources")
class ResourceController @Autowired constructor(
    private val securityService: SecurityService,
) {

    val logger: Logger = LoggerFactory.getLogger(ResourceController::class.java)

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping("/images")
    fun getResourceV2(
            @RequestParam(HEADER_RESOURCE_TOKEN) token: String,
            @RequestParam("img") imagePath: String
    ): ResponseEntity<UrlResource> {

        val verification = securityService.verifyResourceToken(token, imagePath)
        logger.debug("Get resource $imagePath by user ${verification.teamId}")

        if (verification.verified) {

            val paths = imagePath.split('-')

            val directory = Utils.getImageDirectoryFromName(paths[0])

            if (directory == "") {
                throw CustomException("Image resource not found - directory not exist", HttpStatus.BAD_REQUEST)
            }

            val filename = paths[1]
            val extension = StringUtils.getFilenameExtension(imagePath)
            val path: Path = Paths.get("$directory/$filename")

            val image = File(path.toUri())
            if (!image.exists()) {
                throw CustomException("Image not found", HttpStatus.NOT_FOUND)
            }

            val urlRes = UrlResource(path.toUri())
            val contentType: MediaType = if (extension == "jpg") MediaType.IMAGE_JPEG else MediaType.IMAGE_PNG

            return ResponseEntity.ok()
                    .contentType(contentType)
                    .body(urlRes)
        }
        else {
            throw CustomException("Verification unsuccessful", HttpStatus.FORBIDDEN)
        }
    }


}
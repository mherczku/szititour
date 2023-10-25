package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_RESOURCE_TOKEN
import hu.hm.szititourbackend.service.ResourceService
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/resources")
class ResourceController @Autowired constructor(
        private val securityTokenService: SecurityTokenService,
        private val resourceService: ResourceService
) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    //!!!  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping("/images")
    fun getResourceV2(
            @RequestHeader(HEADER_RESOURCE_TOKEN) token: String,
            @RequestParam("img") imagePath: String
    ): ResponseEntity<UrlResource> {

        val verification = securityTokenService.verifyResourceToken(token, imagePath)
        logger.debug("Get resource $imagePath by user ${verification.teamId}")

        if (verification.verified) {
            return this.resourceService.getResource(imagePath)
        }
        else {
            throw CustomException("Verification unsuccessful", HttpStatus.FORBIDDEN, MessageConstants.VERIFICATION_FAILED)
        }
    }

}
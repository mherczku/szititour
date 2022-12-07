package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.TOKEN_NAME
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.*
import java.nio.file.Path
import java.nio.file.Paths
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/resources")
class ResourceController @Autowired constructor(
    private val securityService: SecurityService,
) {

    //!//  HAS CUSTOM TOKEN VERIFICATION, OUTSIDE OF SPRING SECURITY

    @GetMapping("/images")
    fun getResource(
        @RequestParam(TOKEN_NAME) token: String,
        @RequestParam("image") imagePath: String,
        response: HttpServletResponse
    ): ResponseEntity<UrlResource> {

        val verification = securityService.verifyToken(token)

        if (verification.verified && verification.isAdmin) {

            val paths = imagePath.split('-')

            val directory = when (paths[0]) {
                "games" -> Utils.imageDirectoryGames
                "teams" -> Utils.imageDirectoryTeams
                "answers" -> Utils.imageDirectoryAnswers
                "places" -> Utils.imageDirectoryPlaces
                "questions" -> Utils.imageDirectoryQuestions
                else -> ""
            }

            if (directory == "") {
                throw Exception("Image resource not found - directory not exist")
            }

            val filename = paths[1]
            val extension = StringUtils.getFilenameExtension(imagePath)
            val path: Path = Paths.get("$directory/$filename")
            val urlRes = UrlResource(path.toUri())
            val contentType: MediaType = if (extension == "jpg") MediaType.IMAGE_JPEG else MediaType.IMAGE_PNG

            return ResponseEntity.ok()
                .contentType(contentType)
                .body(urlRes)
        }
        /*else if(verification.verified) {
            // todo if not admin

        }*/
        else {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }


}
package hu.hm.szititourbackend.service


import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.util.ImgUtils
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths


@Service
class ResourceService {
    fun getResource(imagePath: String): ResponseEntity<UrlResource> {
        val paths = imagePath.split('-')

        val directory = ImgUtils.getImageDirectoryFromName(paths[0])

        if (directory == "") {
            throw CustomException("Image resource not found - directory not exist", HttpStatus.BAD_REQUEST, MessageConstants.RESOURCE_DIRECTORY_NOT_FOUND)
        }

        val filename = paths[1]
        val extension = StringUtils.getFilenameExtension(imagePath)
        val path: Path = Paths.get("$directory/$filename")

        val image = File(path.toUri())
        if (!image.exists()) {
            throw CustomException("Image not found", HttpStatus.NOT_FOUND, MessageConstants.RESOURCE_IMG_NOT_FOUND)
        }

        val urlRes = UrlResource(path.toUri())
        val contentType: MediaType = if (extension == "jpg") MediaType.IMAGE_JPEG else MediaType.IMAGE_PNG

        return ResponseEntity.ok()
                .contentType(contentType)
                .body(urlRes)

    }
}
package hu.hm.szititourbackend.util

import hu.hm.szititourbackend.exception.CustomException
import net.bytebuddy.utility.RandomString
import org.springframework.http.HttpStatus
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

object Utils {

    const val imageDirectory = "images"
    const val imageDirectoryTeams = "images/teams"
    const val imageDirectoryGames = "images/games"
    const val imageDirectoryPlaces = "images/places"
    const val imageDirectoryQuestions = "images/questions"
    const val imageDirectoryAnswers = "images/answers"

    const val imageDirectoryTeamsName = "teams"
    const val imageDirectoryGamesName = "games"
    const val imageDirectoryPlacesName = "places"
    const val imageDirectoryQuestionsName = "questions"
    const val imageDirectoryAnswersName = "answers"


    fun getImageDirectoryFromName(directoryName: String): String {
        return when (directoryName) {
            "games" -> imageDirectoryGames
            "teams" -> imageDirectoryTeams
            "answers" -> imageDirectoryAnswers
            "places" -> imageDirectoryPlaces
            "questions" -> imageDirectoryQuestions
            else -> ""
        }
    }

    fun deleteImage(imgPath: String?) {
        // delete img if exists
        if (imgPath != null && imgPath != "") {
            val paths = imgPath.split('-')
            val currentDirectoryName = getImageDirectoryFromName(paths[0])
            val currentFileName = paths[1]
            val imageFile = File("$currentDirectoryName/$currentFileName")
            if (imageFile.exists()) {
                imageFile.delete()
            }
        }
    }

    fun saveImage(file: MultipartFile, directoryToSaveName: String, img: String? = null): String {

        // delete current img if exists
        deleteImage(img)

        val directoryToSavePath = getImageDirectoryFromName(directoryToSaveName)

        if (directoryToSavePath == "") {
            throw CustomException("Image resource not found - directory not exist", HttpStatus.NOT_FOUND, MessageConstants.RESOURCE_DIRECTORY_NOT_FOUND)
        }

        var imagePath = ""
        val directoryImages = File(imageDirectory)
        if (!directoryImages.exists()) {
            directoryImages.mkdir()
        }

        val directoryImagesTemp = File("images/temp")
        if (!directoryImagesTemp.exists()) {
            directoryImagesTemp.mkdir()
        }

        val directoryToSave = File(directoryToSavePath)
        if (!directoryToSave.exists()) {
            directoryToSave.mkdir()
        }

        val extension = StringUtils.getFilenameExtension(file.originalFilename)
        if (extension == "jpg" || extension == "png") {
            val newFileName = RandomString.make(8)
            val fileNameAndPath: Path = Paths.get(directoryToSavePath, "$newFileName.$extension")
            val newFile = fileNameAndPath.toFile()
            //val tempPath: Path = Paths.get("images/temp")
            //val tempFile = kotlin.io.path.createTempFile(directory = tempPath).toFile()

            try {
                //Files.write(tempFile.toPath(), file.bytes)
                Files.write(newFile.toPath(), file.bytes)
                //ImageCompressor.compressImage(tempFile, newFile)
                //tempFile.delete()
            } catch(ex: Exception) {
                newFile.delete()
                //tempFile.delete()
                throw CustomException("This png does not support compression, please try with another or use jpg", HttpStatus.BAD_REQUEST, MessageConstants.IMG_COMPRESSION_NOT_SUPPORTED)
            }

            imagePath = "$directoryToSaveName-$newFileName.$extension"
        } else {
            throw CustomException("Image format must be png or jpg", HttpStatus.BAD_REQUEST, MessageConstants.IMG_FORMAT_NOT_SUPPORTED)
        }
        return imagePath
    }

}
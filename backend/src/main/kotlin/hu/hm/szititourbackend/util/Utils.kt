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
import java.util.regex.Pattern

object Utils {

    private val EMAIL_REGEX_PATTERN: Pattern =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    private val NUMBER: Pattern = Pattern.compile("[0-9]", Pattern.CASE_INSENSITIVE)
    private val AZLETTER: Pattern = Pattern.compile("[A-z]", Pattern.CASE_INSENSITIVE)
    private val SPECIALCHARACTERS: Pattern = Pattern.compile("[!+#&@A-z0-9]\$", Pattern.LITERAL)

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
            throw CustomException("Image resource not found - directory not exist", HttpStatus.NOT_FOUND)
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
            val tempPath: Path = Paths.get("images/temp")
            val tempFile = kotlin.io.path.createTempFile(directory = tempPath).toFile()

            try {
                Files.write(tempFile.toPath(), file.bytes)
                ImageCompressor.compressImage(tempFile, newFile)
                tempFile.delete()
            } catch(ex: Exception) {
                newFile.delete()
                tempFile.delete()
                throw CustomException("This png does not support compression, please try with another or use jpg", HttpStatus.BAD_REQUEST)
            }

            imagePath = "$directoryToSaveName-$newFileName.$extension"
        } else {
            throw CustomException("Image format must be png or jpg", HttpStatus.BAD_REQUEST)
        }
        return imagePath
    }

    fun validateEmail(email: String): Boolean {
        return EMAIL_REGEX_PATTERN.matcher(email).find()
    }

    fun validatePassword(password: String): Boolean {
        // accepted special characters = #!&+@
        return (password.length >= 8 && NUMBER.matcher(password).find() && AZLETTER.matcher(password)
            .find() && !password.contains(" "))
    }
}
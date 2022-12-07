package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.service.GameService
import hu.hm.szititourbackend.util.Utils.imageDirectory
import hu.hm.szititourbackend.util.Utils.imageDirectoryGames
import net.bytebuddy.utility.RandomString
import org.hibernate.exception.ConstraintViolationException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.sql.Timestamp
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/games")
class GameController @Autowired constructor(private val gameService: GameService) {


    @PostMapping()
    fun addGame(@RequestBody game: Game): ResponseEntity<*> {
        return try {
            val newGame = gameService.addGame(game)
            ResponseEntity(newGame.convertToDto(), HttpStatus.CREATED)
        } catch (ex: DataIntegrityViolationException) {
            ResponseEntity(Response(false, errorMessage = "This game title is already taken"), HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/image")
    fun addGameWithImage(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("gameTitle") gameTitle: String,
        @RequestParam("gameStart") gameStart: String,
        @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<*> {

        val dateEnd: Timestamp = Timestamp(gameEnd.toLong())
        val dateStart: Timestamp = Timestamp(gameStart.toLong())

        return try {

            var imagePath = ""
            val directory = File(imageDirectory)
            if (!directory.exists()) {
                directory.mkdir()
            }
            val directoryGames = File(imageDirectoryGames)
            if (!directoryGames.exists()) {
                directoryGames.mkdir()
            }

            if (file != null) {
                val extension = StringUtils.getFilenameExtension(file.originalFilename)
                if (extension == "jpg" || extension == "png") {
                    val newFileName = RandomString.make(8)
                    val fileNames = StringBuilder()
                    val fileNameAndPath: Path = Paths.get(imageDirectoryGames, "$newFileName.$extension")
                    fileNames.append(file.originalFilename)
                    Files.write(fileNameAndPath, file.bytes)
                    imagePath = "games-$newFileName.$extension"
                } else {
                    // todo exception image format must be png or jpg
                }
            }

            val game = Game(
                title = gameTitle,
                img = imagePath,
                dateEnd = dateEnd,
                dateStart = dateStart
            )
            val newGame = gameService.addGame(game)
            ResponseEntity(newGame.convertToDto(), HttpStatus.CREATED)
        } catch (ex: DataIntegrityViolationException) {
            ResponseEntity(Response(false, errorMessage = "This game title is already taken"), HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}")
    fun getGameById(@PathVariable id: Int): ResponseEntity<GameDto?> {
        val game: Optional<Game> = gameService.getGameById(id)
        if (!game.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(game.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllGames(): ResponseEntity<List<GameDto>> {
        val games: MutableList<Game> = gameService.getAllGames()
        return ResponseEntity<List<GameDto>>(games.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateGame(@RequestBody game: Game): ResponseEntity<*> {
        try {
            return ResponseEntity(gameService.updateGame(game).convertToDto(), HttpStatus.OK)
        } catch (ex: Exception) {
            if (ex is ConstraintViolationException) {
                return ResponseEntity(Response(false, errorMessage = ex.message.toString()), HttpStatus.BAD_REQUEST)
            }
            return ResponseEntity(
                Response(false, errorMessage = ex.message.toString()),
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    @DeleteMapping("/{id}")
    fun deleteGameById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            gameService.deleteGameById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}

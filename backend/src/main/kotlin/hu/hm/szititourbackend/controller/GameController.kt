package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.GameService
import org.hibernate.exception.ConstraintViolationException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/games")
class GameController @Autowired constructor(private val gameService: GameService) {

    @PostMapping()
    fun addGame(@RequestBody game: Game): ResponseEntity<GameDto> {
        return try {
            val newGame = gameService.addGame(game)
            ResponseEntity(newGame.convertToDto(), HttpStatus.CREATED)
        } catch (ex: DataIntegrityViolationException) {
            throw CustomException("This game title is already taken", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/image")
    fun addGameWithImage(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("gameTitle") gameTitle: String,
        @RequestParam("gameStart") gameStart: String,
        @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<GameDto> {

        return try {

            val dateEnd = Timestamp(gameEnd.toLong())
            val dateStart = Timestamp(gameStart.toLong())

            val game = Game(
                title = gameTitle,
                dateEnd = dateEnd,
                dateStart = dateStart
            )

            val createdGame: Game = if (file != null) {
                gameService.addGameWithImage(game, file)
            } else {
                gameService.addGame(game)
            }

            ResponseEntity(createdGame.convertToDto(), HttpStatus.CREATED)
        } catch (ex: DataIntegrityViolationException) {
            throw CustomException("This game title is already taken", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}")
    fun getGameById(@PathVariable id: Int): ResponseEntity<GameDto?> {
        val game: Optional<Game> = gameService.getGameById(id)
        if (!game.isPresent) {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND)

        }
        return ResponseEntity(game.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllGames(): ResponseEntity<List<GameDto>> {
        val games: MutableList<Game> = gameService.getAllGames()
        return ResponseEntity<List<GameDto>>(games.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateGame(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("currentImage") img: String,
        @RequestParam("gameId") gameId: String,
        @RequestParam("gameTitle") gameTitle: String,
        @RequestParam("gameStart") gameStart: String,
        @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<GameDto> {
        try {

            val dateEnd = Timestamp(gameEnd.toLong())
            val dateStart = Timestamp(gameStart.toLong())

            val game = Game(
                id = gameId.toInt(),
                title = gameTitle,
                dateEnd = dateEnd,
                dateStart = dateStart,
                img = img
            )

            val updatedGame: Game = if (file != null) {
                gameService.updateGameWithImage(game, file)
            } else {
                gameService.updateGame(game)
            }

            return ResponseEntity(gameService.updateGame(updatedGame).convertToDto(), HttpStatus.OK)
        } catch (ex: Exception) {
            if (ex is ConstraintViolationException) {
                throw CustomException("This game title is already taken", HttpStatus.BAD_REQUEST)
            }
            throw ex
        }
    }

    @DeleteMapping("/{id}")
    fun deleteGameById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            gameService.deleteGameById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND)
        }
    }
}

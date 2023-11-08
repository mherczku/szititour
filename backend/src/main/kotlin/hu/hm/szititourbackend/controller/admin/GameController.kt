package hu.hm.szititourbackend.controller.admin

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.datamodel.convertToStatusDto
import hu.hm.szititourbackend.dto.request.DirectNotification
import hu.hm.szititourbackend.dto.response.GameDto
import hu.hm.szititourbackend.dto.response.GameWithStatusesDto
import hu.hm.szititourbackend.service.GameService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/games")
class GameController @Autowired constructor(private val gameService: GameService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    @PostMapping("/image")
    fun addGameWithImage(
            @RequestParam("image") file: MultipartFile?,
            @RequestParam("gameTitle") gameTitle: String,
            @RequestParam("gameStart") gameStart: String,
            @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<GameDto> {

        logger.debug("Add new game with image ${gameTitle}")

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
        return ResponseEntity(createdGame.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getGameById(@PathVariable id: Int): ResponseEntity<GameDto?> {
        logger.debug("Get game by id ${id}")
        val game: Game = gameService.getGameById(id)
        return ResponseEntity(game.convertToDto(), HttpStatus.OK)
    }

    @GetMapping("/{id}/status")
    fun getGameWithStatusesById(@PathVariable id: Int): ResponseEntity<GameWithStatusesDto?> {
        logger.debug("Get game with statuses by id ${id}")
        val game: Game = gameService.getGameById(id)
        return ResponseEntity(game.convertToStatusDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllGames(): ResponseEntity<List<GameDto>> {
        logger.debug("Get all games")
        val games: MutableList<Game> = gameService.getAllGames()
        return ResponseEntity<List<GameDto>>(games.convertToDto(), HttpStatus.OK)
    }

    @PutMapping("activate/{id}")
    fun activateGame(@PathVariable("id") gameId: Int): ResponseEntity<GameDto> {
        logger.debug("Activate game by id ${gameId}")
        return ResponseEntity(gameService.changeActivation(gameId, true).convertToDto(), HttpStatus.OK)
    }

    @PutMapping("deactivate/{id}")
    fun deactivateGame(@PathVariable("id") gameId: Int, @RequestBody deleting: Boolean): ResponseEntity<GameDto> {
        logger.debug("Deactivate game by id ${gameId}, deleting statuses: ${deleting}")
        return ResponseEntity(gameService.changeActivation(gameId, false, deleting).convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateGame(
            @RequestParam("image") file: MultipartFile?,
            @RequestParam("gameId") gameId: String,
            @RequestParam("gameTitle") gameTitle: String,
            @RequestParam("gameStart") gameStart: String,
            @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<GameDto> {

        logger.debug("Update game by id ${gameId}")

        val dateEnd = Timestamp(gameEnd.toLong())
        val dateStart = Timestamp(gameStart.toLong())

        val updateGame = gameService.getGameById(gameId.toInt())
        updateGame.title = gameTitle
        updateGame.dateStart = dateStart
        updateGame.dateEnd = dateEnd

        val updatedGame: Game = if (file != null) {
            gameService.updateGameWithImage(updateGame, file)
        } else {
            gameService.updateGame(updateGame)
        }

        return ResponseEntity(updatedGame.convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteGameById(@PathVariable id: Int): ResponseEntity<Nothing> {
        logger.debug("Delete game by id ${id}")
        gameService.deleteGameById(id)
        return ResponseEntity(null, HttpStatus.OK)
    }
}

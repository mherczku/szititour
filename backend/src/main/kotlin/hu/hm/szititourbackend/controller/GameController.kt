package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.datamodel.convertToStatusDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.dto.GameWithStatusesDto
import hu.hm.szititourbackend.service.GameService
import org.springframework.beans.factory.annotation.Autowired
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
        val newGame = gameService.addGame(game)
        return ResponseEntity(newGame.convertToDto(), HttpStatus.CREATED)
    }

    @PostMapping("/image")
    fun addGameWithImage(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("gameTitle") gameTitle: String,
        @RequestParam("gameStart") gameStart: String,
        @RequestParam("gameEnd") gameEnd: String
    ): ResponseEntity<GameDto> {

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
        val game: Game = gameService.getGameById(id)
        return ResponseEntity(game.convertToDto(), HttpStatus.OK)
    }

    @GetMapping("/{id}/status")
    fun getGameWithStatusesById(@PathVariable id: Int): ResponseEntity<GameWithStatusesDto?> {
        val game: Game = gameService.getGameById(id)
        return ResponseEntity(game.convertToStatusDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllGames(): ResponseEntity<List<GameDto>> {
        val games: MutableList<Game> = gameService.getAllGames()
        return ResponseEntity<List<GameDto>>(games.convertToDto(), HttpStatus.OK)
    }

    @PutMapping("activate/{id}")
    fun activateGame(@PathVariable("id") gameId: Int): ResponseEntity<GameDto> {
        return ResponseEntity(gameService.changeActivation(gameId, true).convertToDto(), HttpStatus.OK)
    }

    @PutMapping("deactivate/{id}")
    fun deactivateGame(@PathVariable("id") gameId: Int): ResponseEntity<GameDto> {
        return ResponseEntity(gameService.changeActivation(gameId, false).convertToDto(), HttpStatus.OK)
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
    }


    @DeleteMapping("/{id}")
    fun deleteGameById(@PathVariable id: Int): ResponseEntity<Nothing> {
        gameService.deleteGameById(id)
        return ResponseEntity(null, HttpStatus.OK)
    }
}

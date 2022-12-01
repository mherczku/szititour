package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.service.GameService
import hu.hm.szititourbackend.util.AuthUtils
import org.hibernate.exception.ConstraintViolationException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/games")
class GameController @Autowired constructor(private val gameService: GameService) {

    @PostMapping()
    fun addGame(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody game: Game): ResponseEntity<*> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity<Response>(HttpStatus.UNAUTHORIZED)
        }
        return try {
            val newGame = gameService.addGame(game)
            ResponseEntity(newGame.convertToDto(), HttpStatus.CREATED)
        } catch (ex: DataIntegrityViolationException){
            ResponseEntity(Response(false, errorMessage = "This game title is already taken"), HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{id}")
    fun getGameById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<GameDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val game: Optional<Game> = gameService.getGameById(id)
        if (!game.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(game.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllGames(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?): ResponseEntity<List<GameDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val games: MutableList<Game> = gameService.getAllGames()
        return ResponseEntity<List<GameDto>>(games.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updateGame(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody game: Game): ResponseEntity<*> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity<Response>(HttpStatus.UNAUTHORIZED)
        }
        try {
            return ResponseEntity(gameService.updateGame(game).convertToDto(), HttpStatus.OK)
        } catch (ex: Exception){
            if(ex is ConstraintViolationException) {
                return ResponseEntity(Response(false, errorMessage = ex.message.toString()), HttpStatus.BAD_REQUEST)
            }
            return ResponseEntity(Response(false, errorMessage = ex.message.toString()), HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteGameById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            gameService.deleteGameById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}

package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.TeamGameStatusRepository
import hu.hm.szititourbackend.util.ImgUtils
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp

@Service
@Transactional
class GameService @Autowired constructor(private val gameRepository: GameRepository, private val teamGameStatusRepository: TeamGameStatusRepository) {

    fun getAllAvailableGames(): MutableList<Game> {
        val games = gameRepository.findAll()
        val filtered = games.filter { it.dateEnd >= Timestamp(System.currentTimeMillis()) }
        return filtered.toMutableList()
    }

    fun addGame(game: Game): Game {
        game.createdAt = Timestamp(System.currentTimeMillis())
        game.updatedAt = Timestamp(System.currentTimeMillis())
        return gameRepository.save(game)
    }

    fun addGameWithImage(newGame: Game, file: MultipartFile): Game {
        val addedGame = addGame(newGame)
        try {
            val imagePath = ImgUtils.saveImage(file, ImgUtils.imageDirectoryGamesName)
            addedGame.img = imagePath
            return updateGame(addedGame)
        } catch (ex: Exception) {
            deleteGameById(addedGame.id)
            throw ex
        }
    }

    fun getAllGames(): MutableList<Game> {
        return gameRepository.findAll()
    }

    fun getGameById(id: Int): Game {
        val game = gameRepository.findById(id)
        if (game.isPresent) {
            return game.get()
        } else {
            throw CustomException("Game not found", HttpStatus.NOT_FOUND, MessageConstants.GAME_NOT_FOUND)
        }
    }

    fun updateGameWithImage(game: Game, file: MultipartFile): Game {
        val updated = updateGame(game)
        val imagePath = ImgUtils.saveImage(file, ImgUtils.imageDirectoryGamesName, updated.img)
        updated.img = imagePath
        return updateGame(updated)
    }

    fun updateGame(game: Game): Game {
        getGameById(game.id)
        val optional = gameRepository.findByTitle(game.title)
        if (optional.isPresent && optional.get().id != game.id) {
            throw CustomException("Game title already in use", HttpStatus.BAD_REQUEST, MessageConstants.GAME_TITLE_TAKEN)
        }
        game.updatedAt = Timestamp(System.currentTimeMillis())
        return gameRepository.save(game)
    }

    fun deleteGameById(id: Int) {
        val game = getGameById(id)
        ImgUtils.deleteImage(game.img)
        return gameRepository.deleteById(id)
    }

    fun changeActivation(gameId: Int, activation: Boolean, deleting: Boolean = false): Game {
        val game = getGameById(gameId)
        //* Check places questions for riddles MINMAX 1 on activation
        if (activation) {
            game.places.forEach { place ->
                if (place.questions.filter { it.riddle }.size != 1) {
                    throw CustomException("Every place must have exactly one riddle!", HttpStatus.BAD_REQUEST, MessageConstants.CANNOT_ACTIVATE_RIDDLE)
                }
            }
        }
        //* Delete statuses on deactivation if deleting true
        if (!activation && deleting) {
            game.teamGameStatuses.forEach {
                teamGameStatusRepository.deleteById(it.id)
            }
            game.teamGameStatuses.clear()
        }
        game.active = activation
        return gameRepository.save(game)
    }
}
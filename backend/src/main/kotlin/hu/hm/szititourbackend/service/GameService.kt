package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToBasicDto
import hu.hm.szititourbackend.dto.GameOnlyBasicDto
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.sql.Timestamp
import java.util.*

@Service
@Transactional
class GameService @Autowired constructor(private val gameRepository: GameRepository) {

    fun getAllAvailableGames(): MutableList<GameOnlyBasicDto> {
        val games = gameRepository.findAll()
        val filtered = games.filter { it.dateStart >= Timestamp(System.currentTimeMillis()) }
        return filtered.toMutableList().convertToBasicDto()
    }

    fun addGame(game: Game): Game {
        game.createdAt = Timestamp(System.currentTimeMillis())
        game.updatedAt = Timestamp(System.currentTimeMillis())
        return gameRepository.save(game)
    }

    fun addGameWithImage(newGame: Game, file: MultipartFile): Game {
        val addedGame = addGame(newGame)
        val imagePath = Utils.saveImage(file, Utils.imageDirectoryGamesName)
        addedGame.img = imagePath
        return updateGame(addedGame)
    }

    fun getAllGames(): MutableList<Game> {
        return gameRepository.findAll()
    }

    fun getGameById(id: Int): Optional<Game> {
        return gameRepository.findById(id)
    }

    fun updateGameWithImage(game: Game, file: MultipartFile): Game {
        val optional = gameRepository.findByTitle(game.title)
        if (optional.isPresent && optional.get().id != game.id) {
            throw Exception("Game name already taken")
        }
        val updated = updateGame(game)
        val imagePath = Utils.saveImage(file, Utils.imageDirectoryGamesName, updated.img)
        updated.img = imagePath
        return updateGame(updated)
    }

    fun updateGame(game: Game): Game {
        val exist = gameRepository.existsById(game.id)
        if (!exist) {
            throw Exception("Game not exist")
        }
        game.updatedAt = Timestamp(System.currentTimeMillis())
        return gameRepository.save(game)
    }

    fun deleteGameById(id: Int) {
        val game = gameRepository.findById(id)
        if (game.isPresent) {
            Utils.deleteImage(game.get().img)
        }
        return gameRepository.deleteById(id)
    }
}
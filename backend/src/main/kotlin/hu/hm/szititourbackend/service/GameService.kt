package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.convertToBasicDto
import hu.hm.szititourbackend.dto.GameOnlyBasicDto
import hu.hm.szititourbackend.repository.GameRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp
import java.util.*

@Service
@Transactional
class GameService @Autowired constructor(private val gameRepository: GameRepository){

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

    fun getAllGames() : MutableList<Game>{
        return gameRepository.findAll()
    }

    fun getGameById(id :Int): Optional<Game> {
        return gameRepository.findById(id)
    }

    fun updateGame(game: Game): Game {
        game.updatedAt = Timestamp(System.currentTimeMillis())
        return gameRepository.save(game)
    }

    fun deleteGameById(id: Int) {
        return gameRepository.deleteById(id)
    }
}
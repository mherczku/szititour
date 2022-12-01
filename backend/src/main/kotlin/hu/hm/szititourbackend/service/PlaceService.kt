package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.dto.convertToQuestions
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.PlaceRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class PlaceService @Autowired constructor(
    private val placeRepository: PlaceRepository,
    private val gameRepository: GameRepository
) {
    fun addPlaceToGame(placeDto: PlaceDto): Optional<Place> {
        val gameOptional = gameRepository.findById(placeDto.gameId)
        return if (gameOptional.isPresent) {
            val newPlace = Place(
                game = gameOptional.get(),
                address = placeDto.address,
                img = placeDto.img,
                latitude = placeDto.latitude,
                longitude = placeDto.longitude,
                name = placeDto.name,
                questions = placeDto.questions.convertToQuestions()
            )
            Optional.of(placeRepository.save(newPlace))
        } else {
            Optional.empty()
        }
    }

    fun addPlace(place: Place): Place {
        return placeRepository.save(place)
    }

    fun getAllPlaces(): MutableList<Place> {
        return placeRepository.findAll()
    }

    fun getPlaceById(id: Int): Optional<Place> {
        return placeRepository.findById(id)
    }

    fun updatePlace(placeDto: PlaceDto): Place {
        val place = Place(
            id = placeDto.id,
            name = placeDto.name,
            img = placeDto.img,
            address = placeDto.address,
            latitude = placeDto.latitude,
            longitude = placeDto.longitude,
            questions = placeDto.questions.convertToQuestions(),
            game = Game(
                id = placeDto.gameId
            )
        )
        return placeRepository.save(place)
    }

    fun deletePlaceById(id: Int) {
        return placeRepository.deleteById(id)
    }
}
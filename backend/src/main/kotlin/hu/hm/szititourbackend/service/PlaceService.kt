package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.dto.convertToQuestions
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.PlaceRepository
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

@Service
@Transactional
class PlaceService @Autowired constructor(
    private val placeRepository: PlaceRepository,
    private val gameService: GameService
) {
    fun addPlaceToGameWithImage(placeDto: PlaceDto, file: MultipartFile): Place {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryPlacesName)
            placeDto.img = imagePath
            addPlaceToGame(placeDto)
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            throw e
        }
    }

    fun addPlaceToGame(placeDto: PlaceDto): Place {
        val game = gameService.getGameById(placeDto.gameId)

        val newPlace = Place(
            ordernumber = game.places.size + 1,
            game = game,
            address = placeDto.address,
            img = placeDto.img,
            latitude = placeDto.latitude,
            longitude = placeDto.longitude,
            name = placeDto.name,
            questions = placeDto.questions.convertToQuestions()
        )
        return placeRepository.save(newPlace)

    }

    fun addPlace(place: Place): Place {
        return placeRepository.save(place)
    }

    fun getAllPlaces(): MutableList<Place> {
        return placeRepository.findAll()
    }

    fun getPlaceById(id: Int): Place {
        val place = placeRepository.findById(id)
        if (place.isPresent) {
            return place.get()
        } else {
            throw CustomException("Place not found", HttpStatus.NOT_FOUND)
        }
    }

    fun updatePlaceToGameWithImage(placeDto: PlaceDto, file: MultipartFile): Place {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryPlacesName, placeDto.img)
            placeDto.img = imagePath
            val updated = updatePlace(placeDto, true)
            updated
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            throw e
        }
    }

    fun updatePlace(placeDto: PlaceDto, image: Boolean = false): Place {
        val place = getPlaceById(placeDto.id)
        if(image) {
            place.img = placeDto.img
        }
        place.address = placeDto.address
        place.name = placeDto.name
        place.latitude = placeDto.latitude
        place.longitude = placeDto.longitude
        return placeRepository.save(place)
    }

    fun deletePlaceById(id: Int) {
        val place = getPlaceById(id)
        Utils.deleteImage(place.img)
        return placeRepository.deleteById(id)
    }
}
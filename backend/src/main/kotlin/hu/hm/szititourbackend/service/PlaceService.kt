package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.dto.convertToQuestions
import hu.hm.szititourbackend.repository.GameRepository
import hu.hm.szititourbackend.repository.PlaceRepository
import hu.hm.szititourbackend.util.Utils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.*

@Service
@Transactional
class PlaceService @Autowired constructor(
    private val placeRepository: PlaceRepository,
    private val gameRepository: GameRepository
) {
    fun addPlaceToGameWithImage(placeDto: PlaceDto, file: MultipartFile): Optional<Place> {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryPlacesName)
            placeDto.img = imagePath
            val addedPlaceOptional = addPlaceToGame(placeDto)
            Optional.of(addedPlaceOptional.get())
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            Optional.empty()
        }
    }

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

    fun updatePlaceToGameWithImage(placeDto: PlaceDto, file: MultipartFile): Place {
        var imagePath = ""
        return try {
            imagePath = Utils.saveImage(file, Utils.imageDirectoryPlacesName, placeDto.img)
            placeDto.img = imagePath
            val updated = updatePlace(placeDto)
            updated
        } catch (e: Exception) {
            Utils.deleteImage(imagePath)
            throw e
        }
    }

    fun updatePlace(placeDto: PlaceDto): Place {
        val optional = placeRepository.findById(placeDto.id)
        if (!optional.isPresent) {
            throw Exception("Place not exist")
        }
        val place = optional.get()
        place.img = placeDto.img
        place.address = placeDto.address
        place.name = placeDto.name
        return placeRepository.save(place)
    }

    fun deletePlaceById(id: Int) {
        val place = placeRepository.findById(id)
        if (place.isPresent) {
            Utils.deleteImage(place.get().img)
        }
        return placeRepository.deleteById(id)
    }
}
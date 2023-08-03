package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.service.PlaceService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/places")
class PlaceController @Autowired constructor(private val placeService: PlaceService) {

    @PostMapping()
    fun addPlaceToGame(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("gameId") gameId: String,
        @RequestParam("name") name: String,
        @RequestParam("address") address: String,
        @RequestParam("lat") lat: String,
        @RequestParam("lng") lng: String,
    ): ResponseEntity<PlaceDto> {

        val placeDto = PlaceDto(
            gameId = gameId.toInt(),
            name = name,
            address = address,
            latitude = lat.toDouble(),
            longitude = lng.toDouble()
        )

        val createdPlace: Place = if (file != null) {
            placeService.addPlaceToGameWithImage(placeDto, file)
        } else {
            placeService.addPlaceToGame(placeDto)
        }
        return ResponseEntity(createdPlace.convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getPlaceById(@PathVariable id: Int): ResponseEntity<PlaceDto?> {
        val place: Place = placeService.getPlaceById(id)
        return ResponseEntity(place.convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllPlaces(): ResponseEntity<List<PlaceDto>> {
        val places: MutableList<Place> = placeService.getAllPlaces()
        return ResponseEntity(places.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updatePlace(
        @RequestParam("image") file: MultipartFile?,
        @RequestParam("placeId") placeId: String,
        @RequestParam("lat") lat: String,
        @RequestParam("lng") lng: String,
        @RequestParam("name") name: String,
        @RequestParam("address") address: String,

    ): ResponseEntity<PlaceDto> {

        val placeDto = PlaceDto(
            id = placeId.toInt(),
            name = name,
            address = address,
            latitude = lat.toDouble(),
            longitude = lng.toDouble()
        )

        val updatedPlace: Place = if (file != null) {
            placeService.updatePlaceToGameWithImage(placeDto, file)
        } else {
            placeService.updatePlace(placeDto)
        }
        return ResponseEntity(updatedPlace.convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deletePlaceById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            placeService.deletePlaceById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            throw CustomException("Place not found", HttpStatus.NOT_FOUND)
        }
    }
}
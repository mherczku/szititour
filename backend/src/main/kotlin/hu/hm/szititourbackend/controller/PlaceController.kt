package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.service.PlaceService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/places")
class PlaceController @Autowired constructor(private val placeService: PlaceService) {

    /*@PostMapping()
    fun addPlace(@RequestBody place: Place): ResponseEntity<PlaceDto> {
        val newPlace = placeService.addPlace(place)
        return ResponseEntity(newPlace.convertToDto(), HttpStatus.CREATED)
    }*/

    @PostMapping()
    fun addPlaceToGame(@RequestBody placeDto: PlaceDto): ResponseEntity<PlaceDto> {
        val newPlace = placeService.addPlaceToGame(placeDto)
        if(!newPlace.isPresent) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(newPlace.get().convertToDto(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getPlaceById(@PathVariable id: Int): ResponseEntity<PlaceDto?> {
        val place: Optional<Place> = placeService.getPlaceById(id)
        if (!place.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(place.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllPlaces(): ResponseEntity<List<PlaceDto>> {
        val places: MutableList<Place> = placeService.getAllPlaces()
        return ResponseEntity(places.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updatePlace( @RequestBody place: PlaceDto): ResponseEntity<PlaceDto> {
        return ResponseEntity(placeService.updatePlace(place).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deletePlaceById(@PathVariable id: Int): ResponseEntity<Nothing> {
        return try {
            placeService.deletePlaceById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
package hu.hm.szititourbackend.controller
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.service.PlaceService
import hu.hm.szititourbackend.util.AuthUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/places")
class PlaceController @Autowired constructor(private val placeService: PlaceService) {

    /*@PostMapping()
    fun addPlace(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody place: Place): ResponseEntity<PlaceDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newPlace = placeService.addPlace(place)
        return ResponseEntity(newPlace.convertToDto(), HttpStatus.CREATED)
    }*/

    @PostMapping()
    fun addPlaceToGame(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody placeDto: PlaceDto): ResponseEntity<PlaceDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val newPlace = placeService.addPlaceToGame(placeDto)
        if(!newPlace.isPresent) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        return ResponseEntity(newPlace.get().convertToDto(), HttpStatus.CREATED)
    }



    @GetMapping("/{id}")
    fun getPlaceById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<PlaceDto?> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val place: Optional<Place> = placeService.getPlaceById(id)
        if (!place.isPresent) {
            return ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
        return ResponseEntity(place.get().convertToDto(), HttpStatus.OK)
    }

    @GetMapping
    fun getAllPlaces(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?): ResponseEntity<List<PlaceDto>> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        val places: MutableList<Place> = placeService.getAllPlaces()
        return ResponseEntity(places.convertToDto(), HttpStatus.OK)
    }

    @PutMapping
    fun updatePlace(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @RequestBody place: PlaceDto): ResponseEntity<PlaceDto> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return ResponseEntity(placeService.updatePlace(place).convertToDto(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deletePlaceById(@RequestHeader(AuthUtils.TOKEN_NAME) token: String?, @PathVariable id: Int): ResponseEntity<Nothing> {
        val verification = AuthUtils.verifyToken(token)
        if (!verification.verified || !verification.isAdmin) {
            return ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
        return try {
            placeService.deletePlaceById(id)
            ResponseEntity(null, HttpStatus.OK)
        } catch (e: Exception) {
            ResponseEntity(null, HttpStatus.NOT_FOUND)
        }
    }
}
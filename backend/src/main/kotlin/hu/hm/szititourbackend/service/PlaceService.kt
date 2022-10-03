package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.repository.PlaceRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class PlaceService @Autowired constructor(private val placeRepository: PlaceRepository){

    fun addPlace(place: Place): Place {
        return placeRepository.save(place)
    }

    fun getAllPlaces() : MutableList<Place>{
        return placeRepository.findAll()
    }

    fun getPlaceById(id :Int): Optional<Place> {
        return placeRepository.findById(id)
    }

    fun updatePlace(place: Place): Place {
        return placeRepository.save(place)
    }

    fun deletePlaceById(id: Int) {
        return placeRepository.deleteById(id)
    }
}
package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.PlaceActiveDto
import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.dto.TeamGameStatusDto
import javax.persistence.*

@Entity
class Place(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    var name: String = "",
    var img: String = "",
    var address: String = "",
    val latitude: Double = 0.0,
    val longitude: Double = 0.0,

    @OneToMany(mappedBy = "place", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    val questions: MutableList<Question> = mutableListOf(),
    // last question is the riddle to the next place

    @ManyToOne
    val game: Game = Game()

)


fun Place.convertToDto(): PlaceDto {
    return PlaceDto(
        this.id,
        this.name,
        this.img,
        this.address,
        this.latitude,
        this.longitude,
        this.questions.convertToDto(),
        this.game.id
    )
}

fun MutableList<Place>.convertToDto(): MutableList<PlaceDto> {
    val dtos = mutableListOf<PlaceDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}

fun Place.convertToActiveDto(): PlaceActiveDto {
    return PlaceActiveDto(
        id = this.id,
        selectable = true,
        name = this.name,
        img = this.img,
        questions = this.questions.convertToDtoNoAnswers()
    )
}

fun Place.convertToActiveNotReachedDto(): PlaceActiveDto {
    return PlaceActiveDto(
        id = this.id,
        selectable = false,
        name = this.name,
        img = "",
        questions = mutableListOf()
    )
}

fun MutableList<Place>.convertToActiveDto(status: TeamGameStatusDto): MutableList<PlaceActiveDto> {
    val dtos = mutableListOf<PlaceActiveDto>()
    this.forEach { place ->
        if (status.placeStatuses.find { it.placeId == place.id }?.reached == true) {
            dtos.add(place.convertToActiveDto())
        } else {
            dtos.add(place.convertToActiveNotReachedDto())
        }
    }
    return dtos
}
package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.GameActiveDto
import hu.hm.szititourbackend.dto.GameDto
import hu.hm.szititourbackend.dto.GameOnlyBasicDto
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Game(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    val title: String = "",
    val dateStart: Timestamp = Timestamp(Instant.now().epochSecond),
    val dateEnd: Timestamp = Timestamp(Instant.now().epochSecond),
    val img: String = "",

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),


    @OneToMany(mappedBy = "game", cascade = [CascadeType.ALL])
    @Fetch(FetchMode.JOIN)
    val places: MutableList<Place> = mutableListOf(),

    @OneToMany(mappedBy = "game", cascade = [CascadeType.ALL])
    val applications: MutableList<Application> = mutableListOf(),

    )

fun Game.convertToDto(): GameDto {
    return GameDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.places.convertToDto(),
        this.applications.convertToDto()
    )
}

fun MutableList<Game>.convertToDto(): MutableList<GameDto> {
    val dtos = mutableListOf<GameDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}

fun Game.convertToBasicDto(): GameOnlyBasicDto {
    return GameOnlyBasicDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt
    )
}

fun MutableList<Game>.convertToBasicDto(): MutableList<GameOnlyBasicDto> {
    val dtos = mutableListOf<GameOnlyBasicDto>()
    this.forEach {
        dtos.add(it.convertToBasicDto())
    }
    return dtos
}

fun Game.convertToActiveDto(): GameActiveDto {
    return GameActiveDto(
        this.id,
        this.title,
        this.dateStart,
        this.dateEnd,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.places.convertToActiveDto()
    )
}
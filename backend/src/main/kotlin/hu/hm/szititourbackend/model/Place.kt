package hu.hm.szititourbackend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.dto.PlaceDto
import org.hibernate.annotations.Fetch
import org.hibernate.annotations.FetchMode
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Place(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    val name: String = "",
    val img: String = "",
    val address: String = "",
    val latitude: String = "",
    val longitude: String = "",

    @OneToMany(mappedBy = "place", cascade = [CascadeType.ALL])
    @Fetch(FetchMode.JOIN)
    @JsonIgnore
    val questions: MutableList<Question> = mutableListOf(),
    // 0. question is the riddle to the next place

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
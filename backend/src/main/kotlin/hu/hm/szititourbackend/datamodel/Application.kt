package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.ApplicationDto
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Application(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    var isAccepted: Boolean = false,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    @ManyToOne
    val game: Game = Game(),

    @ManyToOne
    val team: Team = Team()

)

fun Application.convertToDto(): ApplicationDto {
    return ApplicationDto(
        this.id,
        this.isAccepted,
        this.createdAt,
        this.updatedAt,
        this.game.id,
        this.team.id
    )
}

fun MutableList<Application>.convertToDto(): MutableList<ApplicationDto> {
    val dtos = mutableListOf<ApplicationDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
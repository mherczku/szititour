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
    @Column(nullable = true)
    var accepted: Boolean? = null,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    @ManyToOne()
    val game: Game = Game(),

    @ManyToOne()
    val team: Team = Team()

)

fun Application.convertToDto(): ApplicationDto {
    return ApplicationDto(
        id = this.id,
        accepted = this.accepted,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
        gameId = this.game.id,
        teamId = this.team.id,
        teamName = this.team.name
    )
}

fun MutableList<Application>.convertToDto(): MutableList<ApplicationDto> {
    val dtos = mutableListOf<ApplicationDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
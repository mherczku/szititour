package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.dto.TeamDto
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Team(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    var name: String = "",
    @Column(unique = true)
    val email: String = "",
    var password: String = "",
    var admin: Boolean = false,
    var img: String = "",
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
    val answers: MutableList<Answer> = mutableListOf(),

    @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
    val applications: MutableList<Application> = mutableListOf(),

    @ElementCollection
    var members: MutableList<String> = mutableListOf()

)

fun Team.convertToDto(): TeamDto {
    return TeamDto(
        this.id,
        this.name,
        this.email,
        this.password,
        this.admin,
        this.img,
        this.createdAt,
        this.updatedAt,
        this.applications.convertToDto(),
        this.members
    )
}

fun MutableList<Team>.convertToDto(): MutableList<TeamDto> {
    val dtos = mutableListOf<TeamDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.TeamDto
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.ROLE_USER
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Team(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false, updatable = false)
        val id: Int = 0,
        @Column(unique = true)
        var name: String = "",
        @Column(unique = true)
        var email: String = "",
        var nextEmail: String = "",
        var password: String = "",
        var role: String = ROLE_USER,
        var img: String = "",
        var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
        var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),
        var enabled: Boolean = false,
        var isGoogle: Boolean = false,
        var passwordChangeId: String = "",

        var lastLatitude: Double = 0.0,
        var lastLongitude: Double = 0.0,

        @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
        @OrderBy("id")
        val answers: MutableList<Answer> = mutableListOf(),

        @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
        @OrderBy("id")
        val applications: MutableList<Application> = mutableListOf(),

        @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
        @OrderBy("id")
        val teamGameStatuses: MutableList<TeamGameStatus> = mutableListOf(),

        @ElementCollection
        var members: MutableList<String> = mutableListOf(),

        @ElementCollection(fetch = FetchType.EAGER)
        val clients: MutableList<ClientData> = mutableListOf()

)

@Embeddable
class ClientData (
        var tokenId: String = "",
        val platform: String = "",
        val isMobile: Boolean = false,
        val brand: String = "",
        var isGoogle: Boolean = false,
        var ipAddress: String = "",
        var expireAt: Instant = Instant.now()
)

fun Team.convertToDto(): TeamDto {
    return TeamDto(
            id = this.id,
            name = this.name,
            email = this.email,
            nextEmail = this.nextEmail,
            img = this.img,
            role = this.role,
            createdAt = this.createdAt,
            updatedAt = this.updatedAt,
            applications = this.applications.convertToDto(),
            members = this.members,
            clients = this.clients.filter { it.expireAt?.isAfter(Instant.now()) == true }.toMutableList()
    )
}

fun MutableList<Team>.convertToDto(): MutableList<TeamDto> {
    val dtos = mutableListOf<TeamDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
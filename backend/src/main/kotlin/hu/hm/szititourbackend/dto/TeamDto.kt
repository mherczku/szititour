package hu.hm.szititourbackend.dto
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_USER
import java.sql.Timestamp
import java.time.Instant

class TeamDto (
    val id: Int = 0,
    var name: String = "",
    val email: String = "",
    val nextEmail: String = "",
    var img: String = "",
    val role: String = ROLE_USER,
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    val applications: MutableList<ApplicationDto> = mutableListOf(),
    var members: MutableList<String> = mutableListOf()
)
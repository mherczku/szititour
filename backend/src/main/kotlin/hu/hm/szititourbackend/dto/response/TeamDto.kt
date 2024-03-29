package hu.hm.szititourbackend.dto.response

import hu.hm.szititourbackend.datamodel.ClientData
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.ROLE_USER
import java.sql.Timestamp
import java.time.Instant

class TeamDto(
        val id: Int = 0,
        var name: String = "",
        val email: String = "",
        val nextEmail: String = "",
        var img: String = "",
        val role: String = ROLE_USER,
        var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
        var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

        val applications: MutableList<ApplicationDto> = mutableListOf(),
        var members: MutableList<String> = mutableListOf(),
        val clients: MutableList<ClientData> = mutableListOf()
)
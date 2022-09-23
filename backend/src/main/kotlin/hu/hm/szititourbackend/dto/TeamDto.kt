package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.datamodel.Application
import java.sql.Timestamp
import java.time.Instant

class TeamDto (
    val id: Int = 0,
    var name: String = "",
    val email: String = "",
    var password: String = "",
    var admin: Boolean = false,
    var img: String = "",

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    val applications: MutableList<ApplicationDto> = mutableListOf(),
    var members: MutableList<String> = mutableListOf()
)
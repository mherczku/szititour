package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.enum.UserApplicationStatus
import java.sql.Timestamp
import java.time.Instant


class GameOnlyBasicDto(

    val id: Int = 0,
    val title: String = "",
    val dateStart: Timestamp = Timestamp(Instant.now().epochSecond),
    val dateEnd: Timestamp = Timestamp(Instant.now().epochSecond),
    val img: String = "",

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    var userApplied: UserApplicationStatus = UserApplicationStatus.none

    )
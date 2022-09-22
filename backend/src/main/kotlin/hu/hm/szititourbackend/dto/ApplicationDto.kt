package hu.hm.szititourbackend.dto

import java.sql.Timestamp
import java.time.Instant


class ApplicationDto(
    val id: Int = 0,
    val isAccepted: Boolean = false,
    val createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    val updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),
    val gameId: Int,
    val teamId: Int
)
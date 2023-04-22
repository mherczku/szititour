package hu.hm.szititourbackend.dto

import java.sql.Timestamp
import java.time.Instant


class GameActiveDto(

    val id: Int = 0,
    val title: String = "",
    val dateStart: Timestamp = Timestamp(Instant.now().epochSecond),
    val dateEnd: Timestamp = Timestamp(Instant.now().epochSecond),
    val img: String = "",

    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),
    val places: MutableList<PlaceActiveDto> = mutableListOf(),
    val teamGameStatusDto: TeamGameStatusDto = TeamGameStatusDto()

    )
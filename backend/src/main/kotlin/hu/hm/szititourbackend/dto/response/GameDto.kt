package hu.hm.szititourbackend.dto.response

import java.sql.Timestamp
import java.time.Instant


class GameDto(

        val id: Int = 0,
        val title: String = "",
        val dateStart: Timestamp = Timestamp(Instant.now().epochSecond),
        val dateEnd: Timestamp = Timestamp(Instant.now().epochSecond),
        val img: String = "",
        val active: Boolean = false,

        var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
        var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),



        val places: MutableList<PlaceDto> = mutableListOf(),
        val applications: MutableList<ApplicationDto> = mutableListOf(),

        )
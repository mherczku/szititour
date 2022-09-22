package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.enum.QuestionType
import hu.hm.szititourbackend.model.Answer
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

class QuestionDto(

    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.short,
    val isRiddle: Boolean = false,
    val img: String = "",

    val answers: MutableList<AnswerDto> = mutableListOf(),
    val placeId: Int = 0

)
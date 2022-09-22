package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.enum.QuestionType
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

class QuestionDtoNoAnswers(

    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.shortText,
    val isRiddle: Boolean = false,
    val img: String = "",

    val placeId: Int = 0

)
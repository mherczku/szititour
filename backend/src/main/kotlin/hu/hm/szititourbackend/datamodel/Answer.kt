package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.AnswerDto
import javax.persistence.*

@Entity
class Answer(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    val answerText: String = "",
    val answerBoolean: Boolean = false,
    val answerNumber : Int = 0,
    val img: String = "",
    val correct: Boolean? = null,

    @ManyToOne
    val team: Team = Team(),

    @ManyToOne
    val question: Question = Question(),

    )

fun Answer.convertToDto(): AnswerDto {
    return AnswerDto(
        this.id,
        this.answerText,
        this.answerBoolean,
        this.answerNumber,
        this.img,
        this.correct,
        this.team.id,
        this.question.convertToDtoNoAnswers()
    )
}

fun MutableList<Answer>.convertToDto(): MutableList<AnswerDto> {
    val dtos = mutableListOf<AnswerDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
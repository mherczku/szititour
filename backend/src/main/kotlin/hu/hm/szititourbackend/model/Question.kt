package hu.hm.szititourbackend.model

import hu.hm.szititourbackend.dto.PlaceDto
import hu.hm.szititourbackend.dto.QuestionDto
import hu.hm.szititourbackend.dto.QuestionDtoNoAnswers
import hu.hm.szititourbackend.enum.QuestionType
import javax.persistence.*

@Entity
class Question(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.short,
    val isRiddle: Boolean = false,
    val img: String = "",

    @OneToMany(mappedBy = "question", cascade = [CascadeType.ALL])
    val answers: MutableList<Answer> = mutableListOf(),

    @ManyToOne
    val place: Place = Place()

)

fun Question.convertToDtoNoAnswers(): QuestionDtoNoAnswers {
    return QuestionDtoNoAnswers(
        this.id,
        this.name,
        this.type,
        this.isRiddle,
        this.img,
        this.place.id
    )
}

fun Question.convertToDto(): QuestionDto {
    return QuestionDto(
        this.id,
        this.name,
        this.type,
        this.isRiddle,
        this.img,
        this.answers.convertToDto(),
        this.place.id
    )
}

fun MutableList<Question>.convertToDto(): MutableList<QuestionDto> {
    val dtos = mutableListOf<QuestionDto>()
    this.forEach {
        dtos.add(it.convertToDto())
    }
    return dtos
}
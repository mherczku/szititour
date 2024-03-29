package hu.hm.szititourbackend.datamodel

import hu.hm.szititourbackend.dto.response.QuestionDto
import hu.hm.szititourbackend.dto.response.QuestionDtoNoAnswers
import hu.hm.szititourbackend.enum.QuestionType
import javax.persistence.*

@Entity
class Question(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    var name: String = "",
    var type: QuestionType = QuestionType.shortText,
    var riddle: Boolean = false,
    var img: String = "",

    @OneToMany(mappedBy = "question", cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    @OrderBy("id")
    val answers: MutableList<Answer> = mutableListOf(),

    @ManyToOne
    val place: Place = Place()

)

fun Question.convertToDtoNoAnswers(): QuestionDtoNoAnswers {
    return QuestionDtoNoAnswers(
        this.id,
        this.name,
        this.type,
        this.riddle,
        this.img,
        this.place.id
    )
}

fun Question.convertToDto(): QuestionDto {
    return QuestionDto(
        this.id,
        this.name,
        this.type,
        this.riddle,
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

fun MutableList<Question>.convertToDtoNoAnswers(): MutableList<QuestionDtoNoAnswers> {
    val dtos = mutableListOf<QuestionDtoNoAnswers>()
    this.forEach {
        dtos.add(it.convertToDtoNoAnswers())
    }
    return dtos
}
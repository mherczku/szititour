package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.datamodel.Place
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.enum.QuestionType

class QuestionDto(

    val id: Int = 0,
    val name: String = "",
    val type: QuestionType = QuestionType.shortText,
    val riddle: Boolean = false,
    var img: String = "",

    val answers: MutableList<AnswerDto> = mutableListOf(),
    val placeId: Int = 0

) {
    fun convertToQuestion(): Question {
        return Question(
            id = this.id,
            name = this.name,
            type = this.type,
            riddle = this.riddle,
            img = this.img,
            answers = this.answers.convertToAnswers(),
            place = Place(id = this.placeId)
        )
    }
}

fun MutableList<QuestionDto>.convertToQuestions(): MutableList<Question> {
    val questions = mutableListOf<Question>()
    this.forEach {
        questions.add(it.convertToQuestion())
    }
    return questions
}
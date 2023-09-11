package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.Team

class AnswerDto(

    val id: Int = 0,
    val answerText: String = "",
    val answerBoolean: Boolean = false,
    val answerNumber: Int = 0,
    val img: String = "",
    val correct: Boolean? = null,

    val teamId: Int = 0,
    val questionDtoNoAnswers: QuestionDtoNoAnswers

) {
    fun convertToAnswer(): Answer {
        return Answer(
            id = this.id,
            answerText = this.answerText,
            answerBoolean = this.answerBoolean,
            answerNumber = this.answerNumber,
            img = this.img,
            correct = this.correct,
            question = Question(
                id = this.questionDtoNoAnswers.id
            ),
            team = Team(
                id = this.teamId
            )
        )
    }
}

fun MutableList<AnswerDto>.convertToAnswers(): MutableList<Answer> {
    val answers = mutableListOf<Answer>()
    this.forEach {
        answers.add(it.convertToAnswer())
    }
    return answers
}

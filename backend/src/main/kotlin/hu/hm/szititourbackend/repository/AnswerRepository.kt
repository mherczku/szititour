package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Question
import hu.hm.szititourbackend.datamodel.Team
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AnswerRepository: JpaRepository<Answer, Int> {
    fun findByTeamAndQuestion(team: Team, question: Question): Optional<Answer>
}
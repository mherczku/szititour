package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Answer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AnswerRepository: JpaRepository<Answer, Int>
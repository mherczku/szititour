package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Question
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface QuestionRepository: JpaRepository<Question, Int>
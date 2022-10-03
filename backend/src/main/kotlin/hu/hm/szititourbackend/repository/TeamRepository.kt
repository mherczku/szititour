package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Team
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TeamRepository: JpaRepository<Team, Int> {

    fun findByEmail(email: String): Optional<Team>
}
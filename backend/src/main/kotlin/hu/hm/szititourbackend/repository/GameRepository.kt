package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Game
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface GameRepository : JpaRepository<Game, Int> {
    fun findByTitle(title: String): Optional<Game>
}
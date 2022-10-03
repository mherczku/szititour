package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Game
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GameRepository: JpaRepository<Game, Int>
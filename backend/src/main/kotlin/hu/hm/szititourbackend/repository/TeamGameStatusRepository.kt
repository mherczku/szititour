package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.TeamGameStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TeamGameStatusRepository: JpaRepository<TeamGameStatus, Int>
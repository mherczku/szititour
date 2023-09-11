package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.NotiSubscriber
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NotiSubscriberRepository: JpaRepository<NotiSubscriber, Int> {

    fun findAllByTeamId(teamId: Int): List<NotiSubscriber>
    fun findByToken(token: String): Optional<NotiSubscriber>
}
package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Application
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface ApplicationRepository: JpaRepository<Application, Int> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Application a WHERE a.id = :id")
    fun deleteByIdCustom(id: Int)
}
package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Application
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ApplicationRepository: JpaRepository<Application, Int>
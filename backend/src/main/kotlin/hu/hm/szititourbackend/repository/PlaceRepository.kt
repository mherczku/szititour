package hu.hm.szititourbackend.repository

import hu.hm.szititourbackend.datamodel.Place
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PlaceRepository: JpaRepository<Place, Int>
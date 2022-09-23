package hu.hm.szititourbackend.dto

import hu.hm.szititourbackend.datamodel.Answer
import hu.hm.szititourbackend.datamodel.Application
import java.sql.Timestamp
import java.time.Instant
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.OneToMany

class TeamUpdateProfileDto(

    val name: String?,
    val password: String?,
    val img: String?,
    val members: List<String>?

)

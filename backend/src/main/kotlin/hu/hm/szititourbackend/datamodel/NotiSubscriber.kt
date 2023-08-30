package hu.hm.szititourbackend.datamodel

import javax.persistence.*

@Entity
class NotiSubscriber(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    @Column(nullable = false, updatable = false)
    val teamId: Int = 0,
    @Column(nullable = false, updatable = false, unique = true)
    val token: String = "",
    @ElementCollection
    val topics: MutableList<String> = mutableListOf()
)
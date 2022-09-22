package hu.hm.szititourbackend.model

import java.sql.Timestamp
import java.time.Instant
import javax.persistence.*

@Entity
class Team(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    val id: Int = 0,
    val name: String = "",
    @Column(unique = true)
    val email: String = "",
    val password: String = "",
    var admin: Boolean = false,
    val img: String = "",
    var createdAt: Timestamp = Timestamp(Instant.now().epochSecond),
    var updatedAt: Timestamp = Timestamp(Instant.now().epochSecond),

    @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
    val answers: MutableList<Answer> = mutableListOf(),

    @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL])
    val applications: MutableList<Application> = mutableListOf(),

    @ElementCollection
    val members: MutableList<String> = mutableListOf()

)
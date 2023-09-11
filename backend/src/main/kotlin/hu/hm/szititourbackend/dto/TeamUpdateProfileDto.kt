package hu.hm.szititourbackend.dto

class TeamUpdateProfileDto(

    val name: String? = null,
    val email: String? = null,
    val passwordBefore: String? = null,
    val password: String? = null,
    val img: String? = null,
    val members: List<String>? = null

)

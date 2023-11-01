package hu.hm.szititourbackend.dto.response


class LoginResponse(
    val success: Boolean = true,
    val message: String = "",
    val messageCode: String = "",
    val team: TeamDto?
)
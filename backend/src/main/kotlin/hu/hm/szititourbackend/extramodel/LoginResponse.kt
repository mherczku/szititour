package hu.hm.szititourbackend.extramodel

import hu.hm.szititourbackend.dto.TeamDto


class LoginResponse(
    val success: Boolean = true,
    val message: String = "",
    val messageCode: String = "",
    val team: TeamDto?
)
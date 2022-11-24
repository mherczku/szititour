package hu.hm.szititourbackend.extramodel

import hu.hm.szititourbackend.dto.TeamDto


class LoginResponse(
    val success: Boolean = true,
    val errorMessage: String = "",
    val successMessage: String = "",
    val teamDto: TeamDto?
)
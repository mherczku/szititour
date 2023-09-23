package hu.hm.szititourbackend.extramodel

import hu.hm.szititourbackend.datamodel.Team


class Response(
    val success: Boolean = true,
    val errorMessage: String = "",
    val successMessage: String = ""
)

class ContinueGoogleResponse(
        val team: Team,
        val isCreation: Boolean
)
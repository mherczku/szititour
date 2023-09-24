package hu.hm.szititourbackend.extramodel

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.util.MessageConstants


data class Response(
        val success: Boolean = true,
        val message: String = "",
        val messageCode: String= MessageConstants.UNKNOWN,
)

class ContinueGoogleResponse(
        val team: Team,
        val isCreation: Boolean
)
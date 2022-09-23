package hu.hm.szititourbackend.extramodel


class VerificationResponse(
    val verified: Boolean = false,
    val isAdmin: Boolean = false,
    val errorMessage: String = "",
    val teamId: Int = -1
)
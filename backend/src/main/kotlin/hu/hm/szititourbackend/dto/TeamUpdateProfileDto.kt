package hu.hm.szititourbackend.dto

class TeamUpdateProfileDto(
        val name: String? = null,
        val members: List<String>? = null
)

data class TeamPasswordUpdateDto(
        val newPassword: String = ""
)

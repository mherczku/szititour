package hu.hm.szititourbackend.extramodel

data class GoogleAccount(
        val userId: String,
        val email: String,
        val emailVerified: Boolean,
        val name: String?,
        val pictureUrl: String?,
        val locale: String?,
        val familyName: String?,
        val givenName: String?,
)

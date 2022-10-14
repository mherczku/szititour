package hu.hm.szititourbackend.util

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.DecodedJWT
import hu.hm.szititourbackend.extramodel.VerificationResponse
import java.util.*


object AuthUtils {

    private const val SECRET_KEY = "szititourbackend01"
    private const val JWT_TOKEN_VALIDITY = 1 * 60 * 60 * 1000 // 1 hour
    private val JWTVerifier = JWT.require(Algorithm.HMAC256(SECRET_KEY)).build()
    private const val IS_ADMIN = "isAdmin"
    const val TOKEN_NAME = "Authorization"

    fun createToken(id: Int, isAdmin: Boolean = false): String {
        val audience = id.toString()

        return JWT.create()
            .withAudience(audience)
            .withClaim(IS_ADMIN, isAdmin)
            .withExpiresAt(Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
            .sign(Algorithm.HMAC256(SECRET_KEY))
    }

    fun verifyToken(bearerToken: String?): VerificationResponse {
        if(bearerToken.isNullOrEmpty()) {
            return VerificationResponse(verified = false, errorMessage = "Empty Token")
        }
        val token = bearerToken.substring(7)
        return try {
            val jwt: DecodedJWT = JWTVerifier.verify(token)
            if(jwt.getClaim(IS_ADMIN).isMissing) {
                return VerificationResponse(verified = false, errorMessage = "IS_ADMIN claim missing")
            }
            val isAdmin: Boolean = jwt.getClaim(IS_ADMIN).asBoolean()
            val teamId: Int = jwt.audience[0].toInt()
            VerificationResponse(verified = true, isAdmin = isAdmin, teamId = teamId)
        } catch (e: Exception) {
            //Invalid signature/claims
            VerificationResponse(verified = false, errorMessage = e.localizedMessage)
        }
    }

}
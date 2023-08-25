package hu.hm.szititourbackend.security

import com.google.api.client.auth.openidconnect.IdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.gson.GsonFactory
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.GoogleAccount
import hu.hm.szititourbackend.extramodel.VerificationResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.security.oauth2.jwt.*
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*


@Service
class SecurityService @Autowired constructor(private val jwtEncoder: JwtEncoder, private val jwtDecoder: JwtDecoder) {

    companion object {
        const val CLAIM_ROLE = "role"
        const val CLAIM_USERNAME = "username"
        const val CLAIM_TYPE = "claim_type"
        const val CLAIM_TYPE_VERIFICATION = "claim_type_verification"
        const val CLAIM_TYPE_TOKEN = "claim_type_token"
        const val ROLE_ADMIN = "ROLE_ADMIN"
        const val ROLE_USER = "ROLE_USER"
        const val ISSUER = "szititour_v1"
        const val JWT_TOKEN_VALIDITY = 1 * 60 * 60 * 1000 // 1 hour
        const val JWT_TOKEN_VALIDITY_DAY = 24 * 60 * 60 * 1000 // 1 hour
        const val TOKEN_NAME = "Authorization"
        const val GOOGLE_TOKEN_HEADER = "googleToken"
    }

    @Value("\${google.clientId}")
    var CLIENT_ID: String? = null

    fun generateToken(team: Team): String {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JWT_TOKEN_VALIDITY.toLong()))
                .subject(team.id.toString())
                .claim(CLAIM_TYPE, CLAIM_TYPE_TOKEN)
                .claim(CLAIM_USERNAME, team.email)
                .claim(CLAIM_ROLE, team.role)
                .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
    }

    fun generateEmailVerificationToken(team: Team): String {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JWT_TOKEN_VALIDITY_DAY.toLong()))
                .subject(team.id.toString())
                .claim(CLAIM_TYPE, CLAIM_TYPE_VERIFICATION)
                .claim(CLAIM_USERNAME, team.email)
                .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
    }

    fun verifyEmailVerificationToken(token: String): VerificationResponse {
        if (token.isNullOrEmpty()) {
            return VerificationResponse(verified = false, errorMessage = "Empty Token")
        }

        return try {
            val jwt: Jwt = jwtDecoder.decode(token)
            val now = Instant.now()
            if(jwt.expiresAt == null || jwt.expiresAt?.isBefore(now) == true) {
                throw CustomException("TOKEN EXPIRED", HttpStatus.FORBIDDEN)
            }
            val type: String = jwt.getClaim(CLAIM_TYPE)
            if (type != CLAIM_TYPE_VERIFICATION) {
                throw Exception("Bad token type")
            }
            val teamId: Int = jwt.subject.toInt()

            VerificationResponse(verified = true, isAdmin = false, teamId = teamId)
        } catch (e: Exception) {
            VerificationResponse(verified = false, errorMessage = e.localizedMessage)        }
    }

    fun verifyToken(bearerToken: String): VerificationResponse {
        if (bearerToken.isNullOrEmpty()) {
            return VerificationResponse(verified = false, errorMessage = "Empty Token")
        }
        val token = bearerToken.replace("Bearer ", "")
        return try {
            val jwt: Jwt = jwtDecoder.decode(token)
            val now = Instant.now()
            if(jwt.expiresAt == null || jwt.expiresAt?.isBefore(now) == true) {
                throw CustomException("TOKEN EXPIRED", HttpStatus.FORBIDDEN)
            }
            val type: String = jwt.getClaim(CLAIM_TYPE)
            if (type != CLAIM_TYPE_TOKEN) {
                throw Exception("Bad token type")
            }
            val role: String = jwt.getClaim(CLAIM_ROLE)
            val isAdmin = role == ROLE_ADMIN
            val teamId: Int = jwt.subject.toInt()

            VerificationResponse(verified = true, isAdmin = isAdmin, teamId = teamId)
        } catch (e: Exception) {
            //Invalid signature/claims
            VerificationResponse(verified = false, errorMessage = e.localizedMessage)
        }
    }

    fun verifyGoogleToken(idTokenString: String): GoogleAccount {

        val verifier: GoogleIdTokenVerifier = GoogleIdTokenVerifier.Builder(NetHttpTransport(), GsonFactory()) // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(CLIENT_ID)) // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build()

        // (Receive idTokenString by HTTPS POST)
        try {
            val idToken: GoogleIdToken? = verifier.verify(idTokenString)
            if(idToken !== null) {
                val payload: IdToken.Payload = idToken.payload
                println(payload)

                // Print user identifier
                val userId: String = payload.subject
                println("User ID: $userId")

                return GoogleAccount(
                        userId = userId,
                        email = payload["email"] as String,
                        emailVerified = payload["email_verified"] as Boolean,
                        name = payload["name"] as String,
                        pictureUrl = payload["picture"] as String,
                        locale = payload["locale"] as String,
                        familyName = payload["family_name"] as String,
                        givenName = payload["given_name"] as String,
                )
            }
        } catch (e: Exception) {
            throw CustomException("Google Token Invalid", HttpStatus.BAD_REQUEST)
        }
        throw CustomException("Google Validation Failed", HttpStatus.BAD_REQUEST)

    }

}


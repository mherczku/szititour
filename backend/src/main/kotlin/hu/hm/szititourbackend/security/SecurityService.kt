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
        const val CLAIM_TOKEN_ID = "claim_token_id"
        const val CLAIM_TYPE_VERIFICATION_TOKEN = "claim_type_verification_token"
        const val CLAIM_TYPE_AUTH_TOKEN = "claim_type_auth_token"
        const val CLAIM_TYPE_RES_TOKEN = "claim_type_res_token"
        const val CLAIM_RES_ID = "claim_res_id"
        const val ROLE_ADMIN = "ROLE_ADMIN"
        const val ROLE_USER = "ROLE_USER"
        const val ISSUER = "szititour_v1"
        const val JWT_TOKEN_VALIDITY_1MIN = 1 * 1 * 60          // 1 min
        const val JWT_TOKEN_VALIDITY_1HOUR = 1 * 60 * 60    // 1 hour
        const val JWT_TOKEN_VALIDITY_1DAY = 24 * 60 * 60     // 1 hour
        const val TOKEN_NAME = "Authorization"
        const val TOKEN_RESOURCE_NAME = "resToken"
        const val GOOGLE_TOKEN_HEADER = "googleToken"
    }

    @Value("\${google.clientId}")
    var CLIENT_ID: String? = null

    
    // AUTH TOKEN
    fun generateToken(team: Team, tokenId: String, expiresAt: Instant): String {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(expiresAt)
                .subject(team.id.toString())
                .claim(CLAIM_TYPE, CLAIM_TYPE_AUTH_TOKEN)
                .claim(CLAIM_USERNAME, team.email)
                .claim(CLAIM_ROLE, team.role)
                .claim(CLAIM_TOKEN_ID, tokenId)
                .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
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
            if (type != CLAIM_TYPE_AUTH_TOKEN) {
                throw Exception("Bad token type")
            }
            val role: String = jwt.getClaim(CLAIM_ROLE)
            val tokenId: String = jwt.getClaim(CLAIM_TOKEN_ID)
            if(tokenId.isBlank()) {
                throw CustomException("TokenId cannot be empty", HttpStatus.FORBIDDEN)
            }
            val isAdmin = role == ROLE_ADMIN
            val teamId: Int = jwt.subject.toInt()

            VerificationResponse(verified = true, isAdmin = isAdmin, teamId = teamId, tokenId = tokenId)
        } catch (e: Exception) {
            //Invalid signature/claims
            VerificationResponse(verified = false, errorMessage = e.localizedMessage)
        }
    }
    
    
    // EMAIL VERIFY TOKEN
    fun generateEmailVerificationToken(team: Team): String {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JWT_TOKEN_VALIDITY_1DAY.toLong()))
                .subject(team.id.toString())
                .claim(CLAIM_TYPE, CLAIM_TYPE_VERIFICATION_TOKEN)
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
            if (type != CLAIM_TYPE_VERIFICATION_TOKEN) {
                throw Exception("Bad token type")
            }
            val teamId: Int = jwt.subject.toInt()

            VerificationResponse(verified = true, isAdmin = false, teamId = teamId)
        } catch (e: Exception) {
            VerificationResponse(verified = false, errorMessage = e.localizedMessage)        }
    }
    
    
    // GOOGLE TOKEN:

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

                // Print user identifier
                val userId: String = payload.subject

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

    // RESOURCE TOKEN:
    fun generateResourceToken(teamId: String, resourceId: String): String {
        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(JWT_TOKEN_VALIDITY_1MIN.toLong()))
                .subject(teamId)
                .claim(CLAIM_TYPE, CLAIM_TYPE_RES_TOKEN)
                //.claim(CLAIM_USERNAME, team.email)
                //.claim(CLAIM_ROLE, team.role)
                .claim(CLAIM_RES_ID, resourceId)
                .build()
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
    }

    fun verifyResourceToken(resToken: String, requestedResourceId: String): VerificationResponse {
        if (resToken.isNullOrEmpty()) {
            return VerificationResponse(verified = false, errorMessage = "Empty Token")
        }
        return try {
            val jwt: Jwt = jwtDecoder.decode(resToken)
            val now = Instant.now()
            if(jwt.expiresAt == null || jwt.expiresAt?.isBefore(now) == true) {
                throw CustomException("TOKEN EXPIRED", HttpStatus.FORBIDDEN)
            }
            val type: String = jwt.getClaim(CLAIM_TYPE)
            if (type != CLAIM_TYPE_RES_TOKEN) {
                throw CustomException("Bad token type", HttpStatus.FORBIDDEN)
            }
            //val role: String = jwt.getClaim(CLAIM_ROLE)
            //val isAdmin = role == ROLE_ADMIN
            val teamId: Int = jwt.subject.toInt()
            val resourceId: String = jwt.getClaim(CLAIM_RES_ID)
            if(resourceId != requestedResourceId) {
                throw CustomException("Bad token resourceId", HttpStatus.FORBIDDEN)
            }

            VerificationResponse(verified = true, isAdmin = false, teamId = teamId)
        } catch (e: Exception) {
            if(e is CustomException) {
                throw e
            } else {
                throw e
            }
            //VerificationResponse(verified = false, errorMessage = e.localizedMessage)
        }
    }

    fun genImgUrl(imagePath: String, teamId: String): String  {
        val token = generateResourceToken(teamId, imagePath)
        return "images?img=$imagePath&&resToken=$token"
    }

}


package hu.hm.szititourbackend.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.ObjectWriter
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.MessageConstants
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.filter.OncePerRequestFilter
import java.nio.charset.StandardCharsets
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class TokenIdFilter : OncePerRequestFilter() {

    private val myLogger: Logger = LoggerFactory.getLogger(TokenIdFilter::class.java)

    @Autowired
    lateinit var teamService: TeamService

    @Autowired
    lateinit var securityService: SecurityService

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {

        val token = request.getHeader(HEADER_TOKEN)
        myLogger.debug("Inside TokenIdFilter")

        if (token != null && token.contains("Bearer ")) {
            val verification = securityService.verifyToken(token)
            var code = verification.messageCode
            if (verification.verified) {
                val team = teamService.getTeamById(verification.teamId)
                if (team.clients.any { it.tokenId == verification.tokenId }) {
                    // Continue the filter chain
                    filterChain.doFilter(request, response)
                    return
                } else {
                    code = MessageConstants.AUTH_TOKENID_NOT_FOUND
                }
            }
            myLogger.info("TokenIdFilter stopped chain")
            val r = Response(message = "Authentication failed", success = false, messageCode = code)
            val ow: ObjectWriter = ObjectMapper().writer().withDefaultPrettyPrinter()
            val json: String = ow.writeValueAsString(r)
            val byteArray = json.toByteArray(StandardCharsets.UTF_8)
            response.resetBuffer()
            response.status = HttpStatus.UNAUTHORIZED.value()
            response.setContentLength(json.length)
            response.contentType = "application/json"
            response.characterEncoding = StandardCharsets.UTF_8.name()
            response.outputStream.write(byteArray)
            response.outputStream.flush()
            return
        }

        // Continue the filter chain if no token - not authenticated request
        filterChain.doFilter(request, response)
    }
}
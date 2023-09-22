package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.service.TeamService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.*
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

        if(token != null && token.contains("Bearer ")) {
            val verification = securityService.verifyToken(token)
            if(verification.verified) {
                val team = teamService.getTeamById(verification.teamId)
                if(team.clients.any { it.tokenId == verification.tokenId }) {
                    // Continue the filter chain
                    filterChain.doFilter(request, response)
                    return
                }
            }
            myLogger.info("TokenIdFilter stopped chain")
            throw CustomException("TokenId not found in clients", HttpStatus.FORBIDDEN)
        }

        // Continue the filter chain if no token - not authenticated request
        filterChain.doFilter(request, response)


    }

}
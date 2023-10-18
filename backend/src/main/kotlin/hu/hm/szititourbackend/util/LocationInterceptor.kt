package hu.hm.szititourbackend.util

import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_TOKEN
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.LocationUtils.GAMEID
import hu.hm.szititourbackend.util.LocationUtils.LATITUDE
import hu.hm.szititourbackend.util.LocationUtils.LONGITUDE
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Configuration
class WebMvcConfig(private val teamService: TeamService, private val securityTokenService: SecurityTokenService) :
    WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LocationInterceptor(teamService, securityTokenService))
        super.addInterceptors(registry)
    }
}

class LocationInterceptor(private val teamService: TeamService, private val securityTokenService: SecurityTokenService) :
    HandlerInterceptor {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    override fun postHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        modelAndView: ModelAndView?
    ) {
        super.postHandle(request, response, handler, modelAndView)

        val token = request.getHeader(HEADER_TOKEN)
        val lat = request.getHeader(LATITUDE)
        val lon = request.getHeader(LONGITUDE)
        val gameId = request.getHeader(GAMEID)

        if (token !== null && lat !== null && lon !== null && gameId !== null) {
            logger.debug("Location intercepted: --> Lat: $lat - Long: $lon - Game: $gameId - Time: ${System.currentTimeMillis()}")
            val verification = securityTokenService.verifyToken(token)
            if (verification.verified) {
                try {
                    val team = teamService.getTeamById(verification.teamId)
                    team.lastLatitude = lat.toDouble()
                    team.lastLongitude = lon.toDouble()
                    teamService.updateTeam(team, true)
                    teamService.updateGameStatusAuto(gameId.toInt(), team)
                } catch (e: CustomException) {
                    logger.error("Exception occurred while processing location: ${e.messageCode} : ${e.message}")
                }

            }
        }
    }
}
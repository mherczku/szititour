package hu.hm.szititourbackend.util

import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.TOKEN_NAME
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.LocationUtils.GAMEID
import hu.hm.szititourbackend.util.LocationUtils.LATITUDE
import hu.hm.szititourbackend.util.LocationUtils.LONGITUDE
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Configuration
class WebMvcConfig(private val teamService: TeamService, private val securityService: SecurityService): WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LocationInterceptor(teamService, securityService))
        super.addInterceptors(registry)
    }
}

class LocationInterceptor(private val teamService: TeamService, private val securityService: SecurityService): HandlerInterceptor {
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {

        val token = request.getHeader(TOKEN_NAME)
        val lat = request.getHeader(LATITUDE)
        val lon = request.getHeader(LONGITUDE)
        val gameId = request.getHeader(GAMEID)

        if(token !== null && lat !== null && lon !== null && gameId !== null) {
            println("LOCATION INTERCEPT --> $lat - $lon - $gameId")
            val verification = securityService.verifyToken(token)
            if(verification.verified) {
                val team = teamService.getTeamById(verification.teamId)
                if(team.isPresent){
                    val theTeam = team.get()
                    theTeam.lastLatitude = lat.toDouble()
                    theTeam.lastLongitude = lon.toDouble()
                    teamService.updateTeam(theTeam)
                    teamService.updateGameStatus(gameId.toInt(), theTeam)
                }
            }
        }
        return super.preHandle(request, response, handler)
    }
}
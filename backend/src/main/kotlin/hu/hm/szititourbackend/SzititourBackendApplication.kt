package hu.hm.szititourbackend

import hu.hm.szititourbackend.security.RsaKeyProperties
import hu.hm.szititourbackend.util.SzititourProperties
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication


@EnableConfigurationProperties(RsaKeyProperties::class, SzititourProperties::class)
@SpringBootApplication
class SzititourBackendApplication {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    /*@Bean
    fun commandLineRunner(teamService: TeamService, gameService: GameService, placeService: PlaceService): CommandLineRunner {
        return CommandLineRunner { _ ->
            val testPass = PasswordUtils.encryptPassword("T12345678910")
            val tester =  Team(email= "ta@test.hu", password = testPass, name = "Test Admin")
            val tester2 =  Team(email= "t@test.hu", password = testPass, name = "Test User")
            val savedAdmin = teamService.addTeam(tester, true, isTester = true)
            val savedUser = teamService.addTeam(tester2, false, isTester = true)
            logger.debug("tester admin created ${savedAdmin.id}")
            logger.debug("tester user created ${savedUser.id}")
            gameService.addGame(Game(1, title = "Teszt játék", dateStart = Timestamp.from(Instant.now()), dateEnd = Timestamp.from(Instant.now().plusSeconds(100000))))
            //placeService.addPlaceToGame(PlaceDto(name = "Teszt helyszín 1"))
        }
    }*/
}

fun main(args: Array<String>) {
    runApplication<SzititourBackendApplication>(*args)
}


package hu.hm.szititourbackend

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.security.RsaKeyProperties
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.slf4j.Logger
import org.slf4j.LoggerFactory



@EnableConfigurationProperties(RsaKeyProperties::class)
@SpringBootApplication(/*exclude = [SecurityAutoConfiguration::class]*/)
class SzititourBackendApplication {

    val logger: Logger = LoggerFactory.getLogger(SzititourBackendApplication::class.java)

    /*@Bean
    fun commandLineRunner(teamService: TeamService, securityService: SecurityService): CommandLineRunner {
        return CommandLineRunner { args ->
            val testPass = PasswordUtils.encryptPassword("T12345678")
            val tester =  Team(email= "t@test.hu", password = testPass)
            val tester2 =  Team(email= "tu@test.hu", password = testPass)
            val tester3 =  Team(email= "testerTeam23Autok@test.hu", password = testPass)
            val savedAdmin = teamService.addTeam(tester, true, isTester = true)
            val savedUser = teamService.addTeam(tester2, false, isTester = true)
            val savedUser3 = teamService.addTeam(tester3, false, isTester = true)
            logger.debug("tester admin created ${savedAdmin.id}")
            logger.debug("tester user created ${savedUser.id}")
            logger.debug("tester user created ${savedUser3.id}")
        }
    }*/
}

fun main(args: Array<String>) {
    runApplication<SzititourBackendApplication>(*args)
}


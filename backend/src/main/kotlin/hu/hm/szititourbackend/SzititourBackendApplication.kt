package hu.hm.szititourbackend

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.security.RsaKeyProperties
import hu.hm.szititourbackend.service.TeamService
import hu.hm.szititourbackend.util.PasswordUtils
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean


@EnableConfigurationProperties(RsaKeyProperties::class)
@SpringBootApplication(/*exclude = [SecurityAutoConfiguration::class]*/)
class SzititourBackendApplication {
    @Bean
    fun commandLineRunner(teamService: TeamService): CommandLineRunner {
        return CommandLineRunner { args ->

            val testPass = PasswordUtils.encryptPassword("T12345678");
            val tester =  Team(email= "t@test.hu", password = testPass);
            val savedAdmin = teamService.addTeam(tester, true)
            println("tester created ${savedAdmin.id}")
        }
    }
}

fun main(args: Array<String>) {
    runApplication<SzititourBackendApplication>(*args)
}


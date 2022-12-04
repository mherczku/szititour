package hu.hm.szititourbackend

import hu.hm.szititourbackend.security.RsaKeyProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication


@EnableConfigurationProperties(RsaKeyProperties::class)
@SpringBootApplication(/*exclude = [SecurityAutoConfiguration::class]*/)
class SzititourBackendApplication

fun main(args: Array<String>) {
    runApplication<SzititourBackendApplication>(*args)
}
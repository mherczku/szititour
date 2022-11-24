package hu.hm.szititourbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter


@SpringBootApplication
class SzititourBackendApplication {
    @Bean
    fun corsFilter(): CorsFilter {
        val corsConfiguration = CorsConfiguration()

        val allowedOrigins = listOf(
            "http://localhost:4200",
            "http://192.168.100.66:4200",
            "http://192.168.2.47:4200",
            "http://192.168.2.73:8082",
            "http://wildfire.ddns.net:8080",
            "https://wildfire.ddns.net:8080",
            "https://mherczku.github.io"
        )

        corsConfiguration.allowCredentials = true
        corsConfiguration.allowedOrigins = allowedOrigins
        corsConfiguration.allowedHeaders = listOf(
            "Origin", "Access-Control-Allow-Origin", "Content-Type",
            "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
            "Access-Control-Request-Method", "Access-Control-Request-Headers"
        )
        corsConfiguration.exposedHeaders = listOf(
            "Origin", "Content-Type", "Accept", "Authorization",
            "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
        )
        corsConfiguration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")

        val urlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration)
        return CorsFilter(urlBasedCorsConfigurationSource)
    }
}

fun main(args: Array<String>) {
    runApplication<SzititourBackendApplication>(*args)
}
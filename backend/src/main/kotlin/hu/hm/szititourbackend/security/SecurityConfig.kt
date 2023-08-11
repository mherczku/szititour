package hu.hm.szititourbackend.security

import com.nimbusds.jose.jwk.JWKSet
import com.nimbusds.jose.jwk.RSAKey
import com.nimbusds.jose.jwk.source.ImmutableJWKSet
import com.nimbusds.jose.proc.SecurityContext
import hu.hm.szititourbackend.security.SecurityService.Companion.CLAIM_ROLE
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_ADMIN
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.jwt.*
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.stream.Collectors


@Configuration
@EnableWebSecurity(debug = false)
@EnableMethodSecurity
class SecurityConfig2(
        private val securityUserDetailService: SecurityUserDetailService,
        private val rsaKeyProperties: RsaKeyProperties
) {

    /*@Bean
    fun webSecurityCustomizer(): WebSecurityCustomizer? {
        return WebSecurityCustomizer { web: WebSecurity -> web.ignoring().antMatchers("/auth/**") }
    }**/*/

    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain? {

        return http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/ws/admin").permitAll()
                .antMatchers("/ws/user").permitAll()
                //.antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2ResourceServer { httpSecurityOAuth2ResourceServerConfigurer: OAuth2ResourceServerConfigurer<HttpSecurity?> ->
                    httpSecurityOAuth2ResourceServerConfigurer.jwt()
                            .jwtAuthenticationConverter(jwtAuthConverter())
                }
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .userDetailsService(securityUserDetailService)
                .httpBasic(Customizer.withDefaults<HttpBasicConfigurer<HttpSecurity>>())
                //.addFilterBefore(jwtBlackListFilter, UsernamePasswordAuthenticationFilter::class.java)
                .cors().configurationSource(corsResource()).and()
                .build()
    }

    @Bean
    fun jwtDecoder(): JwtDecoder {
        return NimbusJwtDecoder.withPublicKey(rsaKeyProperties.rsaPublicKey).build()
    }

    @Bean
    fun jwtEncoder(): JwtEncoder {
        val rsaKey = RSAKey.Builder(rsaKeyProperties.rsaPublicKey).privateKey(rsaKeyProperties.rsaPrivateKey).build()
        val jwkSource = ImmutableJWKSet<SecurityContext>(JWKSet(rsaKey))

        return NimbusJwtEncoder(jwkSource)
    }

    private fun jwtAuthConverter(): Converter<Jwt, out AbstractAuthenticationToken> {
        val jwtAuthenticationConverter = JwtAuthenticationConverter()
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(JwtRoleConverter())

        return jwtAuthenticationConverter
    }

    @Bean
    fun corsResource(): UrlBasedCorsConfigurationSource {
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
                "Accept", "Authorization", "Email", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers", "longitude", "latitude", "gameid"
        )
        corsConfiguration.exposedHeaders = listOf(
                "Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"
        )
        corsConfiguration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "OPTIONS")

        val urlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration)
        return urlBasedCorsConfigurationSource
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder? {
        return BCryptPasswordEncoder()
    }

}

class JwtRoleConverter : Converter<Jwt?, Collection<GrantedAuthority?>?> {
    override fun convert(source: Jwt): Collection<GrantedAuthority> {
        val roles = source.getClaimAsStringList(CLAIM_ROLE)

        return roles.stream().map { role: String? ->
            SimpleGrantedAuthority(role)
        }.collect(Collectors.toList())
    }
}
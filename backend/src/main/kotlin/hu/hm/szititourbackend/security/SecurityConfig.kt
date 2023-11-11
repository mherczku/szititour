package hu.hm.szititourbackend.security

import com.nimbusds.jose.jwk.JWKSet
import com.nimbusds.jose.jwk.RSAKey
import com.nimbusds.jose.jwk.source.ImmutableJWKSet
import com.nimbusds.jose.proc.SecurityContext
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.CLAIM_ROLE
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.CLAIM_TYPE
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.CLAIM_TYPE_AUTH_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_DELETE_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_GOOGLE_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_PASSWORD_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_RESOURCE_TOKEN
import hu.hm.szititourbackend.security.SecurityTokenService.Companion.HEADER_TOKEN_ID
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.time.Instant
import java.util.stream.Collectors


@Configuration
@EnableWebSecurity(debug = false)
@EnableMethodSecurity
class SecurityConfig(
        private val securityUserDetailService: SecurityUserDetailService,
        private val rsaKeyProperties: RsaKeyProperties
) {

    @Bean
    fun tokenIdFilter(): TokenIdFilter {
        return TokenIdFilter()
    }

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
                //.antMatchers("/h2-console/**").permitAll()
                //.antMatchers("/h2-console").permitAll()
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
                .exceptionHandling(getExceptionHandler())
                .addFilterAfter(tokenIdFilter(), UsernamePasswordAuthenticationFilter::class.java)
                .addFilterAfter(ImgPropertyFilter(), TokenIdFilter::class.java)
                .cors().configurationSource(corsResource()).and()
                .build()
    }

    private fun getExceptionHandler(): Customizer<ExceptionHandlingConfigurer<HttpSecurity>> {
        return CustomAuthExceptionHandler()
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
                "https://mherczku.github.io"
        )

        corsConfiguration.allowCredentials = true
        corsConfiguration.allowedOrigins = allowedOrigins
        corsConfiguration.allowedHeaders = listOf(
                "Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers", "longitude", "latitude", "gameid", HEADER_GOOGLE_TOKEN, "ngrok-skip-browser-warning",
                HEADER_RESOURCE_TOKEN, HEADER_PASSWORD_TOKEN, HEADER_DELETE_TOKEN
        )
        corsConfiguration.exposedHeaders = listOf(
                "Origin", "Content-Type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", HEADER_TOKEN_ID
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
        val type = source.getClaimAsString(CLAIM_TYPE)

        if(type != CLAIM_TYPE_AUTH_TOKEN) {
            throw CustomException("AUTH_INVALID_TOKEN_TYPE", HttpStatus.FORBIDDEN, MessageConstants.AUTH_INVALID_TOKEN_TYPE)
        }
        if(source.expiresAt == null || source.expiresAt?.isBefore(Instant.now()) == true) {
            throw CustomException("TOKEN EXPIRED", HttpStatus.FORBIDDEN, MessageConstants.AUTH_TOKEN_EXPIRED)
        }

        return roles.stream().map { role: String? ->
            SimpleGrantedAuthority(role)
        }.collect(Collectors.toList())
    }
}
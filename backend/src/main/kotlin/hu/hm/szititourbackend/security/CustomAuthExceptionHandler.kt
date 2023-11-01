package hu.hm.szititourbackend.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.ObjectWriter
import hu.hm.szititourbackend.dto.response.Response
import hu.hm.szititourbackend.util.AuthUtil
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.InsufficientAuthenticationException
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer
import java.nio.charset.StandardCharsets

class CustomAuthExceptionHandler : Customizer<ExceptionHandlingConfigurer<HttpSecurity>> {
    override fun customize(t: ExceptionHandlingConfigurer<HttpSecurity>) {

        t.authenticationEntryPoint { request, response, authException ->
            if (authException is InsufficientAuthenticationException) {
                val r = Response(message = "Authentication failed", success = false, messageCode = AuthUtil.currentError)
                AuthUtil.currentError = MessageConstants.BAD_CREDENTIALS
                val ow: ObjectWriter = ObjectMapper().writer().withDefaultPrettyPrinter()
                val json: String = ow.writeValueAsString(r)
                val byteArray = json.toByteArray(StandardCharsets.UTF_8)
                response.setContentLength(json.length)
                response.outputStream.write(byteArray)
                response.outputStream.flush()
            }
            response.status = HttpStatus.UNAUTHORIZED.value()
            response.contentType = "application/json"
            response.characterEncoding = StandardCharsets.UTF_8.name()
        }
    }
}
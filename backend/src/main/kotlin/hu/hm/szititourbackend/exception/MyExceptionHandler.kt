package hu.hm.szititourbackend.exception

import hu.hm.szititourbackend.extramodel.Response
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class MyExceptionHandler {

    @ExceptionHandler(CustomException::class)
    fun handleCustomException(ex: CustomException): ResponseEntity<Response> {
        return ResponseEntity<Response>(Response(errorMessage = ex.message, success = false), ex.statusCode)
    }

    @ExceptionHandler(Exception::class)
    fun handleSimpleException(ex: Exception): ResponseEntity<Response> {
        return ResponseEntity<Response>(
            Response(errorMessage = ex.message.toString(), success = false),
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

    @ExceptionHandler(UsernameNotFoundException::class)
    fun handleUsernameNotFoundException(ex: UsernameNotFoundException): ResponseEntity<Response> {
        return ResponseEntity<Response>(
            Response(errorMessage = "Username (email) not found. SecurityDetailService", success = false),
            HttpStatus.NOT_FOUND
        )
    }
}
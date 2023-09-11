package hu.hm.szititourbackend.exception

import hu.hm.szititourbackend.extramodel.Response
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MissingRequestValueException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ControllerAdvice
class MyExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(MyExceptionHandler::class.java)

    @ExceptionHandler(CustomException::class)
    fun handleCustomException(ex: CustomException): ResponseEntity<Response> {
        logger.error("Custom exception occured: ${ex.message}")
        return ResponseEntity<Response>(Response(errorMessage = ex.message, success = false), ex.statusCode)
    }

    @ExceptionHandler(Exception::class)
    fun handleSimpleException(ex: Exception): ResponseEntity<Response> {
        logger.error("Internal Server Error occured: ${ex.message}")
        // Todo if debug:
        ex.printStackTrace()
        return ResponseEntity<Response>(
            Response(errorMessage = ex.message.toString(), success = false),
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

    @ExceptionHandler(DataIntegrityViolationException::class)
    fun handleCustomException(ex: DataIntegrityViolationException): ResponseEntity<Response> {
        logger.error("DataIntegrityViolationException occured: ${ex.message}")
        return ResponseEntity<Response>(Response(errorMessage = "Game title is already taken", success = false), HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(MissingRequestValueException::class)
    fun handleCustomException(ex: MissingRequestValueException): ResponseEntity<Response> {
        logger.error("MissingRequestValueException occured: ${ex.message}")
        return ResponseEntity<Response>(Response(errorMessage = ex.localizedMessage, success = false), HttpStatus.FORBIDDEN)
    }

    @ExceptionHandler(UsernameNotFoundException::class)
    fun handleUsernameNotFoundException(ex: UsernameNotFoundException): ResponseEntity<Response> {
        logger.error("UsernameNotFoundException occured: ${ex.message}")
        return ResponseEntity<Response>(
            Response(errorMessage = "Username (email) not found. SecurityDetailService", success = false),
            HttpStatus.NOT_FOUND
        )
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException::class)
    fun handleHttpRequestMethodNotSupportedException(ex: HttpRequestMethodNotSupportedException): ResponseEntity<Response> {
        logger.error("HttpRequestMethodNotSupportedException occured: ${ex.message}")
        return ResponseEntity<Response>(
                Response(errorMessage = "Request method not supported: ${ex.localizedMessage}", success = false),
                HttpStatus.BAD_REQUEST
        )
    }
}
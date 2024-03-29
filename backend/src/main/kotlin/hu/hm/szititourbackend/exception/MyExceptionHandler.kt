package hu.hm.szititourbackend.exception

import hu.hm.szititourbackend.dto.response.Response
import hu.hm.szititourbackend.util.MessageConstants
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.oauth2.jwt.JwtValidationException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MissingRequestValueException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.multipart.MaxUploadSizeExceededException

@ControllerAdvice
class MyExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(CustomException::class)
    fun handleCustomException(ex: CustomException): ResponseEntity<Response> {
        logger.error("Custom exception occured: ${ex.message}")
        return ResponseEntity<Response>(Response(message = ex.message, success = false, messageCode = ex.messageCode), ex.statusCode)
    }

    @ExceptionHandler(Exception::class)
    fun handleSimpleException(ex: Exception): ResponseEntity<Response> {
        logger.error("Internal Server Error occured: ${ex.message}")
        return ResponseEntity<Response>(
            Response(message = ex.message.toString(), success = false, messageCode = MessageConstants.UNKNOWN),
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

    @ExceptionHandler(DataIntegrityViolationException::class)
    fun handleCustomException(ex: DataIntegrityViolationException): ResponseEntity<Response> {
        logger.error("DataIntegrityViolationException occured: ${ex.message}")
        return ResponseEntity<Response>(Response(message = "Game title is already taken", success = false, messageCode =  MessageConstants.GAME_TITLE_TAKEN), HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(MissingRequestValueException::class)
    fun handleCustomException(ex: MissingRequestValueException): ResponseEntity<Response> {
        logger.error("MissingRequestValueException occured: ${ex.message}")
        return ResponseEntity<Response>(Response(message = ex.localizedMessage, success = false, messageCode =  MessageConstants.MISSING_REQUEST_VALUE), HttpStatus.FORBIDDEN)
    }

    @ExceptionHandler(UsernameNotFoundException::class)
    fun handleUsernameNotFoundException(ex: UsernameNotFoundException): ResponseEntity<Response> {
        logger.error("UsernameNotFoundException occured: ${ex.message}")
        return ResponseEntity<Response>(
            Response(message = "Username (email) not found", success = false, messageCode =  MessageConstants.TEAM_NOT_FOUND),
            HttpStatus.NOT_FOUND
        )
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException::class)
    fun handleHttpRequestMethodNotSupportedException(ex: HttpRequestMethodNotSupportedException): ResponseEntity<Response> {
        logger.error("HttpRequestMethodNotSupportedException occured: ${ex.message}")
        return ResponseEntity<Response>(
                Response(message = "Request method not supported: ${ex.localizedMessage}", success = false, messageCode =  MessageConstants.REQUEST_METHOD_NOT_SUPPORTED),
                HttpStatus.BAD_REQUEST
        )
    }
    @ExceptionHandler(JwtValidationException::class)
    fun handleJwtValidationException(ex: JwtValidationException): ResponseEntity<Response> {
        logger.error("JwtValidationException occured: ${ex.message}")
        return ResponseEntity<Response>(
                Response(message = "JwtValidationException ${ex.localizedMessage}", success = false, messageCode =  MessageConstants.AUTH_TOKEN_INVALID),
                HttpStatus.BAD_REQUEST
        )
    }
    @ExceptionHandler(MaxUploadSizeExceededException::class)
    fun handleSizeLimitExceededException(ex: MaxUploadSizeExceededException): ResponseEntity<Response> {
        logger.error("MaxUploadSizeExceededException occured: ${ex.message}")
        return ResponseEntity<Response>(
                Response(message = "MaxUploadSizeExceededException ${ex.localizedMessage}", success = false, messageCode =  MessageConstants.UPLOAD_SIZE_LIMIT),
                HttpStatus.BAD_REQUEST
        )
    }
}
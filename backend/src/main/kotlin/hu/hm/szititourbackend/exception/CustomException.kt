package hu.hm.szititourbackend.exception

import org.springframework.http.HttpStatus

class CustomException(override val message: String, val statusCode: HttpStatus) : Exception()
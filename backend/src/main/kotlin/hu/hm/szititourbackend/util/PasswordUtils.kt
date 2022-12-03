package hu.hm.szititourbackend.util

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


object PasswordUtils {

    private val passwordEncoder = BCryptPasswordEncoder()

    fun encryptPassword(password: String): String {
        return this.passwordEncoder.encode(password)
    }

    fun comparePassword(rawPassword: String, encodedPassword: String): Boolean{
        return BCryptPasswordEncoder().matches(rawPassword, encodedPassword)
    }

}
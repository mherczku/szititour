package hu.hm.szititourbackend.util

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.*


object PasswordUtils {

    private val passwordEncoder = BCryptPasswordEncoder()

    fun encryptPassword(password: String): String {
        return this.passwordEncoder.encode(password)
    }

    fun comparePassword(rawPassword: String, encodedPassword: String): Boolean{
        return BCryptPasswordEncoder().matches(rawPassword, encodedPassword)
    }

    fun generatePassword(): String {
        val length = 16
        val capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        val lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz"
        val specialCharacters = "!@#$&"
        val numbers = "1234567890"
        val combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers
        val random = Random()
        val password = CharArray(length)
        password[0] = lowerCaseLetters[random.nextInt(lowerCaseLetters.length)]
        password[1] = capitalCaseLetters[random.nextInt(capitalCaseLetters.length)]
        password[2] = specialCharacters[random.nextInt(specialCharacters.length)]
        password[3] = numbers[random.nextInt(numbers.length)]
        for (i in 4 until length) {
            password[i] = combinedChars[random.nextInt(combinedChars.length)]
        }
        val p = password.toMutableList()
        p.shuffle()
        return p.toString().replace(", ", "")
    }

}
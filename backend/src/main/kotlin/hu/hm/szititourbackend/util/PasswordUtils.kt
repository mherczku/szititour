package hu.hm.szititourbackend.util

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.*
import java.util.regex.Pattern


object PasswordUtils {

    private val EMAIL_REGEX_PATTERN: Pattern =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    private val NUMBER: Pattern = Pattern.compile("[0-9]", Pattern.CASE_INSENSITIVE)
    private val AZLETTER: Pattern = Pattern.compile("[A-z]", Pattern.CASE_INSENSITIVE)

    fun validatePassword(password: String): Boolean {
        // accepted special characters = #!&+@
        return (password.length >= 8 && NUMBER.matcher(password).find() && AZLETTER.matcher(password)
                .find() && !password.contains(" "))
    }

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

    fun validateEmail(email: String): Boolean {
        return EMAIL_REGEX_PATTERN.matcher(email).find()
    }



}
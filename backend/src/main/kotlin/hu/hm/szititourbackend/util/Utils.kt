package hu.hm.szititourbackend.util

import java.util.regex.Pattern

object Utils {

    private val EMAIL_REGEX_PATTERN: Pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    private val NUMBER: Pattern = Pattern.compile("[0-9]", Pattern.CASE_INSENSITIVE)
    private val AZLETTER: Pattern = Pattern.compile("[A-z]", Pattern.CASE_INSENSITIVE)
    private val SPECIALCHARACTERS: Pattern = Pattern.compile("[!+#&@A-z0-9]\$", Pattern.LITERAL)


    fun validateEmail(email: String): Boolean {
        return EMAIL_REGEX_PATTERN.matcher(email).find()
    }

    fun validatePassword(password: String): Boolean {
        // accepted special characters = #!&+@
        return  (password.length >= 8 && NUMBER.matcher(password).find() && AZLETTER.matcher(password).find() && !password.contains(" "))
    }

}
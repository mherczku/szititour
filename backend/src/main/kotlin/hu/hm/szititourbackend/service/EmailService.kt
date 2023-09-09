package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.util.SzititourProperties
import hu.hm.szititourbackend.security.RsaKeyProperties
import hu.hm.szititourbackend.exception.CustomException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import java.nio.file.Files
import javax.mail.Message
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.io.ClassPathResource
import org.springframework.http.HttpStatus


@Service
class EmailService @Autowired constructor(private val javaMailSender: JavaMailSender, private val szititourProperties: SzititourProperties) {

    val logger: Logger = LoggerFactory.getLogger(EmailService::class.java)

    fun sendWelcomeMail(emailTo: String, username: String, verificationToken: String) {
        logger.debug("Send welcome email to ${username}")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt@gmail.com")
        mimeMessage.subject = "Verify your Email"
        mimeMessage.addRecipients(Message.RecipientType.TO, emailTo)

        val messageTemplateIs = szititourProperties.welcomeTemplate?.inputStream
        if(messageTemplateIs != null) {

            var content = String(messageTemplateIs.readAllBytes())

            content = content.replace("[USERNAME]", username)
            content = content.replace("[VERIFICATION_TOKEN]", verificationToken)
            val helper = MimeMessageHelper(mimeMessage, true)
            helper.setText(content, true)

            javaMailSender.send(mimeMessage)
        } else {
            logger.error("Send welcome email to ${username} message template file was null")
            throw CustomException("Email send failed, message template was null", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
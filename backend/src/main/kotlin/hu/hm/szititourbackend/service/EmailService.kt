package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.util.MessageConstants
import hu.hm.szititourbackend.util.SzititourProperties
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import javax.mail.Message


@Service
class EmailService @Autowired constructor(private val javaMailSender: JavaMailSender, private val szititourProperties: SzititourProperties) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    fun sendWelcomeMail(emailTo: String, username: String, verificationToken: String) {
        logger.debug("Send welcome email to $username")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt@gmail.com")
        mimeMessage.subject = "Verify your E-mail"
        mimeMessage.addRecipients(Message.RecipientType.TO, emailTo)

        val messageTemplateIs = szititourProperties.welcomeTemplate?.inputStream
        if (messageTemplateIs != null) {

            var content = String(messageTemplateIs.readAllBytes())

            content = content.replace("[USERNAME]", username)
            content = content.replace("[VERIFICATION_TOKEN]", verificationToken)
            val helper = MimeMessageHelper(mimeMessage, true)
            helper.setText(content, true)

            javaMailSender.send(mimeMessage)
        } else {
            logger.error("Send welcome email to $username message template file was null")
            throw CustomException("Email send failed, message template was null", HttpStatus.INTERNAL_SERVER_ERROR, MessageConstants.EMAIL_SEND_FAILED_TEMPLATE_NULL)
        }

    }

    fun sendModifyEmailMail(emailTo: String, username: String, verificationToken: String) {
        logger.debug("Send modify email to $username")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt@gmail.com")
        mimeMessage.subject = "Verify your new E-mail"
        mimeMessage.addRecipients(Message.RecipientType.TO, emailTo)

        val messageTemplateIs = szititourProperties.emailUpdateTemplate?.inputStream
        if (messageTemplateIs != null) {

            var content = String(messageTemplateIs.readAllBytes())

            content = content.replace("[USERNAME]", username)
            content = content.replace("[VERIFICATION_TOKEN]", verificationToken)
            val helper = MimeMessageHelper(mimeMessage, true)
            helper.setText(content, true)

            javaMailSender.send(mimeMessage)
        } else {
            logger.error("Send modify-email email to $username message template file was null")
            throw CustomException("Email send failed, message template was null", HttpStatus.INTERNAL_SERVER_ERROR, MessageConstants.EMAIL_SEND_FAILED_TEMPLATE_NULL)
        }
    }

    fun sendPasswordModifiedEmail(emailTo: String, username: String) {
        logger.debug("Send password update email to $username")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt@gmail.com")
        mimeMessage.subject = "Jelszavad módosítva"
        mimeMessage.addRecipients(Message.RecipientType.TO, emailTo)

        val messageTemplateIs = szititourProperties.passwordUpdateTemplate?.inputStream
        if (messageTemplateIs != null) {

            var content = String(messageTemplateIs.readAllBytes())

            content = content.replace("[USERNAME]", username)
            val helper = MimeMessageHelper(mimeMessage, true)
            helper.setText(content, true)

            javaMailSender.send(mimeMessage)
        } else {
            logger.error("Send password update email to $username message template file was null")
            throw CustomException("Email send failed, message template was null", HttpStatus.INTERNAL_SERVER_ERROR, MessageConstants.EMAIL_SEND_FAILED_TEMPLATE_NULL)
        }
    }
}
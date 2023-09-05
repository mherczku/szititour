package hu.hm.szititourbackend.service

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


@Service
class EmailService @Autowired constructor(private val javaMailSender: JavaMailSender) {

    @Value("classpath:/templates/welcome.template.html")
    var resource: Resource? = null

    val logger: Logger = LoggerFactory.getLogger(EmailService::class.java)


    fun sendWelcomeMail(emailTo: String, username: String, verificationToken: String) {
        logger.debug("Send welcome email to ${username}")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt@gmail.com")
        mimeMessage.subject = "Verify your Email"
        mimeMessage.addRecipients(Message.RecipientType.TO, emailTo)

        val messageTemplate = resource?.file
        if(messageTemplate != null) {

            var content = String(Files.readAllBytes(messageTemplate.toPath()))

            content = content.replace("[USERNAME]", username)
            content = content.replace("[VERIFICATION_TOKEN]", verificationToken)
            val helper = MimeMessageHelper(mimeMessage, true)
            helper.setText(content, true)

            javaMailSender.send(mimeMessage)
        }

    }
}
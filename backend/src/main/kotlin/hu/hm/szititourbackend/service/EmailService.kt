package hu.hm.szititourbackend.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import java.nio.file.Files
import javax.mail.Message


@Service
class EmailService @Autowired constructor(private val javaMailSender: JavaMailSender) {

    @Value("classpath:/templates/welcome.template.html")
    var resource: Resource? = null

    fun sendWelcomeMail(emailTo: String, username: String, verificationToken: String) {
        println("sending email 1")
        val mimeMessage = javaMailSender.createMimeMessage()
        mimeMessage.setFrom("szititour.nxt+test@gmail.com")
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
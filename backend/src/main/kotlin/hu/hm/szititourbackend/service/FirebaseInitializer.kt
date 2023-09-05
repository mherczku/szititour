package hu.hm.szititourbackend.service

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service
import java.io.IOException
import javax.annotation.PostConstruct

@Service
class FirebaseInitializer {

    val logger: Logger = LoggerFactory.getLogger(FirebaseInitializer::class.java)

    @PostConstruct
    fun initialize(){
        // Get our credentials to authorize this Spring Boot application.
        try {
            val options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(ClassPathResource("firebase.json").inputStream)).build()

            // If our app Firebase application was not initialized, do so.
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options)
                logger.info("Firebase application has been initialized")
            }
        } catch (e: IOException) {
            logger.error("Error while initializing firebase app: ${e.message}")
        }

    }

}
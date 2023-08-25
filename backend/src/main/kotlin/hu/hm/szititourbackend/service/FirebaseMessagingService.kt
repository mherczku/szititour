package hu.hm.szititourbackend.service

import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.WebpushConfig
import com.google.firebase.messaging.WebpushNotification
import hu.hm.szititourbackend.extramodel.DirectNotification
import hu.hm.szititourbackend.extramodel.SubscriptionRequest
import hu.hm.szititourbackend.extramodel.TopicNotification
import org.springframework.stereotype.Service


@Service
class FirebaseMessagingService {

    fun sendNotificationToTarget(notification: DirectNotification){
        val message = Message.builder()
                // Set the configuration for our web notification
                .setWebpushConfig(
                        // Create and pass a WebpushConfig object setting the notification
                        WebpushConfig.builder()
                                .setNotification(
                                        // Create and pass a web notification object with the specified title, body, and icon URL
                                        WebpushNotification.builder()
                                                .setTitle(notification.title)
                                                .setBody(notification.message)
                                                .setIcon("https://mherczku.github.io/szititour/assets/svg/szititour.svg")
                                                .build()
                                ).build()
                )
                // Specify the user to send it to in the form of their token
                .setToken(notification.target)
                .build()
        FirebaseMessaging.getInstance().sendAsync(message)
    }

    fun sendNotificationToTopic(notification: TopicNotification){
        val message = Message.builder()
                .setWebpushConfig(
                        WebpushConfig.builder()
                                .setNotification(
                                        WebpushNotification.builder()
                                                .setTitle(notification.title)
                                                .setBody(notification.message)
                                                .setIcon("https://mherczku.github.io/szititour/assets/svg/szititour.svg")
                                                .build()
                                ).build()
                ).setTopic(notification.topic)
                .build()

        FirebaseMessaging.getInstance().sendAsync(message)
    }

    fun subscribeToTopic(subscription: SubscriptionRequest){

        FirebaseMessaging.getInstance().subscribeToTopic(listOf(subscription.subscriber), subscription.topic)

    }

}
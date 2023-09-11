package hu.hm.szititourbackend.service

import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.WebpushConfig
import com.google.firebase.messaging.WebpushNotification
import hu.hm.szititourbackend.datamodel.NotiSubscriber
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.extramodel.DirectNotification
import hu.hm.szititourbackend.extramodel.SubscriptionRequest
import hu.hm.szititourbackend.extramodel.TopicNotification
import hu.hm.szititourbackend.repository.NotiSubscriberRepository
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service


@Service
class FirebaseMessagingService(private val notiSubscriberRepository: NotiSubscriberRepository) {

    fun sendNotificationToTarget(notification: DirectNotification){
        if(!notification.isValid()) {
            throw CustomException("Notification is not valid", HttpStatus.BAD_REQUEST)
        }
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
        if(!notification.isValid()) {
            throw CustomException("Notification is not valid", HttpStatus.BAD_REQUEST)
        }
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

    fun subscribeToTopic(subscription: SubscriptionRequest, userId: Int): List<String> {
        var toReturn = listOf<String>()
        val subscriber = notiSubscriberRepository.findByToken(subscription.subscriber)
        if(subscriber.isPresent) {
            val sub = subscriber.get()
            if(!sub.topics.contains(subscription.topic)) {
                sub.topics.add(subscription.topic)
                toReturn = notiSubscriberRepository.save(sub).topics
            }
        } else {
            val newSubscriber = NotiSubscriber(
                    teamId = userId,
                    topics = mutableListOf(subscription.topic),
                    token = subscription.subscriber
            )
            toReturn = notiSubscriberRepository.save(newSubscriber).topics
        }
        FirebaseMessaging.getInstance().subscribeToTopic(listOf(subscription.subscriber), subscription.topic)
        return toReturn
    }

    fun unsubscribeFromTopic(subscription: SubscriptionRequest): List<String> {
        var toReturn = listOf<String>()
        val optional = notiSubscriberRepository.findByToken(subscription.subscriber)
        if (optional.isPresent) {
            val subscriber = optional.get()
            subscriber.topics.remove(subscription.topic)
            toReturn = subscriber.topics
            if(subscriber.topics.size < 1) {
                notiSubscriberRepository.delete(subscriber)
            }
        }
        FirebaseMessaging.getInstance().unsubscribeFromTopic(listOf(subscription.subscriber), subscription.topic)
        return toReturn
    }

    fun getSubscriptions(subscription: SubscriptionRequest): List<String> {
        val subscriber = notiSubscriberRepository.findByToken(subscription.subscriber)
        if(subscriber.isPresent) {
            val sub = subscriber.get()
            return sub.topics
        }
        return listOf()
    }

}
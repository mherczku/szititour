package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.extramodel.SubscriptionRequest
import hu.hm.szititourbackend.service.FirebaseMessagingService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/notification")
class NotificationUserController(private val fms: FirebaseMessagingService) {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    @PostMapping("subscribe")
    fun subscribeToTopic(@RequestBody subscription: SubscriptionRequest, auth: Authentication): ResponseEntity<List<String>> {
        logger.info("Subscribe to topic ${subscription.topic} by user ${auth.name}")
        return ResponseEntity<List<String>>(fms.subscribeToTopic(subscription, auth.name.toInt()), HttpStatus.OK)
    }

    @PostMapping("unsubscribe")
    fun unsubscribeFromTopic(@RequestBody subscription: SubscriptionRequest, auth: Authentication): ResponseEntity<List<String>> {
        logger.info("Unsubscribe from topic ${subscription.topic} by user ${auth.name}")
        return ResponseEntity<List<String>>(fms.unsubscribeFromTopic(subscription), HttpStatus.OK)
    }

    @PostMapping("topics")
    fun getSubscriptions(@RequestBody subscription: SubscriptionRequest, auth: Authentication): ResponseEntity<List<String>> {
        logger.debug("Get subscriptions by user ${auth.name}")
        fms.getSubscriptions(subscription)
        return ResponseEntity<List<String>>(fms.getSubscriptions(subscription), HttpStatus.OK)
    }
}
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

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/notification")
class NotificationUserController(private val fms: FirebaseMessagingService) {
    
    @PostMapping("subscribe")
    fun subscribeToTopic(@RequestBody subscription: SubscriptionRequest, auth: Authentication): ResponseEntity<List<String>> {
        return ResponseEntity<List<String>>(fms.subscribeToTopic(subscription, auth.name.toInt()), HttpStatus.OK)
    }

    @PostMapping("unsubscribe")
    fun unsubscribeFromTopic(@RequestBody subscription: SubscriptionRequest, auth: Authentication): ResponseEntity<List<String>> {
        return ResponseEntity<List<String>>(fms.unsubscribeFromTopic(subscription, auth.name.toInt()), HttpStatus.OK)
    }

    @PostMapping("topics")
    fun getTopics(@RequestBody subscription: SubscriptionRequest): ResponseEntity<List<String>> {
        fms.getSubscriptions(subscription)
        return ResponseEntity<List<String>>(fms.getSubscriptions(subscription), HttpStatus.OK)
    }
}
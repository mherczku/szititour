package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.extramodel.SubscriptionRequest
import hu.hm.szititourbackend.service.FirebaseMessagingService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
@RequestMapping("/notification")
class NotificationUserController(private val fms: FirebaseMessagingService) {
    
    @PostMapping("subscribe")
    fun subscribeToTopic(@RequestBody subscription: SubscriptionRequest){
        fms.subscribeToTopic(subscription)
    }
}
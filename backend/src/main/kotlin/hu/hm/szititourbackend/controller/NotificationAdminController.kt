package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.extramodel.DirectNotification
import hu.hm.szititourbackend.extramodel.TopicNotification
import hu.hm.szititourbackend.service.FirebaseMessagingService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/noti")
class NotificationAdminController(private val fms: FirebaseMessagingService) {
    @PostMapping("direct")
    fun sendTargetedNotification(@RequestBody notification: DirectNotification){
        fms.sendNotificationToTarget(notification)
    }

    @PostMapping("topic")
    fun sendNotificationToTopic(@RequestBody notification: TopicNotification){
        fms.sendNotificationToTopic(notification)
    }

}
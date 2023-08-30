package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.extramodel.DirectNotification
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.extramodel.TopicNotification
import hu.hm.szititourbackend.service.FirebaseMessagingService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
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
    fun sendTargetedNotification(@RequestBody notification: DirectNotification): ResponseEntity<Response> {
        fms.sendNotificationToTarget(notification)
        return ResponseEntity<Response>(Response(success = true), HttpStatus.OK)
    }

    @PostMapping("topic")
    fun sendNotificationToTopic(@RequestBody notification: TopicNotification): ResponseEntity<Response> {
        fms.sendNotificationToTopic(notification)
        return ResponseEntity<Response>(Response(success = true), HttpStatus.OK)
    }

}
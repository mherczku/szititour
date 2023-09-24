package hu.hm.szititourbackend.controller

import hu.hm.szititourbackend.extramodel.DirectNotification
import hu.hm.szititourbackend.extramodel.Response
import hu.hm.szititourbackend.extramodel.TopicNotification
import hu.hm.szititourbackend.service.FirebaseMessagingService
import hu.hm.szititourbackend.util.MessageConstants
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RequestMapping("/noti")
class NotificationAdminController(private val fms: FirebaseMessagingService) {

    val logger: Logger = LoggerFactory.getLogger(NotificationAdminController::class.java)

    @PostMapping("direct")
    fun sendTargetedNotification(@RequestBody notification: DirectNotification, auth: Authentication): ResponseEntity<Response> {
        logger.info("Send direct notification with title ${notification.title} - by admin ${auth.name}")
        fms.sendNotificationToTarget(notification)
        return ResponseEntity<Response>(Response(success = true, messageCode = MessageConstants.DIRECT_NOTIFICATION_SENT), HttpStatus.OK)
    }

    @PostMapping("topic")
    fun sendNotificationToTopic(@RequestBody notification: TopicNotification, auth: Authentication): ResponseEntity<Response> {
        logger.info("Send topic notification with title ${notification.title} to topic ${notification.topic} - by admin ${auth.name}")
        fms.sendNotificationToTopic(notification)
        return ResponseEntity<Response>(Response(success = true, messageCode = MessageConstants.TOPIC_NOTIFICATION_SENT), HttpStatus.OK)
    }

}
package hu.hm.szititourbackend.chat

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

/*
@Controller
class GreetingController @Autowired constructor(private val messagingTemplate: SimpMessagingTemplate) {
    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    fun register(@Payload chatMessage: ChatMessage, headerAccessor: SimpMessageHeaderAccessor): ChatMessage {
        headerAccessor.sessionAttributes?.put("username", chatMessage.sender);
        println("register: ${chatMessage.sender} : ${chatMessage.content} : ${chatMessage.type}")

        return chatMessage;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    fun sendMessage(@Payload chatMessage: ChatMessage): ChatMessage {
        println("chat.send: ${chatMessage.sender} : ${chatMessage.content} : ${chatMessage.type}")
        return chatMessage;
    }

    // Send a message to a specific user
    fun sendMessageToUser(username: String, message: ChatMessage) {
        println("toUser: ${message.sender} : ${message.content} : ${message.type} --- $username")

        messagingTemplate.convertAndSendToUser(username, "/queue/private", message)
    }

    @MessageMapping("/chat.sendToOne")
    fun sendMessageToOne(@Payload chatMessage: ChatMessage) {
        // Assuming chatMessage includes a 'recipient' field with the target user's username
        println("chat.sendToOne: ${chatMessage.sender} : ${chatMessage.content} : ${chatMessage.type}")

        sendMessageToUser("lajos", chatMessage)
    }
}
*/
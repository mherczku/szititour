package hu.hm.szititourbackend.chat

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.io.IOException


@Component
class UserSocketHandler constructor(@Autowired @Lazy private val adminSocket: AdminSocketHandler) : TextWebSocketHandler() {
    var sessions: MutableMap<String, WebSocketSession> = mutableMapOf()

    @Throws(InterruptedException::class, IOException::class)
    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        println("handle user text $message - : ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")

        try {
            val chatMessage: ChatMessage = ObjectMapper().readValue(message.payload, ChatMessage::class.java)
            chatMessage.sender = session.id

            println("sending user message $message to all admins")
            for (webSocketSession in adminSocket.sessions) {
                webSocketSession.value.sendMessage(message)
            }
        } catch (e: Exception) {
            println("Websocket exception while in user socket:")
            e.printStackTrace()
        }
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        super.afterConnectionClosed(session, status)
        sessions.remove(session.id)
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        println("user conn est: ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")

        //the messages will be broadcasted to all users.
        sessions[session.id] = session
    }
}
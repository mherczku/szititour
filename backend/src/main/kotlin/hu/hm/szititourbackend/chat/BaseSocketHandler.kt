package hu.hm.szititourbackend.chat

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler


@Component
class BaseSocketHandler : TextWebSocketHandler() {
    fun sendMessageTo(session: WebSocketSession?, message: Any): Boolean {
        return if (session != null && session.isOpen) {
            if (message is TextMessage) {
                session.sendMessage(message)
            } else {
                val text = ObjectMapper().writeValueAsString(message)
                session.sendMessage(TextMessage(text))
            }
            true
        }
        else {
            false
        }
    }

    fun sendMessageTo(sessionData: SessionData?, message: Any): Boolean {
        return if (sessionData != null && sessionData.authenticated && sessionData.session.isOpen) {
            if (message is TextMessage) {
                sessionData.session.sendMessage(message)
            } else {
                val text = ObjectMapper().writeValueAsString(message)
                sessionData.session.sendMessage(TextMessage(text))
            }
            true
        } else {
            false
        }
    }

}
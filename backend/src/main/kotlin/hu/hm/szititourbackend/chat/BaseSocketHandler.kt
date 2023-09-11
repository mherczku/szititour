package hu.hm.szititourbackend.chat

import com.fasterxml.jackson.databind.ObjectMapper
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.security.SecurityService.Companion.ROLE_ADMIN
import hu.hm.szititourbackend.service.TeamService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.io.IOException


@Component
class BaseSocketHandler() : TextWebSocketHandler() {
    fun sendMessageTo(session: WebSocketSession?, message: Any) {
        if (session != null && session.isOpen) {
            if (message is TextMessage) {
                session.sendMessage(message)
            } else {
                val text = ObjectMapper().writeValueAsString(message)
                session.sendMessage(TextMessage(text))
            }
        }
    }

    fun sendMessageTo(sessionData: SessionData?, message: Any) {
        if (sessionData != null && sessionData.authenticated && sessionData.session.isOpen) {
            if (message is TextMessage) {
                sessionData.session.sendMessage(message)
            } else {
                val text = ObjectMapper().writeValueAsString(message)
                sessionData.session.sendMessage(TextMessage(text))
            }
        }
    }

}
package hu.hm.szititourbackend.chat

import com.fasterxml.jackson.databind.ObjectMapper
import hu.hm.szititourbackend.security.SecurityService
import hu.hm.szititourbackend.service.TeamService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.io.IOException


data class SessionData(
        val username: String,
        val userId: Int,
        val session: WebSocketSession,
        val authenticated: Boolean
)

@Component
class UserSocketHandler constructor(@Autowired @Lazy private val adminSocket: AdminSocketHandler, private val teamService: TeamService, private val securityService: SecurityService) : BaseSocketHandler() {
    var sessions: MutableMap<String, SessionData> = mutableMapOf()

    @Throws(InterruptedException::class, IOException::class)
    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        println("handle user text $message - : ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")

        try {
            val chatMessage: ChatMessage = ObjectMapper().readValue(message.payload, ChatMessage::class.java)
            var sessionData = sessions[session.id]

            if (sessionData == null) {
                session.close(CloseStatus.NOT_ACCEPTABLE)
            } else {
                if (!sessionData.authenticated) {
                    sessionData = authenticate(session, chatMessage)
                    if (sessionData !== null) {
                        sessions[session.id] = sessionData
                        sendMessageTo(sessionData, ChatMessage(content = "SUCCESS", type = "JOIN"))
                        return
                    } else {
                        return
                    }
                }
                chatMessage.sender = sessionData.username
            }

            println("sending user message $message to all admins")
            for (webSocketSession in adminSocket.sessions) {
                sendMessageTo(webSocketSession.value, message)
            }
            // sent back to user
            sendMessageTo(session, message)

        } catch (e: Exception) {
            println("Websocket exception while in user socket:")
            e.printStackTrace()
        }
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        super.afterConnectionClosed(session, status)

        notifyAdminsOnLeave(sessions[session.id]?.username)
        sessions.remove(session.id)
        sessions.forEach {
            println("marad: ${it.value.username }")
        }
    }

    private fun notifyAdminsOnLeave(username: String?) {
        if(username != null) {
            for (webSocketSession in adminSocket.sessions) {
                sendMessageTo(webSocketSession.value, ChatMessage(sender = username, type = "LEAVE"))
            }
        }
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        println("user conn est: ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")
        val sessionData = SessionData(username = "", session = session, authenticated = false, userId = -1)

        sessions[session.id] = sessionData
    }

    private fun authenticate(session: WebSocketSession, chatMessage: ChatMessage): SessionData? {
        return if (chatMessage.type == "AUTH") {
            val token = chatMessage.token
            val verification = securityService.verifyToken(token)
            if (verification.verified) {
                val currentTeam = teamService.getTeamById(verification.teamId)

                // Already has open connection:
                if(sessions.values.find { it.userId == currentTeam.id } != null) {
                    sendMessageTo(session, ChatMessage(type = "ALREADY_OPEN"))
                    session.close(CloseStatus.SERVICE_OVERLOAD)
                    null
                } else {
                    SessionData(username = currentTeam.name, session = session, authenticated = true, userId = currentTeam.id)
                }

            } else {
                session.close(CloseStatus.POLICY_VIOLATION)
                null
            }
        } else {
            session.close(CloseStatus.NOT_ACCEPTABLE)
            null
        }
    }
}
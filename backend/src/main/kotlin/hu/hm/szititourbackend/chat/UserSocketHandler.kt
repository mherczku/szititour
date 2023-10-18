package hu.hm.szititourbackend.chat

import com.fasterxml.jackson.databind.ObjectMapper
import hu.hm.szititourbackend.security.SecurityTokenService
import hu.hm.szititourbackend.service.TeamService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import java.io.IOException

data class SessionData(
        val username: String,
        val userId: Int,
        val session: WebSocketSession,
        val authenticated: Boolean
)

@Component
class UserSocketHandler(@Autowired @Lazy private val adminSocket: AdminSocketHandler, private val teamService: TeamService, private val securityTokenService: SecurityTokenService) : BaseSocketHandler() {

    val logger: Logger = LoggerFactory.getLogger(javaClass)

    var sessions: MutableList<SessionData> = mutableListOf()

    @Throws(InterruptedException::class, IOException::class)
    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {

        try {
            val chatMessage: ChatMessage = ObjectMapper().readValue(message.payload, ChatMessage::class.java)
            var sessionData = sessions.find { it.session.id == session.id }

            if (sessionData == null) {
                session.close(CloseStatus.NOT_ACCEPTABLE)
            } else {
                if (!sessionData.authenticated) {
                    sessionData = authenticate(session, chatMessage)
                    if (sessionData !== null) {
                        sessions.removeIf { it.session.id == sessionData.session.id }
                        sessions.add(sessionData)
                        sendMessageTo(sessionData, ChatMessage(content = "SUCCESS", type = "JOIN"))
                        return
                    } else {
                        return
                    }
                }
                chatMessage.sender = sessionData.username
            }
            var openAdmins = 0
            for (webSocketSession in adminSocket.sessions) {
                if (sendMessageTo(webSocketSession, message)) {
                    openAdmins++
                }
            }
            if (openAdmins < 1) {
                // if no admin session open, notify user
                sendMessageTo(session, ChatMessage(type = "INFO", content = "NO_ADMIN"))
            } else {
                // sent back to user
                sendMessageTo(session, message)
            }


        } catch (e: Exception) {
            logger.error("Websocket exception")
        }
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        super.afterConnectionClosed(session, status)

        notifyAdminsOnLeave(sessions.find { it.session.id == session.id }?.username)
        sessions.removeIf { it.session.id == session.id }
    }

    private fun notifyAdminsOnLeave(username: String?) {
        if (username != null) {
            for (webSocketSession in adminSocket.sessions) {
                sendMessageTo(webSocketSession, ChatMessage(sender = username, type = "LEAVE"))
            }
        }
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        sessions.add(SessionData(username = "", session = session, authenticated = false, userId = -1))
    }

    private fun authenticate(session: WebSocketSession, chatMessage: ChatMessage): SessionData? {
        return if (chatMessage.type == "AUTH") {
            val token = chatMessage.token
            val verification = securityTokenService.verifyToken(token)
            if (verification.verified) {
                val currentTeam = teamService.getTeamById(verification.teamId)

                // Already has open connection:
                val alreadySessions = sessions.filter { it.userId == currentTeam.id }
                if (alreadySessions.isNotEmpty()) {
                    var alreadyOpen = false
                    alreadySessions.forEach {
                        if(it.session.isOpen) {
                            alreadyOpen = true
                        } else {
                            sessions.remove(it)
                        }
                    }
                    if(alreadyOpen) {
                        sendMessageTo(session, ChatMessage(type = "ALREADY_OPEN"))
                        session.close(CloseStatus.SERVICE_OVERLOAD)
                        null
                    } else {
                        SessionData(username = currentTeam.name, session = session, authenticated = true, userId = currentTeam.id)
                    }
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
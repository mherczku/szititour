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
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Component
class AdminSocketHandler constructor(@Autowired @Lazy private val userSocket: UserSocketHandler, private val teamService: TeamService, private val securityService: SecurityService) : BaseSocketHandler() {

    val logger: Logger = LoggerFactory.getLogger(AdminSocketHandler::class.java)

    var sessions: MutableMap<String, SessionData> = mutableMapOf()

    @Throws(InterruptedException::class, IOException::class)
    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {

        try {
            val chatMessage: ChatMessage = ObjectMapper().readValue(message.payload, ChatMessage::class.java)

            var sessionData = sessions[session.id]

            if (sessionData == null) {
                session.close(CloseStatus.NOT_ACCEPTABLE)
            } else {
                if(!sessionData.authenticated) {
                    sessionData = authenticate(session, chatMessage)
                    if(sessionData !== null) {
                        sessions[session.id] = sessionData
                        // sending infos:
                        val infos: List<String> = userSocket.sessions.map { it.value.username }
                        sendMessageTo(sessionData, ChatMessage(type = "INFO", info = infos))
                        sendMessageTo(sessionData, ChatMessage(content = "SUCCESS", type = "JOIN"))
                        return
                    } else {
                        return
                    }
                }
                chatMessage.sender = sessionData.username
            }


            chatMessage.sender = "ADMIN"

            // send admin messages (recipient only admin "én") to admins:
            if(chatMessage.recipient == "Én") {
                for (webSocketSession in sessions) {
                    if(webSocketSession.value.session.isOpen) {
                        sendMessageTo(webSocketSession.value, message)
                    }
                }
            }
            val recipient = userSocket.sessions.values.find { it.username == chatMessage.recipient }

            if(recipient != null && recipient.session.isOpen) {
                sendMessageTo(recipient, message)

                for (webSocketSession in sessions) {
                    if(webSocketSession.value.session.isOpen) {
                        sendMessageTo(webSocketSession.value, message)
                    }
                }
            }


        } catch (e: Exception) {
            logger.error("Websocket exception")
        }

    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        super.afterConnectionClosed(session, status)
        sessions.remove(session.id)
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        sessions[session.id] = SessionData("", -1, session, false)
    }

    private fun authenticate(session: WebSocketSession, chatMessage: ChatMessage): SessionData? {
        return if (chatMessage.type == "AUTH") {
            val token = chatMessage.token
            val verification = securityService.verifyToken(token)
            if (verification.verified) {
                val currentTeam = teamService.getTeamById(verification.teamId)
                if(currentTeam.role == ROLE_ADMIN) {

                    // Already has open connection:
                    val alreadySession = sessions.values.find { it.userId == currentTeam.id }
                    if(alreadySession != null && alreadySession?.session.isOpen) {
                        sendMessageTo(session, ChatMessage(type = "ALREADY_OPEN"))
                        session.close(CloseStatus.SERVICE_OVERLOAD)
                        null
                    } else {
                        sessions.remove(alreadySession?.session?.id)
                        SessionData(username = currentTeam.name, session = session, authenticated = true, userId = currentTeam.id)
                    }

                } else {
                    null
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
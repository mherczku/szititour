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
class AdminSocketHandler constructor(@Autowired @Lazy private val userSocket: UserSocketHandler, private val teamService: TeamService, private val securityService: SecurityService) : TextWebSocketHandler() {
    var sessions: MutableMap<String, SessionData> = mutableMapOf()

    @Throws(InterruptedException::class, IOException::class)
    public override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        println("Admin wrote text $message - payload: ${message.payload} : ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")

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
                        val text = ObjectMapper().writeValueAsString(ChatMessage(type = "INFO", info = infos))
                        session.sendMessage(TextMessage(text))
                        return
                    } else {
                        return
                    }
                }
                chatMessage.sender = sessionData.username
            }


            chatMessage.sender = "ADMIN"

            println("SENDING ADMIN MESSAGE TO RECIPIENT")
            userSocket.sessions.values.find { it.username == chatMessage.recipient }?.session?.sendMessage(message)
            //userSocket.sessions[chatMessage.recipient]?.session?.sendMessage(message)

            for (webSocketSession in sessions) {

                println("sending admin message to admins: $message")
                webSocketSession.value.session.sendMessage(message)

            }
        } catch (e: Exception) {
            println("Websocket exception while in admin socket:")
            e.printStackTrace()
        }

    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        super.afterConnectionClosed(session, status)
        sessions.remove(session.id)
    }

    @Throws(Exception::class)
    override fun afterConnectionEstablished(session: WebSocketSession) {
        println("conn est: ${session.id} : ${session.remoteAddress} : ${session.attributes} ---")
        //the messages will be broadcasted to all users.
        sessions[session.id] = SessionData("", session, false)
    }

    private fun authenticate(session: WebSocketSession, chatMessage: ChatMessage): SessionData? {
        return if (chatMessage.type == "AUTH") {
            val token = chatMessage.token
            val verification = securityService.verifyToken(token)
            if (verification.verified) {
                val currentTeam = teamService.getTeamById(verification.teamId)
                if(currentTeam.role == ROLE_ADMIN) {
                    SessionData(username = currentTeam.name, session = session, authenticated = true)
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
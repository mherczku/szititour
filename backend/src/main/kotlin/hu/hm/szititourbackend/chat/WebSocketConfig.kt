package hu.hm.szititourbackend.chat

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Lazy
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry

@Configuration
@EnableWebSocket
class WebSocketConfig(@Autowired @Lazy private val userSocket: UserSocketHandler, @Lazy private val adminSocket: AdminSocketHandler) : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(adminSocket, "/ws/admin").setAllowedOrigins("*")
        registry.addHandler(userSocket, "/ws/user").setAllowedOrigins("*")
    }
}
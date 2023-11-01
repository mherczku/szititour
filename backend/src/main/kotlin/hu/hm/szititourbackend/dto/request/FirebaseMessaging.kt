package hu.hm.szititourbackend.dto.request

abstract class AppNotification(
        open val title: String = "",
        open val message: String = ""
) {
        open fun isValid(): Boolean {
                return (title.isNotBlank() && message.isNotBlank())
        }
}

data class TopicNotification(
        val topic: String = "",
        override val title: String = "",
        override val message: String = ""
): AppNotification(title, message) {
        override fun isValid(): Boolean {
                return (super.isValid() && topic.isNotBlank())
        }
}

data class DirectNotification(
        val target: String = "",
        override val title: String = "",
        override val message: String = ""
): AppNotification(title, message) {
        override fun isValid(): Boolean {
                return (super.isValid() && target.isNotBlank())
        }
}

data class SubscriptionRequest(
        val subscriber: String = "",
        val topic: String = ""
)

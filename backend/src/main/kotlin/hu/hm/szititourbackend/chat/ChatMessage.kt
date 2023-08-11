package hu.hm.szititourbackend.chat


data class ChatMessage (
    var content: String = "",
    var sender: String = "",
    var recipient: String = "",
    var type: String = "MSG", // INFO MSG AUTH
    var info: List<String> = mutableListOf(),
    var token: String = ""
)
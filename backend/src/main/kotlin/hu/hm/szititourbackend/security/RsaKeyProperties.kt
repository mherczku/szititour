package hu.hm.szititourbackend.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import java.security.interfaces.RSAPrivateKey
import java.security.interfaces.RSAPublicKey

@ConfigurationProperties(prefix = "rsa")
class RsaKeyProperties {
    @Value("\${rsa.private-key}")
    var rsaPrivateKey: RSAPrivateKey? = null

    @Value("\${rsa.public-key}")
    var rsaPublicKey: RSAPublicKey? = null
}
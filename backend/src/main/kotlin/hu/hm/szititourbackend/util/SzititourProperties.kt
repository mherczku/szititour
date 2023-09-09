package hu.hm.szititourbackend.util

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.core.io.Resource

@ConfigurationProperties()
class SzititourProperties {

    @Value("classpath:/templates/welcome.template.html")
    var welcomeTemplate: Resource? = null
}
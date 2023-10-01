package hu.hm.szititourbackend.util

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.core.io.Resource

@ConfigurationProperties()
class SzititourProperties {

    @Value("classpath:templates/welcome.template.html")
    var welcomeTemplate: Resource? = null

    @Value("classpath:templates/email-update.template.html")
    var emailUpdateTemplate: Resource? = null

    @Value("classpath:templates/password-updated.template.html")
    var passwordUpdatedTemplate: Resource? = null

    @Value("classpath:templates/password-forgot.template.html")
    var passwordForgotTemplate: Resource? = null

    @Value("classpath:templates/password-modify.template.html")
    var passwordModifyTemplate: Resource? = null

    @Value("classpath:templates/team-delete.template.html")
    var teamDeleteTemplate: Resource? = null


}
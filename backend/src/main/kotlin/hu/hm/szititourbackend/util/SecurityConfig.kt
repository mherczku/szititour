import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfig(
/*    private val mfaLoginSuccessHandler: MfaLoginSuccessHandler,
    private val passwordEncoder: PasswordEncoder,
    private val userService: UserService*/
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        val excluded = arrayOf(
            "/oauth/clients",
            "/oauth/clients/**",
            "/oauth/openid/userinfo",
            "/oauth/resource",
            "/oauth/resource/user/validate",
            "/oauth/token",
            "/oauth/token/**",
            "/user/register",
            "/.well-known/**"
        )

        http
            .authorizeRequests()
            .antMatchers("/css/**", "/js/**").permitAll()
            .antMatchers(*excluded).permitAll()
            .antMatchers("/user/login/mfa").hasRole("PRE_MFA_AUTH")
            .anyRequest().hasRole("USER")
            .and()
            .csrf()
            .ignoringAntMatchers(*excluded)
            .and()
            .formLogin()
            .loginPage("/user/login")
            .loginProcessingUrl("/user/login")
            .usernameParameter("username")
            .passwordParameter("password")
            /*.successHandler(mfaLoginSuccessHandler)*/
            .permitAll()
            .and()
            .logout()
            .permitAll()
    }

    /*override fun configure(auth: AuthenticationManagerBuilder) {
        auth
            .userDetailsService(userService)
            .passwordEncoder(passwordEncoder)
    }*/
}

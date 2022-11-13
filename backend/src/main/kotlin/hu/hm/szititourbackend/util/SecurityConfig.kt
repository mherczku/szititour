import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


/*
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
*/
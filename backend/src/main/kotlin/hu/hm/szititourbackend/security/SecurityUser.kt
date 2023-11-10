package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.util.AuthUtil
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails


class SecurityUser(private val team: Team) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val auths: MutableList<SimpleGrantedAuthority> = ArrayList()
        auths.add(SimpleGrantedAuthority(team.role))
        return auths
    }

    override fun getPassword(): String {
        return team.password
    }

    override fun getUsername(): String {
        return team.email
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        if(!team.enabled) {
            AuthUtil.currentError = MessageConstants.TEAM_INACTIVE
        }
        return team.enabled
    }
}
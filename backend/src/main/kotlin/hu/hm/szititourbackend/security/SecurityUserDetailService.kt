package hu.hm.szititourbackend.security

import hu.hm.szititourbackend.repository.TeamRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class SecurityUserDetailService(private val teamRepository: TeamRepository): UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        return teamRepository.findByEmail(email)
            .map { SecurityUser(it) }
            .orElseThrow { UsernameNotFoundException("Team not found: $email") }
    }
}
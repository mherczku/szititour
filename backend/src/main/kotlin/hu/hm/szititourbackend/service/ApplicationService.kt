package hu.hm.szititourbackend.service
import hu.hm.szititourbackend.dto.ApplicationDto
import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.datamodel.convertToDto
import hu.hm.szititourbackend.repository.ApplicationRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp
import java.util.*

@Service
@Transactional
class ApplicationService @Autowired constructor(private val applicationRepository: ApplicationRepository){

    fun createApplication(gameId: Int, teamId: Int) {
        val application = Application(team = Team(id=teamId), game = Game(id = gameId), isAccepted = null)
        addApplication(application)
    }

    fun addApplication(application: Application): Application {
        application.isAccepted = null
        application.createdAt = Timestamp(System.currentTimeMillis())
        application.updatedAt = Timestamp(System.currentTimeMillis())
        return applicationRepository.save(application)
    }

    fun getAllApplications() : MutableList<ApplicationDto>{
        val apps = applicationRepository.findAll()
        val dtos = mutableListOf<ApplicationDto>()
        apps.forEach {
            dtos.add(it.convertToDto())
        }
        return dtos
    }

    fun getApplicationById(id :Int): Optional<Application> {
        return applicationRepository.findById(id)
    }

    fun updateApplication(application: Application): Application {
        application.updatedAt = Timestamp(System.currentTimeMillis())
        return applicationRepository.save(application)
    }

    fun deleteApplicationById(id: Int) {
        return applicationRepository.deleteById(id)
    }

}
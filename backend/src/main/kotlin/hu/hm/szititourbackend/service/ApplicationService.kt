package hu.hm.szititourbackend.service

import hu.hm.szititourbackend.datamodel.Application
import hu.hm.szititourbackend.datamodel.Game
import hu.hm.szititourbackend.datamodel.Team
import hu.hm.szititourbackend.exception.CustomException
import hu.hm.szititourbackend.repository.ApplicationRepository
import hu.hm.szititourbackend.util.MessageConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp

@Service
@Transactional
class ApplicationService @Autowired constructor(private val applicationRepository: ApplicationRepository) {

    fun createApplication(gameId: Int, teamId: Int): Application {
        val application = Application(team = Team(id = teamId), game = Game(id = gameId), accepted = null)
        return addApplication(application)
    }

    fun addApplication(application: Application): Application {
        application.accepted = null
        application.createdAt = Timestamp(System.currentTimeMillis())
        application.updatedAt = Timestamp(System.currentTimeMillis())
        return applicationRepository.save(application)
    }

    fun getAllApplications(): MutableList<Application> {
        return applicationRepository.findAll()
    }

    fun getApplicationById(id: Int): Application {
        val application = applicationRepository.findById(id)
        if (application.isPresent) {
            return application.get()
        } else {
            throw CustomException("Application not found", HttpStatus.NOT_FOUND, MessageConstants.APPLICATION_NOT_FOUND)
        }
    }

    fun updateApplication(application: Application): Application {
        getApplicationById(application.id)
        application.updatedAt = Timestamp(System.currentTimeMillis())
        return applicationRepository.save(application)
    }

    fun deleteApplicationById(id: Int) {
        return applicationRepository.deleteByIdCustom(id)
    }

}
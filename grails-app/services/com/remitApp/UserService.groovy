package com.remitApp

import com.remitapp.CustomException
import com.remitapp.RolesEnum
import com.remitapp.VerificationToken
import com.remitapp.um.Role
import com.remitapp.um.User
import com.remitapp.um.UserRole
import grails.gorm.transactions.Transactional

import java.text.DateFormat
import java.text.SimpleDateFormat

@Transactional
class UserService {

    def emailService
    def utilsService

    static DateFormat df = new SimpleDateFormat("yyyy-MM-dd")

    def loginUser(def username) {
        User user = User.findByUsernameAndEnabled(username,true)
        return User.collectClosure(user)
    }

    def create(def username, def password){
        User user = null
        try{
            user = new User()
            if(User.findByUsername(username)){
                throw new CustomException("Username already exists.")
            }
            user.username = username
            user.password = password
            user.enabled = false
            if(user.hasErrors()){
                log.error(user.getErrors())
                throw new Exception("Error Occurred!")
            }
            user.save(flush:true, failOnError : true)
            updateRolesToUser(user, [RolesEnum.ROLE_USER])
        }catch(CustomException e){
            throw new CustomException(e.message)
        }
        catch(e){
            log.error("Error occurred! $e")
            deleteUserAndItsAssociations(user)
            throw new Exception("Error Occurred!")
        }
        return User.collectClosure(user)
    }

    @Transactional
    def deleteUserAndItsAssociations(def userId){
        User user = User.get(userId)
        if(user){
            UserRole.findAllByUser(user)*.delete(flush: true,failOnError: true)
            VerificationToken.findAllByUser(user)*.delete(flush: true,failOnError: true)
            user.delete(flush: true, failOnError: true)
            return true
        }else{
            return false
        }
    }

    def updateRolesToUser(User user, def authorities){
        authorities?.each{authority->
            Role role = Role.findByAuthority(authority)
            if(!role)
                role = new Role()
            role.authority = authority
            role.save(flush:true, failOnError: true)
            UserRole userRole = UserRole.findByRoleAndUser(role,user)
            if(!userRole){
                userRole = new UserRole()
            }
            userRole.user = user
            userRole.role = role
            userRole.save(flush:true, failOnError: true)
        }
    }

    def sendVerificationToken(def username){
        User user = User.findByUsername(username)
        VerificationToken verificationToken = VerificationToken.findByUser(user)
        if(!verificationToken || verificationToken.expiryDate > new Date()){
            if(verificationToken)
                verificationToken.delete(flush: true)
            verificationToken = new VerificationToken()
        }

        String token = utilsService.getRandomNumberOf4Digit()
        verificationToken.token = token
        verificationToken.user = user
        def result = emailService.sendVerificationEmail(token,user)
        if(result){
            verificationToken.save(flush:true, failOnError:true)
            return true
        }else{
            deleteUserAndItsAssociations(user.id)
            return null
        }
    }

    def validateToken(def token, User user){
        if(!user)
            throw new CustomException("User not found. Please sign up to create new user")
        VerificationToken verificationToken = VerificationToken.findByTokenAndUser(token,user)
        if(!verificationToken)
            throw new CustomException("Invalid token!")
        if(verificationToken.expiryDate < new Date()){
            verificationToken.delete(flush:true, failOnError: true)
            return null
        }
        return verificationToken
    }

    def verifyUser(def token, def username){
        User user = User.findByUsername(username)
        VerificationToken verificationToken = null
        try{
            verificationToken = validateToken(token,user)
            if(verificationToken){
                user.enabled = true
                user.save(flush: true, failOnError : true)
                verificationToken.delete(flush: true, failOnError: true)
                return true
            }else{
                return "expired"
            }
        }catch(CustomException e){
            throw e
        }
    }
}

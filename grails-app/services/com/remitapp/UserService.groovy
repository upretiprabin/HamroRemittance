package com.remitapp

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
    def springSecurityService

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
            Customer customer = Customer.findByEmailAddress(user.username)
            CustomerAddress.findAllByCustomer(customer)*.delete(flush:true, failOnError: true)
            BankDetails.findAllByCustomer(customer)*.delete(flush:true, failOnError: true)
            Customer.findAllByEmailAddress(user.username)*.delete(flush: true, failOnError: true)
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

    def resetPassword(def resetCode, def password){
        if(!resetCode)
            throw new CustomException("Reset code cannot be null")
        VerificationToken verificationToken = VerificationToken.findByToken(resetCode)
        if(!verificationToken)
            throw new CustomException("Invalid reset code!")
        if(verificationToken && verificationToken.expiryDate < new Date())
            throw new CustomException("Token expired!")
        password = getDecodedPassword(password)
        User user = User.get(verificationToken.user.id)
        user.password = password
        if(user.save(flush : true)){
            verificationToken.delete(flush: true)
            return true
        }else{
            return null
        }

    }

    def sendForgotPasswordEmail(def email){
        User user = User.findByUsername(email)
        if(!user)
            throw new CustomException("User not registered with provided email.")
        VerificationToken verificationToken = getVerificationToken(user, true)
        def result = emailService.sendVerificationEmail(verificationToken?.token,user,true)
        if(result){
            verificationToken.save(flush:true, failOnError: true)
            return true
        }
        else{
            verificationToken.delete(flush:true, failOnError: true)
            return null
        }
    }

    def getVerificationToken(User user, boolean isReset){
        VerificationToken verificationToken = VerificationToken.findByUserAndIsReset(user,isReset)
        if(!verificationToken || verificationToken.expiryDate < new Date()){
            if(verificationToken)
                verificationToken.delete(flush: true)
            verificationToken = new VerificationToken()
        }

        String token = utilsService.getRandomNumberOf4Digit()
        verificationToken.token = token
        verificationToken.user = user
        if(isReset)
            verificationToken.isReset = true
        return verificationToken
    }

    def sendVerificationToken(def username){
        User user = User.findByUsername(username)
        VerificationToken verificationToken = getVerificationToken(user, false)
        def result = emailService.sendVerificationEmail(verificationToken?.token,user,false)
        if(result){
            verificationToken.save(flush:true, failOnError:true)
            return true
        }else{
            deleteUserAndItsAssociations(user.id)
            return null
        }
    }

    def validateToken(def token, User user, boolean isReset){
        if(!user)
            throw new CustomException("User not found. Please sign up to create new user")
        VerificationToken verificationToken = VerificationToken.findByTokenAndUserAndIsReset(token,user,isReset)
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
            verificationToken = validateToken(token,user,false)
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

    def checkUser(def username, def password){
        User user = User.findByUsername(username)
        if(!user){
            throw new CustomException("Invalid username or password!")
        }
        if(!validatePassword(getDecodedPassword(password),user))
            throw new CustomException("Invalid username or password!")
        if(!user.enabled)
            throw new CustomException("You must confirm your account first before logging in. Please check your email (including spam folders) for a confirmation email message.")
        if(user.accountLocked)
            throw new CustomException("Account locked!")
        if(user.accountExpired)
            throw new CustomException("Account expired!")
    }

    def validatePassword(password,user){
        return springSecurityService.passwordEncoder.isPasswordValid(user.password,password,null)
    }

    def getDecodedPassword(def encoded){
        byte[] decoded = encoded.decodeBase64()
        return new String(decoded)
    }

    def changePassword(params){
        def result = [:]
        def oldPassword = params.oldPassword
        def newPassword = params.newPassword
        def username = params.username
        User user = User.findByUsername(username)
        if(!user){
            throw new CustomException("Invalid user!")
        }
        if(!validatePassword(getDecodedPassword(oldPassword),user))
            throw new CustomException("Invalid username or password!")
        else{
            user.password = getDecodedPassword(newPassword)
            user.save(flush: true, failOnError: true)
            result.message = "Password Changed Successfully."
        }
        return result
    }
}

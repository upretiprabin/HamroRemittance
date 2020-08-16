package com.remitapp

import com.remitapp.um.User
import grails.core.GrailsApplication
import grails.gorm.transactions.Transactional

@Transactional
class EmailService {

    def mailService
    GrailsApplication grailsApplication

    def emailSubject(isReset){
        def subject = "Verification Code for Hamro Remittance"
        if(isReset)
            subject = "Password reset code for Hamro Remittance"
        return subject
    }

    def emailBody(isReset,token){
        def body = "Verification Code for Hamro Remittance : ${token}"
        if(isReset)
            body = "Please click this link http://127.0.0.1:3000/reset-password?reset-code=${token}"
        return body
    }

    def sendVerificationEmail(String token, User user, isReset) {
        def senderEmail = grailsApplication.config.getProperty('grails.mail.username')
        try{
            mailService.sendMail {
                to user.username
                from senderEmail
                subject emailSubject(isReset)
                body emailBody(isReset,token)
            }
            return true
        }catch(e){
            log.error(e.message)
            return false
        }
    }
}

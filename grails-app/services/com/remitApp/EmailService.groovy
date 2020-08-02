package com.remitapp

import com.remitapp.um.User
import grails.gorm.transactions.Transactional

@Transactional
class EmailService {

    def mailService

    def sendVerificationEmail(String token, User user) {
        try{
            mailService.sendMail {
                to user.username
                from user.username
                subject "Verification Code for Hamro Remittance"
                body "Your verification code is $token"
            }
            return true
        }catch(e){
            log.error(e.message)
            return false
        }
    }
}

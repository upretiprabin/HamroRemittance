package com.remitapp

import com.remitapp.um.User
import grails.core.GrailsApplication
import grails.gorm.transactions.Transactional
import org.springframework.web.context.request.RequestContextHolder

@Transactional
class EmailService {

    def mailService
    GrailsApplication grailsApplication

    def emailSubject(isReset){
        def subject = "Verification Code for Hamro Remittance"
        if(isReset)
            subject = "Password Reset Code for Hamro Remittance"
        return subject
    }

    def emailBody(isReset,token){
        def body = "Verification Code for Hamro Remittance : ${token}"
        if(isReset)
        {
            def request   = RequestContextHolder.getRequestAttributes().getRequest()
            def protocol  = request.isSecure() ?  "https://" : "http://"
            def domain = request?.getHeader('Host')
            def finaUrl = protocol+domain+"/reset-password?reset-code=${token}"
            println "finaUrl === $finaUrl"
            body = "Please click this link ${finaUrl}"

        }
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

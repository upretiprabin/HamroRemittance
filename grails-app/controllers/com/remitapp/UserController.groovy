package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class UserController {

    def userService
    def springSecurityService

    def login(){
        def username = springSecurityService.principal?.username
        def user = userService.loginUser(username)
        log.info("User logged in. Username: ${user.username}")
        render (['result':user] as JSON)
    }

    //TODO implement session handling
    def checkSession(){
        def username = springSecurityService.principal?.username
        render (['result':username] as JSON)
    }

    def logout(){
        session.invalidate()
        render (["result":"User logged out"] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def sendForgotPasswordEmail(){
        def requestJSON = request.JSON
        def email = requestJSON.email
        def result = null
        if(!email){
            render(["Error" : "Invalid parameters"] as JSON)
            return
        }
        try{
            result = userService.sendForgotPasswordEmail(email)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(Exception e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
        if(result){
            render (['result':"Forgot password email sent"] as JSON)
        }else{
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def create(){
        def requestJson = request.JSON
        def username = requestJson.username
        def password = requestJson.password
        def result = null
        try{
            def user = userService.create(username, password)
            if(user)
                result = userService.sendVerificationToken(username)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result)
            render (['result':result] as JSON)
        else
            render (["Error" : "Error Occurred! Please check logs."] as JSON)

    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def sendVerificationCode(){
        def requestJson = request.JSON
        def username = requestJson.username
        def result = null
        try{
            result = userService.sendVerificationToken(username)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result)
            render (['result':result] as JSON)
        else
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
    }

    def delete(){
        def requestJson = request.JSON
        def userId = requestJson.id
        def result = null
        try{
            result = userService.deleteUserAndItsAssociations(userId)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':result] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def verifyUser(){
        def requestJson = request.JSON
        def verificationToken = requestJson.token
        def username = requestJson.username
        def result = null
        try{
            result = userService.verifyUser(verificationToken,username)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result == "expired"){
            render (["Error" : "Token already expired!"] as JSON)
            return
        }

        render (['result':result] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def isUserEnabled(){
        def requestJson = request.JSON
        def username = requestJson.username
        def password = requestJson.password
        def result = null
        try{
            result = userService.checkUser(username,password)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':result] as JSON)
    }
}

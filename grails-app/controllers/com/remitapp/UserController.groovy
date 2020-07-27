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

    def logout(){
        session.invalidate()
        render (["result":"User logged out"] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def create(){
        def requestJson = request.JSON
        def username = requestJson.username
        def password = requestJson.password
        def user = null
        try{
            user = userService.create(username, password)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':user] as JSON)
    }
}

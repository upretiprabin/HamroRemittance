package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class UserController {

    def userService

    def login(){
        def requestJson = request.JSON
        def username = requestJson.username
        def user = userService.loginUser(username)
        log.info("User logged in. Username: ${user.username}")
        render user as JSON
    }

    def logout(){
        session.invalidate()
        render (["result":"User logged out"] as JSON)
    }
}

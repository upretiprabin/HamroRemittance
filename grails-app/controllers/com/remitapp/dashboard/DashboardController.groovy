package com.remitapp.dashboard

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured('ROLE_ADMIN')
class DashboardController {

    def springSecurityService

    def getData(){
        def user = springSecurityService.principal
        def testData = ['a':1]
        render testData as JSON
    }
}

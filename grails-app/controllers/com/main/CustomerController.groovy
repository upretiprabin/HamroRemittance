package com.main

import grails.converters.JSON


class CustomerController {
    def customerService

    def index() {
        def customers = customerService.getAllCustomers()
        println "{customers as JSON} = ${customers as JSON}"
    }

    def saveCustomer(params){
        customerService.saveCustomer(params)
    }

    def getCustomer(params){
        customerService.getCustomer(params.id)
    }

}

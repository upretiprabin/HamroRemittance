package com.remitApp

import com.remit.Customer

//import grails.gorm.transactions.Transactional
//import grails.transaction.Transactional

//@Transactional
class CustomerService {

    def saveCustomer(params){
        def customer = new Customer();
        customer.firstName = params.firstName
        customer.lastName = params.lastName
        customer.mobileNum = params.mobileNum
        customer.emailAddress = params.emailAddress
        customer.save(flush: true, failOnError: true)
    }

    def getCustomer(paramsId){
        def customer = Customer.findById(paramsId)
        return customer
    }

    def getAllCustomers(){
        def allCustomers = Customer.list()
        return allCustomers
    }

    def updateCustomer(params) {
        def customer = Customer.findById(params.id)
        customer.firstName = params.firstName
        customer.lastName = params.lastName
        customer.mobileNum = params.mobileNum
        customer.emailAddress = params.emailAddress
        customer.save(flush: true, failOnError: true)
    }

    def deleteCustomer(customerId){
        def customer = Customer.findById(customerId)
        if(customer)
            customer.delete(failOnError: true, flush:  true)
    }
}

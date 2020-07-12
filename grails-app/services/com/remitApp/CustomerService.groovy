package com.remitApp

import com.remit.Customer
import com.remit.Receiver
import com.remit.Sender

//import grails.gorm.transactions.Transactional
//import grails.transaction.Transactional

//@Transactional
class CustomerService {

    def saveCustomer(params){
        def customer = new Customer();
        customer.firstName = params?.firstName
        customer.middleName = params?.middleName
        customer.lastName = params.lastName
        customer.phoneNumber = params.phoneNumber
        customer.password = params.password
        customer.dateOfBirth = params.dateOfBirth
        customer.nationality = params.nationality
        customer.emailAddress = params.emailAddress
        customer.save(flush: true, failOnError: true)a

        if(params?.sender){
            addSender(customer)
        }else if(params?.receiver){
            addReceiver(customer);
        }
    }

    def addSender(Customer customer){
        Sender sender = new Sender()
        sender.customer = customer
        sender.save(flush: true, failOnError: true)
    }

    def addReceiver(Customer customer){
        Receiver receiver = new Receiver()
        receiver.customer = customer
        receiver.save(failOnError: true, flush: true)
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
        customer.firstName = params?.firstName
        customer.middleName = params?.middleName
        customer.lastName = params.lastName
        customer.phoneNumber = params.phoneNumber
        customer.password = params.password
        customer.dateOfBirth = params.dateOfBirth
        customer.nationality = params.nationality
        customer.emailAddress = params.emailAddress
        customer.save(flush: true, failOnError: true)
    }

    def deleteCustomer(customerId){
        def customer = Customer.findById(customerId)
        if(customer)
            customer.delete(failOnError: true, flush:  true)
    }
}

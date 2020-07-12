package com.remitApp

import com.remit.Customer
import com.remit.Receiver
import com.remit.Sender

//import grails.gorm.transactions.Transactional
//import grails.transaction.Transactional

//@Transactional
class CustomerService {
    def commonService

    def saveCustomer(params){
        def result = [:]

        //check email
        def alreadyPresent = Customer.findByEmailAddress(params.emailAddress)
        if(!alreadyPresent){
            if(params?.sender){
                addSender(params)
            }else if(params?.receiver){
                addReceiver(params);
            }
            result["success"] = "Saved successfully."
        }else{
            result["error"] = "Email Address already registered."
        }
        return result
    }

    def addSender(def params){
        def dob = commonService.getFormattedDate(params.dateOfBirth)
        println "dob ==== $dob"
        Sender sender = new Sender()
        sender.firstName = params?.firstName
        sender.middleName = params?.middleName
        sender.lastName = params.lastName
        sender.phoneNumber = params.phoneNumber
        sender.password = params.password
        sender.dateOfBirth = dob
        sender.nationality = params.nationality
        sender.emailAddress = params.emailAddress
        sender.save(flush: true, failOnError: true)
    }

    def addReceiver(def params){
        def dob = commonService.getFormattedDate(params.dateOfBirth)
        Receiver receiver = new Receiver()
        receiver.firstName = params?.firstName
        receiver.middleName = params?.middleName
        receiver.lastName = params.lastName
        receiver.phoneNumber = params.phoneNumber
        receiver.password = params.password
        receiver.dateOfBirth = dob
        receiver.nationality = params.nationality
        receiver.emailAddress = params.emailAddress
        receiver.senderId = params.senderId
        receiver.relationshipToSender = params.relationshipToSender
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

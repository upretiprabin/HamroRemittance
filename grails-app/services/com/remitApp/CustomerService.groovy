package com.remitApp

import com.remitapp.BankDetails
import com.remitapp.Customer
import com.remitapp.Receiver
import com.remitapp.Sender

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
            def customer
            if(params?.sender){
                customer = addSender(params)
            }else if(params?.receiver){
                customer = addReceiver(params);
            }
            result["message"] = "Saved successfully."
            result["customer"] = customer
        }else{
            result["error"] = "Email Address already registered."
        }
        return result
    }

    def updateCustomer(params){
        def result = [:]
        try{
            def customer
            if(params?.sender){
                customer = updateSender(params)
            }else if(params?.receiver){
                customer = updateReceiver(params);
            }
            result["message"] = "Saved successfully."
            result["customer"] = customer
        }catch(Exception ex){
            ex.printStackTrace()
            result["error"] = "Error occurred while saving.."
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
        return sender
    }

    def updateSender(def params){
        def dob = commonService.getFormattedDate(params.dateOfBirth)
        println "dob ==== $dob"
        Sender sender = Sender.findById(params.customerId)
        sender.firstName = params?.firstName
        sender.middleName = params?.middleName
        sender.lastName = params.lastName
        sender.phoneNumber = params.phoneNumber
        sender.password = params.password
        sender.dateOfBirth = dob
        sender.nationality = params.nationality
        sender.emailAddress = params.emailAddress
        sender.save(flush: true, failOnError: true)
        return sender
    }

    def addReceiver(def params){
        Receiver receiver = new Receiver()
        receiver.firstName = params?.firstName
        receiver.middleName = params?.middleName
        receiver.lastName = params.lastName
        receiver.phoneNumber = params.phoneNumber
        receiver.emailAddress = params.emailAddress
        receiver.senderId = params.senderId
        receiver.relationshipToSender = params.relationshipToSender
        receiver.save(failOnError: true, flush: true)
        return receiver
    }

    def updateReceiver(def params){
        Receiver receiver = Receiver.findById(params.customerId)
        receiver.firstName = params?.firstName
        receiver.middleName = params?.middleName
        receiver.lastName = params.lastName
        receiver.phoneNumber = params.phoneNumber
        receiver.emailAddress = params.emailAddress
        receiver.senderId = params.senderId
        receiver.relationshipToSender = params.relationshipToSender
        receiver.save(failOnError: true, flush: true)
        return receiver
    }

    def getCustomer(paramsId){
        def customer = Customer.findById(paramsId)
        return customer
    }

    def getAllCustomers(){
        def allCustomers = Customer.list()
        return allCustomers
    }

    def deleteCustomer(customerId){
        def customer = Customer.findById(customerId)
        if(customer)
            customer.delete(failOnError: true, flush:  true)
    }
}

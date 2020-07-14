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

    def saveBankDetails(Customer customer, def params){
        def returnResult = [:]
        BankDetails bankDetails = new BankDetails()
        bankDetails.customer = customer
        bankDetails.bankName = params.bankName
        bankDetails.branchId = params.branchId
        bankDetails.accountNumber = params.accountNumber
        bankDetails.save(flush: true, failOnError: true)
        returnResult["message"] = "Bank Details successfully Saved."
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

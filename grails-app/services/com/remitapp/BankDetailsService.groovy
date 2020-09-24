package com.remitapp

import com.remitapp.BankDetails
import com.remitapp.Customer
import grails.gorm.transactions.Transactional

@Transactional
class BankDetailsService {

    def serviceMethod() {

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

    def updateBankDetails(Customer customer, def params){
        def returnResult = [:]
        println "{params.customerId} = ${params.customerId}"
        Customer customerToEdit = Customer.findById(params.customerId)
        BankDetails bankDetails = BankDetails.findByCustomer(customerToEdit)
        println "customer = $customer"
        bankDetails.customer = customer
        bankDetails.bankName = params.bankName
        bankDetails.branchId = params.branchId
        bankDetails.accountNumber = params.accountNumber
        bankDetails.save(flush: true, failOnError: true)
        returnResult["message"] = "Bank Details successfully Saved."
    }

    def deleteBankDetails(Customer customer){
        def bankDetails = BankDetails.findByCustomer(customer)
        if(bankDetails)
            bankDetails.delete(failOnError: true, flush:  true)

    }

    def getBankDetails(Customer customer){
        def returnVal = [:]
        def bankDetails = BankDetails.findByCustomer(customer)
        returnVal.bankName = bankDetails.bankName
        returnVal.branchId = bankDetails.branchId
        returnVal.accountNumber = bankDetails.accountNumber
        returnVal.dateCreated = bankDetails.dateCreated
        return returnVal
    }

    def saveRemitDetails(Customer customer, def params){
        def returnResult = [:]
        LocalRemitDetails remitDetails = new LocalRemitDetails()
        remitDetails.customer = customer
        remitDetails.remitName = params.remitName
        remitDetails.district = params.district
        remitDetails.phNumber = params.phNumber
        remitDetails.save(flush: true, failOnError: true)
        returnResult["message"] = "Remit Details successfully Saved."
    }
}

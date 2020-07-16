package com.remitApp

import com.remitapp.BankDetails
import com.remitapp.CashPickUp
import com.remitapp.CompanyCharges
import com.remitapp.Customer
import com.remitapp.CustomerAddress
import com.remitapp.OrderDetails
import com.remitapp.PayingAgentDetails
import com.remitapp.Receiver
import com.remitapp.Sender
import com.remitapp.Transaction
import grails.converters.JSON
import grails.gorm.transactions.Transactional

@Transactional
class TransactionService {

    def createNewTransactionAndOrder(params){
        def returnResult = [:]
        def sender = Sender.findById(params.senderId)
        def receiver = Receiver.findById(params.receiverId)
        if(sender == null || receiver == null){
            returnResult["error"] = "Sender or Receiver no found.."
        }else{
            Transaction transaction = new Transaction()
            transaction.sender = sender
            transaction.receiver = receiver
            transaction.subTotal = params.subTotal
            transaction.total = params.total
            transaction.exchangedTotal = params.exchangedTotal
            transaction.currency = params.currency
            transaction.customMessage = params.customMessage
            transaction.save(flush: true, failOnError: true)

            createNewOrder(params, transaction)
            returnResult["message"] = "Successfully Saved.."
        }

        return returnResult
    }

    def createNewOrder(params, Transaction transaction){

        OrderDetails orderDetails = new OrderDetails()
        orderDetails.transaction = transaction
        orderDetails.comments = params.comments
        orderDetails.staffNotes = params.staffNotes
        orderDetails.emailOriginalCopy = params.emailOriginalCopy
        orderDetails.status = params.status
        orderDetails.trnNumber = params.trnNumber
        orderDetails.cashPickUpId = params.cashPickUpId
        orderDetails.transactionReason = params.transactionReason
        orderDetails.sourceOfFund = params.sourceOfFund
        orderDetails.payingAgentsId = params.payingAgentsId
        orderDetails.sendMoneyTo = params.sendMoneyTo

        orderDetails.save(flush: true, failOnError: true)

    }

    def getAllPayingAgents(){
        def payingAgentDetails = PayingAgentDetails.list()
        return payingAgentDetails
    }

    def getCashPickUpTypes(){
        def cashPickUpTypes = CashPickUp.list()
        return cashPickUpTypes
    }

    def getAllReceivers(def params){
        def returnMap = [:]
        def receivers = Customer.findAllBySenderId(params.senderId)
        if(receivers){
            receivers.eachWithIndex { receiver, index ->
                def receiverMap = [:]
                def address = getCustomerAddress(receiver)
                def bankDetails = getBankDetails(receiver)
                receiverMap.receiver = receiver
                receiverMap.address = address
                receiverMap.bankDetails = bankDetails

                returnMap.put(index,receiverMap)
            }
        }else{
            returnMap["error"] = "No receivers found."
        }
        println "returnMap = ${returnMap as JSON}"
        return returnMap
    }

    def getCustomerAddress(Customer customer){
        def address = CustomerAddress.findByCustomer(customer).address
        return address
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

    def getCompanyChargesDetails(){
        def companyCharges = CompanyCharges.list()
        return companyCharges
    }

    def getCompanyChargesByCountry(def params){
        def country = params.country
        def companyCharges = CompanyCharges.findByCountry(country)
        return companyCharges
    }
}

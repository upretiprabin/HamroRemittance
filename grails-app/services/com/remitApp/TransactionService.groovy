package com.remitApp

import com.remit.OrderDetails
import com.remit.PayingAgentDetails
import com.remit.Receiver
import com.remit.Sender
import com.remit.Transaction
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
        orderDetails.pickUpLocation = params.pickUpLocation
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
}

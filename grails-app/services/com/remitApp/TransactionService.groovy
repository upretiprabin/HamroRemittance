package com.remitApp

import com.remit.Order
import com.remit.Receiver
import com.remit.Sender
import com.remit.Transaction
import grails.gorm.transactions.Transactional

@Transactional
class TransactionService {

    def createNewTransactionAndOrder(params){
        def sender = Sender.findById(params.senderId)
        def receiver = Receiver.findById(params.receiverId)

        Transaction transaction = new Transaction()
        transaction.sender = sender
        transaction.receiver = receiver
        transaction.subTotal = params.subTotal
        transaction.total = params.total
        transaction.exchangedTotal = params.exachangeTotal
        transaction.currency = params.currency
        transaction.customMessage = params.customMessage
        transaction.save(flush: true, failOnError: true)

        createNewOrder(params, transaction)
    }

    def createNewOrder(params, Transaction transaction){

        Order order = new Order()
        order.transaction = transaction
        order.comments = params.comments
        order.staffNotes = params.staffNotes
        order.emailOriginalCopy = params.emailOriginalCopy
        order.status = params.status
        order.trnNumber = params.trnNumber
        order.pickUpLocation = params.pickUpLocation
        order.transactionReason = params.transactionReason
        order.sourceOfFund = params.sourceOfFund
        order.payingAgentId = params.payingAgentId
        order.sendMoneyTo = params.sendMoneyTo

        order.save(flush: true, failOnError: true)

    }
}

package com.remitapp.admin

import com.remitapp.CashPickUp
import com.remitapp.Customer
import com.remitapp.OrderDetails
import com.remitapp.Transaction
import grails.gorm.transactions.Transactional

@Transactional
class AdminService {
    def transactionService

    def serviceMethod() {

    }

    def getAllTransactionOrders() {
        def orderDetails = OrderDetails.list()
        def returnList = makeData(orderDetails)
        return returnList
    }

    def getAllTransactionOrdersByStatus(params) {
        println "params = $params"
        def returnList = []
        if (params.status) {
            def orderDetails = OrderDetails.findAllByStatus(params.status)
            returnList = makeData(orderDetails)
        }
        return returnList
    }

    def makeData(List<OrderDetails> orderDetails) {
        def returnList = []
        orderDetails.each { eachOrder ->
            def eachMap = [:]

            eachMap['orderDetailsId'] = eachOrder.id
            eachMap['sender'] = eachOrder.transaction.sender.firstName + " " +
                    eachOrder.transaction.sender.middleName + " " +
                    eachOrder.transaction.sender.lastName
            eachMap['dateCreated'] = eachOrder.dateCreated
            eachMap['status'] = eachOrder.status
            eachMap['total'] = eachOrder.transaction.total
            eachMap['currency'] = eachOrder.transaction.currency
            eachMap['trnNumber'] = eachOrder.trnNumber
            eachMap['receiver'] = eachOrder.transaction.receiver.firstName + " " +
                    eachOrder.transaction.receiver.middleName + " " +
                    eachOrder.transaction.receiver.lastName
            eachMap['exchangedTotal'] = eachOrder.transaction.exchangedTotal
            eachMap['location'] = CashPickUp.findById(eachOrder.cashPickUpId).type

            returnList.add(eachMap)
        }
        return returnList
    }

    def saveOrderDetailsStatus(orderDetailsId, status) {
        def returnList = []
        def orderDetailsToUpdate = OrderDetails.findById(orderDetailsId)
        if (orderDetailsToUpdate) {
            orderDetailsToUpdate.status = status
            orderDetailsToUpdate.save(flush: true, failOnError: true)
            returnList.add("Saved Successfully.")
        }
        return returnList
    }

    def saveOrderDetailsTrnValue(params) {
        def returnList = []
        def orderDetailsToUpdate = OrderDetails.findById(params.orderDetailsId)
        if (orderDetailsToUpdate) {
            orderDetailsToUpdate.trnNumber = params.trnNumber
            orderDetailsToUpdate.save(flush: true, failOnError: true)
            returnList.add("Saved Successfully.")
        }
        return returnList
    }

    def deleteTransactionOrderDetails(orderDetailsId) {
        def returnMessage = []
        def orderDetailsToDelete = OrderDetails.findById(orderDetailsId)
        if (orderDetailsToDelete) {
            Transaction transaction = orderDetailsToDelete.transaction
            orderDetailsToDelete.delete(flush: true, failOnError: true)
            transactionService.deleteTransaction(transaction)
            returnMessage.add("Deleted Successfully.")
        }
        return returnMessage
    }

    def getAllSenders() {
        def allSenders = Customer.findAllBySenderEmailAddressIsNull()
        println "allSenders = $allSenders"
        return allSenders
    }
}

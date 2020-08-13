package com.remitapp


import grails.gorm.transactions.Transactional

@Transactional
class TransactionService {
    def customerAddressService
    def bankDetailsService

    def createNewTransactionAndOrder(params){
        def returnResult = [:]
        def sender = Sender.findByEmailAddress(params.senderEmailAddress)
        def receiver = Receiver.findByEmailAddress(params.receiverEmailAddress)
        if(sender == null || receiver == null){
            returnResult["Error"] = "Sender or Receiver not found.."
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
        orderDetails.status = params.status?:"awaitingPayments"
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
        def returnList = []
        def receivers = Customer.findAllBySenderEmailAddress(params.senderEmailAddress)
        if(receivers){
            receivers.eachWithIndex { receiver, index ->
                def receiverMap = [:]
                def address = customerAddressService.getCustomerAddress(receiver)
                def bankDetails = bankDetailsService.getBankDetails(receiver)
                receiverMap.receiver = receiver
                receiverMap.address = address
                receiverMap.bankDetails = bankDetails
                returnList.add(receiverMap)
            }
        }else{
            return null
        }
        return returnList
    }

    def getCompanyChargesDetails(){
        def companyCharges = CompanyCharges.list()
        return companyCharges
    }

    def returnTransactionStatus(){
        def txnStatus = TransactionStatus.list()
        return txnStatus
    }

    def getCompanyChargesByCountry(def params){
        def country = params.country
        def companyCharges = CompanyCharges.findByCountry(country)
        return companyCharges
    }

    def deleteTransactions(Sender sender){
        def transactions = Transaction.findBySender(sender)
        if(transactions){
            transactions.each{ transaction ->
                deleteOrderDetails(transaction)
                deleteTransaction(transaction)
            }
        }
    }

    def deleteTransaction(Transaction transaction){
        transaction.delete(flush: true, failOnError:true)
        System.out.println("--deleteOrderDetails--transaction-")
    }

    def deleteOrderDetails(Transaction transaction){
        def orderDetails = OrderDetails.findByTransaction(transaction)
        if(orderDetails){
            orderDetails.delete(flush: true, failOnError: true)
        }
        System.out.println("--deleteOrderDetails---")
    }

    def deleteTransactionById(transactionParams){
        def returnMessage = [:]
        Transaction transaction = Transaction.findById(transactionParams?.transactionId)
        if(transaction){
            deleteOrderDetails(transaction)
            deleteTransaction(transaction)
            returnMessage['message'] = "Transaction successfully deleted."
        }
        return returnMessage
    }

    def getCustomerTransactions(trnParams){
        def returnList = []
        def transactions = Transaction.findAllBySender(Sender.findByEmailAddress(trnParams?.emailAddress))
        if(transactions){
            transactions.each { eachTxn ->
                def returnMap = [:]
                OrderDetails orderDetails = OrderDetails.findByTransaction(eachTxn)
                if(orderDetails){
                    returnMap.id = eachTxn.id
                    returnMap.total = eachTxn.total
                    returnMap.receiver = eachTxn.receiver.firstName +" "+eachTxn.receiver.middleName +" "+ eachTxn.receiver.lastName
                    returnMap.receiverEmail = eachTxn.receiver.emailAddress
                    returnMap.status = orderDetails.status
                }
                returnList.add(returnMap)
            }
        }
        println "returnMap = $returnList"
        return returnList
    }
}

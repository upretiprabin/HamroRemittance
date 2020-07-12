package com.main

class TransactionController {
    def transactionService

    def index() { }

    def saveTransaction(params){
        transactionService.createNewTransactionAndOrder(params)
    }
}

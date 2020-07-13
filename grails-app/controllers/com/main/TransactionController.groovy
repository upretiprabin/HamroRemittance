package com.main

import grails.converters.JSON

class TransactionController {
    def transactionService

    def index() { }

    def saveTransaction(){
        def transactionParams = request.JSON
        try{
            def result = transactionService.createNewTransactionAndOrder(transactionParams)
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }

    }

    def getPayingAgents(){
        try{
            def result = transactionService.getAllPayingAgents()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }
    }
}

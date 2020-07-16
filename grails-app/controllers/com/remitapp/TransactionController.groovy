package com.remitapp

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

    def getCashPickUpTypes(){
        try{
            def result = transactionService.getCashPickUpTypes()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }
    }

    def getReceivers(){
        def receiverParams = request.JSON
        try{
            def result = transactionService.getAllReceivers(receiverParams)
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }
    }

    def getCompanyCharges(){
        try{
            def result = transactionService.getCompanyChargesDetails()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }

    }

    def fetchCompanyCharges(){
        def countryParam = request.JSON
        try{
            def companyCharges = transactionService.getCompanyChargesByCountry(countryParam)
            render (["result":companyCharges] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }
    }

    def testData(){
        render ([result:true] as JSON)
    }
}

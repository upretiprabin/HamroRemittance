package com.remitapp

import grails.converters.JSON

class TransactionController {
    def transactionService

    def index() { }

    def saveTransaction(){
        def transactionParams = request.JSON
        println "transactionParams ==== $transactionParams"
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
        def result = null
        try{
            result = transactionService.getAllReceivers(receiverParams)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
            return
        }
        if(result)
            render(["result":result] as JSON)
        else
            render (["Error" : "No receiver found"] as JSON)
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

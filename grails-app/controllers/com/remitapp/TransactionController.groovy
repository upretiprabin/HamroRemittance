package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class TransactionController {
    def transactionService

    def index() { }

    def saveTransaction(){
        def transactionParams = params
        println "transactionParams ==== $transactionParams"
        def resourcePath = servletContext.getRealPath("/")
        try{
            def result = transactionService.createNewTransactionAndOrder(transactionParams,resourcePath)
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while saving transaction."] as JSON)
        }

    }

    def getPayingAgents(){
        try{
            def result = transactionService.getAllPayingAgents()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching paying agents."] as JSON)
        }
    }

    def getCashPickUpTypes(){
        try{
            def result = transactionService.getCashPickUpTypes()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching cash pick up types."] as JSON)
        }
    }

    def getReceivers(){
        def receiverParams = request.JSON
        def result = null
        try{
            result = transactionService.getAllReceivers(receiverParams)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching receivers list."] as JSON)
            return
        }
        if(result)
            render(["result":result] as JSON)
        else
            render (["Error" : "No receiver found"] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getCompanyCharges(){
        try{
            def result = transactionService.getCompanyChargesDetails()
            render (["result":result] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while getting company charges."] as JSON)
        }

    }

    def fetchCompanyCharges(){
        def countryParam = request.JSON
        try{
            def companyCharges = transactionService.getCompanyChargesByCountry(countryParam)
            render (["result":companyCharges] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching company charges."] as JSON)
        }
    }

    def deleteTransaction(){
        def transactionParams = request.JSON
        try{
            def result = transactionService.deleteTransactionById(transactionParams)
            if(result.message){
                render (["result":result] as JSON)
            }else{
                render (["Error": "No transaction found to delete."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while deleting transaction."] as JSON)
        }
    }

    def fetchTransactionStatus(){
        try{
            def result = transactionService.returnTransactionStatus()
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Transaction status not found in the database."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching transaction status."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def saveCompanyCharges(){
        def chargeParams = request.JSON
        try{
            transactionService.saveCompanyChargesByCountry(chargeParams)
            render (["result":"Saved Successfully."] as JSON)
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while saving company charges."] as JSON)
        }
    }

    def testData(){
        render ([result:true] as JSON)
    }
}

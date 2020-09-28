package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class PayingAgentsController {
    def payingAgentsService

    def index() { }

    def getPayingAgents(){
        try{
            def result = payingAgentsService.returnPayingAgents()
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Paying agents not found in the database."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching paying agents."] as JSON)
        }
    }

    def updatePayingAgentsForCustomerTxns(){
        def pgParams = request.JSON
        try{
            def result = payingAgentsService.savePayingAgentsStats(pgParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while saving paying agent value for transaction."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while saving paying agent value for transaction."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def createPayingAgent(){
        def pgParams = request.JSON
        try{
            def result = payingAgentsService.savePayingAgent(pgParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while creating paying agent."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while creating paying agent."] as JSON)
        }
    }
}

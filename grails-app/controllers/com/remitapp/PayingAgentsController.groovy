package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

class PayingAgentsController {
    def payingAgentsService

    def index() { }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
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

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
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

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def createPayingAgentTransaction(){
        def pgParams = request.JSON
        try{
            def result = payingAgentsService.savePayingAgentTransaction(pgParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while creating paying agents transaction."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while creating paying agents transaction."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getPayingAgentStatement(){
        def pgParams = request.JSON
        try{
            def result = payingAgentsService.getPayingAgentStatement(pgParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while fetching paying agents statement."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while fetching paying agents statement."] as JSON)
        }
    }
}

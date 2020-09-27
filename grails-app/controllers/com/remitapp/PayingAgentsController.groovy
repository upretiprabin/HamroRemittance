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
            println "result ---paying agents--- $result"
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
}

package com.remitapp

import grails.gorm.transactions.Transactional

@Transactional
class PayingAgentsService {

    def serviceMethod() {

    }

    def returnPayingAgents(){
        def payingAgents = PayingAgents.list()
        return payingAgents
    }

    def savePayingAgentsStats(params) {
        def returnList = []
        PayingAgentStatements payingAgentStatements = new PayingAgentStatements()
        PayingAgents payingAgents = PayingAgents.findById(params?.payingAgentsId)
        OrderDetails orderDetails = OrderDetails.findById(params.orderDetailsId)
        if (payingAgents && orderDetails) {
            payingAgentStatements.payingAgents = payingAgents
            payingAgentStatements.transactionId = orderDetails.transaction?.id
            payingAgentStatements.credit = orderDetails.transaction.total
            payingAgentStatements.save(flush: true, failOnError: true)
            returnList.add("Saved Successfully.")
        }
        return returnList
    }

    def savePayingAgent(params){
        def returnMap = [:]
        def returnMsg = []
        PayingAgents payingAgents = new PayingAgents()
        if(params.name){
            if(PayingAgents.findByName(params.name)){
                returnMsg.add("Paying agent with name $params.name already registered.")
                returnMap["error"] = returnMsg
            }else{
                payingAgents.name = params.name
                payingAgents.address = params.address
                payingAgents.save(flush: true, failOnError: true)
                returnMsg.add("Saved Successfully.")
                returnMap["result"] = returnMsg
            }
        }
        return returnMap
    }

    def savePayingAgentTransaction(params){
        def returnMap = [:]
        def returnMsg = []
        PayingAgents payingAgents = PayingAgents.findById(params.payingAgentsId)
        if(payingAgents){
            PayingAgentStatements payingAgentStatements = new PayingAgentStatements()
            payingAgentStatements.payingAgents = payingAgents
            payingAgentStatements.description = params.description
            if(params.transactionType == "receive"){
                payingAgentStatements.credit = params.amount
            }else if(params.transactionType == "payment"){
                payingAgentStatements.debit = params.amount
            }
            payingAgentStatements.save(flush: true, failOnError: true)
            returnMsg.add("Saved Successfully.")
            returnMap["result"] = returnMsg
        }else{
            returnMsg.add("Invalid paying agent.")
            returnMap["error"] = returnMsg
        }
        return returnMap
    }

    def getPayingAgentStatement(params){
        def returnMap = [:]
        def returnList = []
        PayingAgents payingAgents = PayingAgents.findById(params.payingAgentsId)
        if(payingAgents){
            def payingAgentStatements = PayingAgentStatements.findAllByPayingAgents(payingAgents)
            if(payingAgentStatements){
               def eachVal = [:]
                def index = 0
                payingAgentStatements.each { k->
                    def eachRecord = [:]
                    eachRecord["date"] = k.dateCreated
                    eachRecord["order"] = k.transactionId
                    eachRecord["descOrReceiver"] = k.description
                    eachRecord["debit"] = k.debit
                    eachRecord["credit"] = k.credit
                    eachRecord["balance"] = k.balance
                    eachVal[index] = eachRecord
                    index++
                }
                returnList.add(eachVal)
                returnMap["result"] = returnList
            }else{
                def returnMsg = "No records found for ${payingAgents.name}."
                returnMap["error"] = returnMsg
            }
        }else{
            def returnMsg ="Invalid paying agent."
            returnMap["error"] = returnMsg
        }
        return returnMap
    }
}

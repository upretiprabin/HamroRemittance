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
        Transaction transaction = Transaction.findById(params.transactionsId)
        if (payingAgents && transaction) {
            payingAgentStatements.payingAgents = payingAgents
            payingAgentStatements.transactionId = params.transactionsId
            payingAgentStatements.credit = transaction.total
            payingAgentStatements.save(flush: true, failOnError: true)
            returnList.add("Saved Successfully.")
        }
        return returnList
    }
}

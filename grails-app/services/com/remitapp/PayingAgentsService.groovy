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
}

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
}

package com.remitapp

class PayingAgentStatements {
    static belongsTo = [payingAgents: PayingAgents]
    String transactionId
    float debit
    float credit
    float balance
    String description
    Date dateCreated = new Date()

    static constraints = {
        transactionId(nullable: true, blank: true)
        debit(nullable: true, blank: true)
        credit(nullable: true, blank: true)
        balance(nullable: true, blank: true)
        description(nullable: true, blank: true)
    }
}

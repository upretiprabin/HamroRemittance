package com.remitapp

class PayingAgentStatements {
    static belongsTo = [payingAgents: PayingAgents]
    int transactionId
    float debit
    float credit
    float balance
    Date dateCreated = new Date()

    static constraints = {
        transactionId(nullable: true, blank: true)
        debit(nullable: true, blank: true)
        credit(nullable: true, blank: true)
        balance(nullable: true, blank: true)
    }
}

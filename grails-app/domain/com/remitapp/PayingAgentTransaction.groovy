package com.remitapp

class PayingAgentTransaction {
    String payingAgentDetailsId
    float debitAmount
    float creditAmount
    String amountType
    String remarks
    Date dateCreated = new Date()

    static constraints = {
    }

    static mapping = {
        remarks type: "text"
    }
}

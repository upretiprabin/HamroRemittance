package com.remit

class PayingAgentTransaction {
    String payingAgentDetailsId
    float debitAmount
    float creditAmount
    String amountType
    String remarks

    static constraints = {
    }

    static mapping = {
        remarks type: "text"
    }
}

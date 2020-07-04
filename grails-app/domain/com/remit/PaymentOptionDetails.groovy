package com.remit

class PaymentOptionDetails {
    String payingAgentId
    String remitName
    String remitAddress
    String bankName
    String branchAddress
    String accountName
    String accountNumber
    Date dateCreated = new Date()

    static constraints = {
        payingAgentId(nullable: false, blank: false)

    }
}

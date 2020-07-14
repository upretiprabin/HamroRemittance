package com.remitapp

class OrderDetails {

    static belongsTo = [transaction: Transaction]
    String comments
    String staffNotes
    Boolean emailOriginalCopy
    String status
    String trnNumber
    int cashPickUpId
    String transactionReason
    String sourceOfFund
    String payingAgentsId
    String sendMoneyTo
    Date dateCreated


    static constraints = {
        comments(nullable: true, balnk: true)
        staffNotes(nullable: true, balnk: true)
        emailOriginalCopy(nullable: true, balnk: true)
        status(nullable: true, balnk: true)
        trnNumber(nullable: true, balnk: true)
        cashPickUpId(nullable: true, balnk: true)
        transactionReason(nullable: true, balnk: true)
        sourceOfFund(nullable: true, balnk: true)
        payingAgentsId(nullable: true, balnk: true)
    }

    static mapping = {
        comments type: "text"
        staffNotes type: "text"
        transactionReason type: "text"
    }
}

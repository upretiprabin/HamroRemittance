package com.remit

class Order {

    static belongsTo = [transaction: Transaction]
    String comments
    String staffNotes
    Boolean emailOriginalCopy
    String status
    String trnNumber
    String pickUpLocation
    String transactionReason
    String sourceOfFund
    int payingAgentId
    Date dateCreated


    static constraints = {
    }

    static mapping = {
        comments type: "text"
        staffNotes type: "text"
        transactionReason type: "text"
    }
}

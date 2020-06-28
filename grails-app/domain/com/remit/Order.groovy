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
    static hasOne = [payingAgent:PayingAgent]
    Date dateCreated


    static constraints = {
    }

    static mapping = {
        staffNotes type: "text"
        transactionReason type: "text"
    }
}

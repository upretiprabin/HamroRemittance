package com.remit

class Transaction {
    static belongsTo = [sender: Sender, receiver: Receiver]
    float exchangeRate
    float serviceCharge
    float subTotal
    float taxPercentage
    float discount
    float total
    float exchangedTotal
    float currency
    String customMessage
    Date dateCreated


    static constraints = {
    }

    static mapping = {
        customMessage type: "text"
    }
}

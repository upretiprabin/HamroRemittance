package com.remit

class Transaction {
    static belongsTo = [sender: Sender, receiver: Receiver]
    float subTotal
    float discount
    float total
    float exchangedTotal
    float currency
    String customMessage
    Date dateCreated = new Date()


    static constraints = {
    }

    static mapping = {
        customMessage type: "text"
    }
}

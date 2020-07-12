package com.remit

class Transaction {
    static belongsTo = [sender: Sender, receiver: Receiver]
    float subTotal
    float discount
    float total
    float exchangedTotal
    String currency
    String customMessage
    Date dateCreated = new Date()


    static constraints = {
        discount(nullable: true, blank: true)
        customMessage(nullable: true, blank: true)
    }

    static mapping = {
        customMessage type: "text"
    }
}

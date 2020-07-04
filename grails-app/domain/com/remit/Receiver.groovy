package com.remit

class Receiver {

    static belongsTo = [customer: Customer]
    String relationshipWithSender
    Date dateCreated

    static constraints = {

    }
}

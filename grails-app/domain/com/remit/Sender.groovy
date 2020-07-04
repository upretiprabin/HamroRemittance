package com.remit

class Sender {

    static belongsTo = [customer: Customer]
    String sourceOfFund
    Date dateCreated

    static constraints = {
    }
}

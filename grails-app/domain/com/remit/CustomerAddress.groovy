package com.remit

class CustomerAddress {

    static belongsTo = [customer: Customer, address: Address]
    Date dateCreated

    static constraints = {
    }
}

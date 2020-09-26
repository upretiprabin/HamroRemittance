package com.remitapp

class PayingAgents {
    String name
    String address
    Date dateCreated = new Date()

    static constraints = {
        name(nullable: false, balnk: false, unique: true)
        address(nullable: true, blank: true)
    }
}

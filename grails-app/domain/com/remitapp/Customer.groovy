package com.remitapp

class Customer {
    String firstName
    String middleName
    String lastName
    String phoneNumber
    Date dateOfBirth
    String nationality
    String emailAddress
    Date dateCreated = new Date()

    static constraints = {
        firstName(blank: false, nullable: false)
        middleName(blank: true, nullable: true)
        lastName(blank: false, nullable: false)
        phoneNumber(blank: false, nullable: false)
        emailAddress(nullable: false, blank: false)
        nationality(nullable: true, blank: true)
        dateOfBirth(nullable: true, blank: true)
    }
}

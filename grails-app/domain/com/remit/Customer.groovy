package com.remit

class Customer {
    String firstName
    String middleName
    String lastName
    String phoneNumber
    String password
    Date dateOfBirth
    String nationality
    String emailAddress
    Date dateCreated = new Date()

    static constraints = {
        firstName(blank: false, nullable: false)
        middleName(blank: true, nullable: true)
        lastName(blank: false, nullable: false)
        phoneNumber(blank: false, nullable: false)
        dateOfBirth(nullable: false)
    }
}

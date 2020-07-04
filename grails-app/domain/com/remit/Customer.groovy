package com.remit

class Customer {
    String firstName
    String middleName
    String lastName
    String mobileNum
    String emailAddress
    Date dateOfBirth
    Date dateCreated = new Date()

    static constraints = {
        firstName(blank: false, nullable: false)
        middleName(blank: true, nullable: true)
        lastName(blank: false, nullable: false)
        mobileNum(blank: false, nullable: false)
        dateOfBirth(nullable: false)
    }
}

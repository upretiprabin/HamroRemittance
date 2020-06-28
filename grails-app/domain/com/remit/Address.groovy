package com.remit

class Address {

    String addressLineOne
    String addressLineTwo
    String suburbCity
    String country
    String stateProvince
    String zipCode
    Date dateCreated = new Date()

    static constraints = {
        addressLineOne(blank: false, nullable: false)
        addressLineTwo(blank: true, nullable: true)
        suburbCity(blank: true, nullable: true)
        country(blank: false, nullable: false)
        stateProvince(blank: false, nullable: false)
        zipCode(blank: false, nullable: false)
    }
}

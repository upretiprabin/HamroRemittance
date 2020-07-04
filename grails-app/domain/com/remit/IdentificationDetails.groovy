package com.remit

class IdentificationDetails {
    static belongsTo = [customer: Customer]
    String idType
    String identityNumber
    String issuedBy
    Date expiryDate
    String imageOfId
    Date dateCreated = new Date()

    static constraints = {
    }
}

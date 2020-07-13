package com.remit

class IdentificationDetails {
    static belongsTo = [customer: Customer]
    DocumentType documentType
    String identityNumber
    String issuedBy
    Date expiryDate
    String imageOfId
    Date dateCreated = new Date()

    static constraints = {
    }
}

enum DocumentType {
    PASSPORT,
    DRIVINGLICENCE
}

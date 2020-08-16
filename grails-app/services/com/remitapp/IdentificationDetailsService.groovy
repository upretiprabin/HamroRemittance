package com.remitapp

import com.remitapp.IdentificationDetails
import grails.gorm.transactions.Transactional

@Transactional
class IdentificationDetailsService {

    def serviceMethod() {

    }

    def addIdentificationDetails(params){
        IdentificationDetails identificationDetails = new IdentificationDetails()
        identificationDetails.customer = params.customer
        identificationDetails.documentType = params.documentType
        identificationDetails.identityNumber = params.identityNumber
        identificationDetails.issuedBy = params.issuedBy
        identificationDetails.expiryDate = params.expiryDate
        identificationDetails.imageOfId = params.imageOfId
        identificationDetails.save(flush: true, failOnError: true)
    }
}

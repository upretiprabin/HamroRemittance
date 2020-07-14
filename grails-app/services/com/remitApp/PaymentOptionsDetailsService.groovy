package com.remitApp


import com.remitapp.PaymentOptionDetails
import grails.gorm.transactions.Transactional

@Transactional
class PaymentOptionsDetailsService {

    def serviceMethod() {

    }

    def addPaymentDetails(params){
        PaymentOptionDetails paymentOptionDetails = new PaymentOptionDetails()
        paymentOptionDetails.payingAgentId = params.payingAgentId
        paymentOptionDetails.remitName = params.remitName
        paymentOptionDetails.remitAddress = params.remitAddress
        paymentOptionDetails.bankName = params.bankName
        paymentOptionDetails.branchAddress = params.branchAddress
        paymentOptionDetails.accountName = params.accountName
        paymentOptionDetails.accountNumber = params.accountNumber
        paymentOptionDetails.save(flush: true, failOnError: true)
    }

    def getPaymentDetails(paymentId){
        def paymentOptionsDetails = PaymentOptionDetails.findById(paymentId)
        return paymentOptionsDetails
    }
}

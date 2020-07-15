package demo

import com.remitapp.CashPickUp
import com.remitapp.CompanyCharges
import com.remitapp.PayingAgentDetails

class BootStrap {

    def init = { servletContext ->
        log.info "Loading database..."

        /*PayingAgentDetails payingAgentDetails1 = new PayingAgentDetails()
        payingAgentDetails1.name = "IME"
        payingAgentDetails1.address = "KTM"
        payingAgentDetails1.bankOrRemit = "Remit"
        payingAgentDetails1.save(flush: true, failOnError: true)

        PayingAgentDetails payingAgentDetails2 = new PayingAgentDetails()
        payingAgentDetails2.name = "Himalayan Bank"
        payingAgentDetails2.address = "Bhaktapur"
        payingAgentDetails2.bankOrRemit = "Bank"
        payingAgentDetails2.save(flush: true, failOnError: true)

        CashPickUp cashPickUp = new CashPickUp()
        cashPickUp.type = "Bank"
        cashPickUp.save(flush:true, failOnError: true)
        CashPickUp cashPickUp1 = new CashPickUp()
        cashPickUp1.type = "Local Remit"
        cashPickUp1.save(flush:true, failOnError: true)
        CashPickUp cashPickUp2 = new CashPickUp()
        cashPickUp2.type = "Cash"
        cashPickUp2.save(flush:true, failOnError: true)

        /*CompanyCharges companyCharges = new CompanyCharges()
        companyCharges.country = "Nepal"
        companyCharges.exchangeRate = 87.54
        companyCharges.serviceCharge = 9.8
        companyCharges.taxPercentage = 5.2
        companyCharges.defaultCurrency = "NPR"
        companyCharges.save(flush: true, failOnError:true)*/
    }
    def destroy = {
    }
}

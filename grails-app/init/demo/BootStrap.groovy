package demo

import com.remit.PayingAgentDetails

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
        payingAgentDetails2.save(flush: true, failOnError: true)*/
    }
    def destroy = {
    }
}

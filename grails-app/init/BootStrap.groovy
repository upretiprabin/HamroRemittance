import com.remitapp.CashPickUp
import com.remitapp.CompanyCharges
import com.remitapp.PayingAgentDetails
import com.remitapp.TransactionStatus
import com.remitapp.um.*
import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.converters.JSON

class BootStrap {
    def customerService
    def bankDetailsService
    def customerAddressService

    def init = { servletContext ->

        SpringSecurityUtils.clientRegisterFilter(
                'removeLoginPromptFilter', SecurityFilterPosition.OPENID_FILTER.order + 10)

//        def adminRole = new Role(authority: 'ROLE_ADMIN').save()
//
      /*  def testUser = new User(username: 'tbikash@gmail.com', password: 'admin').save()
//        def testUser = User.findById(2)
//
       UserRole.create testUser, adminRole
//
        UserRole.withSession {
            it.flush()
            it.clear()
        }*/
//
//        assert User.count() == 1
//        assert Role.count() == 1
//        assert UserRole.count() == 1
//
//        log.info "Loading database..."
//
//        PayingAgentDetails payingAgentDetails1 = new PayingAgentDetails()
//        payingAgentDetails1.name = "IME"
//        payingAgentDetails1.address = "KTM"
//        payingAgentDetails1.bankOrRemit = "Remit"
//        payingAgentDetails1.save(flush: true, failOnError: true)
//
//        PayingAgentDetails payingAgentDetails2 = new PayingAgentDetails()
//        payingAgentDetails2.name = "Himalayan Bank"
//        payingAgentDetails2.address = "Bhaktapur"
//        payingAgentDetails2.bankOrRemit = "Bank"
//        payingAgentDetails2.save(flush: true, failOnError: true)
//
//        CashPickUp cashPickUp = new CashPickUp()
//        cashPickUp.type = "Bank"
//        cashPickUp.save(flush:true, failOnError: true)
//        CashPickUp cashPickUp1 = new CashPickUp()
//        cashPickUp1.type = "Local Remit"
//        cashPickUp1.save(flush:true, failOnError: true)
//        CashPickUp cashPickUp2 = new CashPickUp()
//        cashPickUp2.type = "Cash"
//        cashPickUp2.save(flush:true, failOnError: true)
//
//        CompanyCharges companyCharges = new CompanyCharges()
//        companyCharges.country = "Nepal"
//        companyCharges.exchangeRate = 87.54
//        companyCharges.serviceCharge = 9.8
//        companyCharges.taxPercentage = 5.2
//        companyCharges.defaultCurrency = "NPR"
//        companyCharges.save(flush: true, failOnError:true)

        /* Transaction Status Bootstrapping*
       /* TransactionStatus transactionStatus = new TransactionStatus()
        transactionStatus.statusId = "awaitingPayments"
        transactionStatus.statusDesc = "Awaiting Payments"
        transactionStatus.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus1 = new TransactionStatus()
        transactionStatus1.statusId = "onlineEntry"
        transactionStatus1.statusDesc = "Online Entry"
        transactionStatus1.save(flush:true, failOnError: true)*/

        /* Transaction Status Bootstrapping*/
        /*TransactionStatus transactionStatus2 = new TransactionStatus()
        transactionStatus2.statusId = "transactionConfirmed"
        transactionStatus2.statusDesc = "Transaction Confirmed"
        transactionStatus2.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus3 = new TransactionStatus()
        transactionStatus3.statusId = "readyToTransfer"
        transactionStatus3.statusDesc = "Ready To Transfer"
        transactionStatus3.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus4 = new TransactionStatus()
        transactionStatus4.statusId = "checking"
        transactionStatus4.statusDesc = "Checking"
        transactionStatus4.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus5 = new TransactionStatus()
        transactionStatus5.statusId = "pending"
        transactionStatus5.statusDesc = "Pending"
        transactionStatus5.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus6 = new TransactionStatus()
        transactionStatus6.statusId = "declined"
        transactionStatus6.statusDesc = "Declined"
        transactionStatus6.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus7 = new TransactionStatus()
        transactionStatus7.statusId = "refunded"
        transactionStatus7.statusDesc = "Refunded"
        transactionStatus7.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus8 = new TransactionStatus()
        transactionStatus8.statusId = "readyForCollectionInNepal"
        transactionStatus8.statusDesc = "Ready For Collection In Nepal"
        transactionStatus8.save(flush:true, failOnError: true)

        TransactionStatus transactionStatus9 = new TransactionStatus()
        transactionStatus9.statusId = "paidInNepal"
        transactionStatus9.statusDesc = "Paid In Nepal"
        transactionStatus9.save(flush:true, failOnError: true)*/
/*

              def json = """{
  "firstName": "admin",
  "middleName": "Kumar",
  "lastName": "admin",
  "phoneNumber": "9843462869",
  "dateOfBirth": "09/15/1992",
  "nationality": "nepali",
  "sender": true,
  "emailAddress": "admin@gmail.com",
  "addressLineOne":"ktm",
  "addressLineTwo":"NP",
  "suburbCity":"ktmandu",
  "country":"Australia",
  "stateProvince":"bagmati",
  "zipCode": "0099",
  "bankName":"Himalayan Bank",
  "branchId":"KathmanduNP",
  "accountNumber":"123456"
  }"""

        def newParams = JSON.parse(json)

        def addressParams = [:]
        addressParams.addressLineOne = newParams.addressLineOne
        addressParams.addressLineTwo = newParams.addressLineTwo
        addressParams.suburbCity = newParams.suburbCity
        addressParams.country = newParams.country
        addressParams.stateProvince = newParams.stateProvince
        addressParams.zipCode = newParams.zipCode

        def bankDetails = [:]
        bankDetails.bankName = newParams.bankName
        bankDetails.branchId = newParams.branchId
        bankDetails.accountNumber = newParams.accountNumber
        //TODO: remove addressParams from newParams


        def result = customerService.saveCustomer(newParams)
        println "result ===== $result"
        if(result.error){
        }else{
            def savedCustomer = result.customer
            println "{savedCustomer.id} = ${savedCustomer.id}"

            def bankDetailsResult = bankDetailsService.saveBankDetails(savedCustomer, bankDetails)
            println "bankDetailsResult = $bankDetailsResult"

            def addressResult = customerAddressService.saveAddress(addressParams)
            def savedAddress = addressResult.address
            println "{savedAddress.id} = ${savedAddress.id}"
            def finalResult = customerAddressService.saveCustomerAddress(savedCustomer, savedAddress)
            println "finalResult = $finalResult"
        }

    }
*/

        println "------DEPLOYED----"
        def destroy = {
        }
    }
}

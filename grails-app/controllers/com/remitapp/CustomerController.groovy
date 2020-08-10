package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class CustomerController {
    def customerService
    def customerAddressService
    def bankDetailsService
    def transactionService

    /* def index() {
         def customers = customerService.getAllCustomers()
         println "{customers as JSON} = ${customers as JSON}"
     }*/

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def saveCustomer(){

        println "{request.json} = ${request.JSON}"
        def newParams = request.JSON
        def addressParams = [:]
        addressParams.addressLineOne = newParams.addressLineOne
        addressParams.addressLineTwo = newParams.addressLineTwo
        addressParams.suburbCity = newParams.suburbCity
        addressParams.country = newParams.country
        addressParams.stateProvince = newParams.stateProvince
        addressParams.zipCode = newParams.zipCode

        def bankDetails = [:]
        if(params?.receiver){
            bankDetails.bankName = newParams.bankName
            bankDetails.branchId = newParams.branchId
            bankDetails.accountNumber = newParams.accountNumber
        }

        //TODO: remove addressParams from newParams

        try{
            def result = customerService.saveCustomer(newParams)
            println "result ===== $result"
            if(result.error){
                render (["Error":result.error] as JSON)
            }else{
                def savedCustomer = result.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                if(params?.receiver) {
                    def bankDetailsResult = bankDetailsService.saveBankDetails(savedCustomer, bankDetails)
                    println "bankDetailsResult = $bankDetailsResult"
                }

                def addressResult = customerAddressService.saveAddress(addressParams)
                def savedAddress = addressResult.address
                println "{savedAddress.id} = ${savedAddress.id}"
                def finalResult = customerAddressService.saveCustomerAddress(savedCustomer, savedAddress)
                println "finalResult = $finalResult"
                render (["result":finalResult.message] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex.message] as JSON)
        }

    }

    def updateCustomer(){
        def customerParams = request.JSON
        def addressParams = [:]
        addressParams.customerId = customerParams.customerId
        addressParams.addressLineOne = customerParams.addressLineOne
        addressParams.addressLineTwo = customerParams.addressLineTwo
        addressParams.suburbCity = customerParams.suburbCity
        addressParams.country = customerParams.country
        addressParams.stateProvince = customerParams.stateProvince
        addressParams.zipCode = customerParams.zipCode

        def bankDetails = [:]
        if(params?.receiver) {
            bankDetails.customerId = customerParams.customerId
            bankDetails.bankName = customerParams.bankName
            bankDetails.branchId = customerParams.branchId
            bankDetails.accountNumber = customerParams.accountNumber
        }
        //TODO: remove addressParams from newParams

        try{
            def result = customerService.updateCustomer(customerParams)
            println "result ==== $result"
            if(result?.error){
                render (["Error":result.error] as JSON)
            }else{
                def savedCustomer = result?.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                if(params?.receiver) {
                    def bankDetailsResult = bankDetailsService.updateBankDetails(savedCustomer, bankDetails)
                    println "bankDetailsResult ==== $bankDetailsResult"
                }

                def addressResult = customerAddressService.updateAddress(savedCustomer, addressParams)
                def savedAddress = addressResult.address
                println "savedAddress === $savedAddress"
                render (["result":addressResult.message] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex.message] as JSON)
        }

    }

    def deleteCustomer(){
        def customerParams = request.JSON
        Customer customer = Customer.findById(customerParams.customerId)
        try{
            if(customerParams.receiver){
                if(!customer){
                    render(["Error":"No receiver to delete."] as JSON)
                    return
                }
                //delete customer address,address bank details, customer
                customerService.deleteReceiver(customer)
                System.out.println("--delete success--receiver-")
                render(["result":["message":"Receiver deleted successfully."]] as JSON)
            }else if(customerParams.sender){
                Sender sender = Sender.findById(customerParams.customerId)
                if(!customer){
                    render(["Error":"No sender to delete."] as JSON)
                    return
                }
                /**
                 delete address
                 delete bank details
                 delete all the receivers
                 delete all the transactions
                 delete all the orders
                 delete customer
                 **/
                customerAddressService.deleteCustomerAddress(customer)
                bankDetailsService.deleteBankDetails(customer)
                transactionService.deleteTransactions(sender)
                customerService.deleteAllReceivers(customerParams)
                customerService.deleteCustomer(customer)
                System.out.println("--delete success---")
                render(["result":["message":"Sender and its details deleted successfully."]] as JSON)
            }else{
                render (["Error":"Error occurred while deleting customer."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex.message] as JSON)
        }

    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getCustomerPersonalInfo(){
        def customerParams = request.JSON
        try{
            def personalDetails = customerService.getCustomerPersonalInfo(customerParams)
            println "personalDetails = $personalDetails"
            if(personalDetails){
                render(["result":personalDetails] as JSON)
            }else{
                render (["Error":"Error occurred while fetching customer details."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching customer details."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getCustomerTransactions(){
        def customerParams = request.JSON
        try{
            def transactions = transactionService.getCustomerTransactions(customerParams)
            println "transactions = $transactions"
            if(transactions){
                render(["result":transactions] as JSON)
            }else{
                render (["Error":"No transactions found."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching customer transactions."] as JSON)
        }
    }
}

package com.remitapp

import grails.converters.JSON


class CustomerController {
    def customerService
    def customerAddressService
    def bankDetailsService

    /* def index() {
         def customers = customerService.getAllCustomers()
         println "{customers as JSON} = ${customers as JSON}"
     }*/

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
        bankDetails.bankName = newParams.bankName
        bankDetails.branchId = newParams.branchId
        bankDetails.accountNumber = newParams.accountNumber
        //TODO: remove addressParams from newParams

        try{
            def result = customerService.saveCustomer(newParams)
            println "result ===== $result"
            if(result.error){
                render (["result":result.error] as JSON)
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
                render (["result":finalResult.message] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
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
        bankDetails.customerId = customerParams.customerId
        bankDetails.bankName = customerParams.bankName
        bankDetails.branchId = customerParams.branchId
        bankDetails.accountNumber = customerParams.accountNumber
        //TODO: remove addressParams from newParams

        try{
            def result = customerService.updateCustomer(customerParams)
            println "result ==== $result"
            if(result?.error){
                render (["result":result.error] as JSON)
            }else{
                def savedCustomer = result?.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                def bankDetailsResult = bankDetailsService.updateBankDetails(savedCustomer, bankDetails)
                println "bankDetailsResult ==== $bankDetailsResult"

                def addressResult = customerAddressService.updateAddress(savedCustomer, addressParams)
                def savedAddress = addressResult.address
                println "savedAddress === $savedAddress"
                render (["result":addressResult.message] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }

    }

    def deleteCustomer(){
        def customerParams = request.JSON
        Customer customer = Customer.findById(customerParams.customerId)
        try{
            if(customerParams.receiver){
                //delete customer address,address bank details, customer
                customerAddressService.deleteCustomerAddress(customer)
                bankDetailsService.deleteBankDetails(customer)
                customerService.deleteCustomer(customer)
            }else if(customerParams.sender){
                //delete address
                //delete bank details
                //delete customer
                //delete all the receivers
                //delete all the transactions
                //delete all the orders

                customerAddressService.deleteCustomerAddress(customer)
                bankDetailsService.deleteBankDetails(customer)
            }else{
                render (["result":"Not enough delete parameters."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":ex] as JSON)
        }

    }
}

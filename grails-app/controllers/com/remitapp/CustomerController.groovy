package com.remitapp

import grails.converters.JSON


class CustomerController {
    def customerService
    def customerAddressService

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

                def bankDetailsResult = customerService.saveBankDetails(savedCustomer, bankDetails)
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

                def bankDetailsResult = customerService.updateBankDetails(savedCustomer, bankDetails)
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

    /* def getCustomer(params){
         customerService.getCustomer(params.id)
     }*/

    /*def updateUser(){
        def requestJson = request.JSON
        def email = requestJson.email
        def schoolName = requestJson.schoolName
        def userJson = requestJson.user
        if(email == null || schoolName == null || userJson == null){
            render (["Error":"invalid parameters"] as JSON)
            return
        }
        def user = null
        def result = null
        def errorMessage = null
        try{
            (result,user) = userService.update(email,schoolName,userJson)
            if(result.contains("success"))
                user = userService.getUserModelWithExtraFields(user)
            else
                errorMessage = result
        }catch(CustomException e){
            log.error(e)
            render(["Error":e.message] as JSON)
            return
        }
        catch(e){
            log.error("Error Occurred!",e)
            render (status:500, text:["Error":"error occurred"] as JSON, contentType: "application/json")
            return
        }
        if(errorMessage)
            render (["Error":errorMessage] as JSON)
        else
            render (["result":user] as JSON)
    }*/

}

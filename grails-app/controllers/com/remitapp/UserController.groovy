package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class UserController {

    def userService
    def springSecurityService
    def customerService
    def bankDetailsService
    def customerAddressService

    def login(){
        def username = springSecurityService.principal?.username
        def user = userService.loginUser(username)
        log.info("User logged in. Username: ${user.username}")
        render (['result':user] as JSON)
    }

    //TODO implement session handling
    def checkSession(){
        def username = springSecurityService.principal?.username
        render (['result':username] as JSON)
    }

    def logout(){
        session.invalidate()
        render (["result":"User logged out"] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def resetPassword(){
        def requestJSON = request.JSON
        def resetCode = requestJSON.resetCode
        def password = requestJSON.password
        def result = null
        if(!resetCode || !password){
            render(["Error" : "Invalid parameters"] as JSON)
            return
        }
        try{
            result = userService.resetPassword(resetCode,password)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(Exception e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
        if(result){
            render (['result':"Password changed successfully."] as JSON)
        }else{
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def sendForgotPasswordEmail(){
        def requestJSON = request.JSON
        def email = requestJSON.email
        def result = null
        if(!email){
            render(["Error" : "Invalid parameters"] as JSON)
            return
        }
        try{
            result = userService.sendForgotPasswordEmail(email)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(Exception e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
        if(result){
            render (['result':"Forgot password email sent"] as JSON)
        }else{
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def create(){
        def requestJson = request.JSON
        def username = requestJson.username
        def password = requestJson.password
        def adminUserName = requestJson.adminUserName
        def result = null
        try{
            if(adminUserName && requestJson?.receiver){
                userService.checkUser(adminUserName)
                saveCustomer(requestJson)
            }else{
                def user = userService.create(username, password, adminUserName)
                if(user && !adminUserName)
                    result = userService.sendVerificationToken(username)
                if(adminUserName)
                    saveCustomer(requestJson)
            }
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result)
            render (['result':result] as JSON)
        else
            render (["Error" : "Error Occurred! Please check logs."] as JSON)

    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def sendVerificationCode(){
        def requestJson = request.JSON
        def username = requestJson.username
        def result = null
        try{
            result = userService.sendVerificationToken(username)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result)
            render (['result':result] as JSON)
        else
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
    }

    def delete(){
        def requestJson = request.JSON
        def userId = requestJson.id
        def result = null
        try{
            result = userService.deleteUserAndItsAssociations(userId)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':result] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def verifyUser(){
        def requestJson = request.JSON
        def verificationToken = requestJson.token
        def username = requestJson.username
        def result = null
        try{
            result = userService.verifyUser(verificationToken,username)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        if(result == "expired"){
            render (["Error" : "Token already expired!"] as JSON)
            return
        }

        render (['result':result] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def isUserEnabled(){
        def requestJson = request.JSON
        def username = requestJson.username
        def password = requestJson.password
        def result = null
        try{
            result = userService.checkUser(username,password)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':result] as JSON)
    }

    def changePassword(){
        def requestJson = request.JSON
        def result = null
        try{
            result = userService.changePassword(requestJson)
        }catch(CustomException e){
            log.error("Error occurred! $e")
            render (["Error" : e.message] as JSON)
            return
        }catch(e){
            log.error("Error occurred! $e")
            render (["Error" : "Error Occurred! Please check logs."] as JSON)
            return
        }
        render (['result':result] as JSON)
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def saveCustomer(newParams){
        def addressParams = [:]
        addressParams.addressLineOne = newParams.addressLineOne
        addressParams.addressLineTwo = newParams.addressLineTwo
        addressParams.suburbCity = newParams.suburbCity
        addressParams.country = newParams.country
        addressParams.stateProvince = newParams.stateProvince
        addressParams.zipCode = newParams.zipCode

        def bankDetails = [:]
        if(newParams?.receiver && newParams.bankName){
            bankDetails.bankName = newParams.bankName
            bankDetails.branchId = newParams.branchId
            bankDetails.accountNumber = newParams.accountNumber
        }

        def remitDetails = [:]
        if(newParams?.receiver && newParams.remitName){
            remitDetails.remitName = newParams.remitName
            remitDetails.district = newParams.district
            remitDetails.phNumber = newParams.phNumber
        }

        //TODO: remove addressParams from newParams
        try{
            def result = customerService.saveCustomer(newParams)
            println "result ===== $result"
            if (result.error) {
                render(["Error": result.error] as JSON)
//                println "error = ${result.error}"
            } else {
                def savedCustomer = result.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                if (newParams?.receiver && newParams.bankName) {
                    def bankDetailsResult = bankDetailsService.saveBankDetails(savedCustomer, bankDetails)
                    println "bankDetailsResult = $bankDetailsResult"
                }
                if (newParams?.receiver && newParams.remitName) {
                    def remitDetailsResult = bankDetailsService.saveRemitDetails(savedCustomer, remitDetails)
                    println "remitDetailsResult = $remitDetailsResult"
                }

                def addressResult = customerAddressService.saveAddress(addressParams)
                def savedAddress = addressResult.address
                println "{savedAddress.id} = ${savedAddress.id}"
                def finalResult = customerAddressService.saveCustomerAddress(savedCustomer, savedAddress)
                println "finalResult = $finalResult"
                render(["result": finalResult] as JSON)
            }
        } catch (Exception ex) {
            println "Error while saving customer."
            ex.printStackTrace()
            render(["Error": "Error while saving customer."] as JSON)
        }
    }
}

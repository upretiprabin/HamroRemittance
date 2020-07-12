package com.main

import grails.converters.JSON


class CustomerController {
    def customerService

   /* def index() {
        def customers = customerService.getAllCustomers()
        println "{customers as JSON} = ${customers as JSON}"
    }*/

    def saveCustomer(){

        println "{request.json} = ${request.JSON}"
        def newParams = request.JSON
        try{
            def result = customerService.saveCustomer(newParams)
            render (["result":result] as JSON)
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

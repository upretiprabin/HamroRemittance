package com.remitapp.admin

import grails.converters.JSON

class AdminDetailsController {
    def adminService

//    def index() { }

    def getAllTransactionsOrderDetails(){
        println " here----"
        try{
            def result = adminService.getAllTransactionOrders()
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"No records found."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching transaction details for dashboard."] as JSON)
        }
    }

    def getTransactionOrdersByStatus(){
        def statusParams = request.JSON
        try{
            def result = adminService.getAllTransactionOrdersByStatus(statusParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"No records found."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Error occurred while fetching transaction details by status."] as JSON)
        }
    }

    def storeTransactionStatusUpdate(){
        def statusParams = request.JSON
        try{
            def result = adminService.saveOrderDetailsStatus(statusParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while saving status."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while saving status."] as JSON)
        }
    }

    def updateTransactionStatusBulk(){
        def statusParams = request.JSON
        println "statusParams = $statusParams"
        def request = statusParams.request
        println "request = $request"
        int errorCount = 0
        try{
            request.each { eachVal ->
                println "eachVal = $eachVal"
                try{
                    def result = adminService.saveOrderDetailsStatus(eachVal)
                    if(result.isEmpty()) throw new Exception("Exception occurred..")
                }catch(Exception ex){
                    ex.printStackTrace()
                    errorCount++
                }
            }
            println "errorCount = $errorCount"
            if(errorCount == 0){
                render (["result":"Bulk update successfully completed."] as JSON)
            }else{
                render (["Error":"Exception occurred while performing bulk status update with error count: "+errorCount] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while performing bulk status update."] as JSON)
        }
    }

    def saveTrnValue(){
        def statusParams = request.JSON
        try{
            def result = adminService.saveOrderDetailsTrnValue(statusParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while saving TRN number."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while saving TRN number."] as JSON)
        }
    }

    def deleteTransactionOrderDetails(){
        def statusParams = request.JSON
        try{
            def result = adminService.deleteTransactionOrderDetails(statusParams)
            if(result){
                render (["result":result] as JSON)
            }else{
                render (["Error":"Error occurred while deleting transaction details."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render (["Error":"Exception occurred while deleting transaction details."] as JSON)
        }
    }
}

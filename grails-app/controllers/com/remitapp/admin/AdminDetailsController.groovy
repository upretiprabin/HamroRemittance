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
            render (["Error":"Exception occurred while saving status."] as JSON)
        }
    }
}

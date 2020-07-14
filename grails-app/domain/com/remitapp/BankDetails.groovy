package com.remitapp

import com.remitapp.Customer

class BankDetails {
    static belongsTo = [customer: Customer]
    String bankName
    String branchId
    String accountNumber
    Date dateCreated = new Date()

    static constraints = {
        bankName(nullable: false,blank: false)
        branchId(nullable: false,blank: false)
        accountNumber(nullable: false,blank: false)
    }
}

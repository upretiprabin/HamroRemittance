package com.remitapp

class LocalRemitDetails {
    static belongsTo = [customer: Customer]
    String remitName
    String district
    String phNumber

    static constraints = {
    }
}

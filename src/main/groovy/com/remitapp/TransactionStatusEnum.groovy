package com.remitapp

enum TransactionStatusEnum {

    awaitingPayments("awaitingPayments","Awaiting Payments"),
    onlineEntry("onlineEntry","Online Entry"),
    transactionConfirmed("transactionConfirmed","Transaction Confirmed"),
    readyToTransfer("readyToTransfer","Ready To Transfer"),
    checking("checking","Checking"),
    pending("pending","Pending"),
    declined("declined","Declined"),
    refunded("refunded","Refunded"),
    readyForCollectionInNepal("readyForCollectionInNepal","Ready For Collection In Nepal"),
    paidInNepal("paidInNepal","Paid In Nepal")

    private String displayName
    private String status

    private TransactionStatusEnum(String status, String displayName){
        this.displayName = displayName
        this.status = status
    }

    static String getTransactionStatus(status){
        def displayStatus = null
        values().each{it->
            if(it.status == status)
                displayStatus = it.displayName
        }
        return displayStatus
    }
}
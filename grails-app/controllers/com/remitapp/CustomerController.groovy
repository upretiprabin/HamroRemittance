package com.remitapp

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import org.springframework.web.multipart.MultipartFile

@Secured(['ROLE_ADMIN', 'ROLE_USER'])
class CustomerController {
    def customerService
    def customerAddressService
    def bankDetailsService
    def transactionService
    def identificationDetailsService

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
        if(newParams?.receiver){
            bankDetails.bankName = newParams.bankName
            bankDetails.branchId = newParams.branchId
            bankDetails.accountNumber = newParams.accountNumber
        }

        //TODO: remove addressParams from newParams

        try{
            def result = customerService.saveCustomer(newParams)
            println "result ===== $result"
            if (result.error) {
                render(["Error": result.error] as JSON)
            } else {
                def savedCustomer = result.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                if (newParams?.receiver) {
                    def bankDetailsResult = bankDetailsService.saveBankDetails(savedCustomer, bankDetails)
                    println "bankDetailsResult = $bankDetailsResult"
                }

                def addressResult = customerAddressService.saveAddress(addressParams)
                def savedAddress = addressResult.address
                println "{savedAddress.id} = ${savedAddress.id}"
                def finalResult = customerAddressService.saveCustomerAddress(savedCustomer, savedAddress)
                println "finalResult = $finalResult"
                render(["result": finalResult] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error while saving customer."] as JSON)
        }

    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def updateCustomer() {
        def customerParams = request.JSON
        def addressParams = [:]
//        addressParams.customerId = customerParams.customerId
        addressParams.addressLineOne = customerParams.addressLineOne
        addressParams.addressLineTwo = customerParams.addressLineTwo
        addressParams.suburbCity = customerParams.suburbCity
        addressParams.country = customerParams.country
        addressParams.stateProvince = customerParams.stateProvince
        addressParams.zipCode = customerParams.zipCode

        def bankDetails = [:]
        if (params?.receiver) {
//            bankDetails.customerId = customerParams.customerId
            bankDetails.bankName = customerParams.bankName
            bankDetails.branchId = customerParams.branchId
            bankDetails.accountNumber = customerParams.accountNumber
        }
        //TODO: remove addressParams from newParams

        try {
            def result = customerService.updateCustomer(customerParams)
            println "result ==== $result"
            if (result?.error) {
                render(["Error": result.error] as JSON)
            } else {
                def savedCustomer = result?.customer
                println "{savedCustomer.id} = ${savedCustomer.id}"

                if (params?.receiver) {
                    def bankDetailsResult = bankDetailsService.updateBankDetails(savedCustomer, bankDetails)
                    println "bankDetailsResult ==== $bankDetailsResult"
                }

                def addressResult = customerAddressService.updateAddress(savedCustomer, addressParams)
                def savedAddress = addressResult.address
                println "savedAddress === $savedAddress"
                render(["result": "Updated Customer Successfully."] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error while updating customer."] as JSON)
        }

    }

    def deleteCustomer() {
        def customerParams = request.JSON
        Customer customer = Customer.findByEmailAddress(customerParams.userName)
        try {
            if (customerParams.receiver) {
                if (!customer) {
                    render(["Error": "No receiver to delete."] as JSON)
                    return
                }
                //delete customer address,address bank details, customer
                customerService.deleteReceiver(customer)
                System.out.println("--delete success--receiver-")
                render(["result": ["message": "Receiver deleted successfully."]] as JSON)
            } else if (customerParams.sender) {
                Sender sender = Sender.findByEmailAddress(customerParams.userName)
                if (!customer) {
                    render(["Error": "No sender to delete."] as JSON)
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
                render(["result": ["message": "Sender and its details deleted successfully."]] as JSON)
            } else {
                render(["Error": "Error occurred while deleting customer."] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error occurred while deleting ${customerParams.receiver ? 'receiver' : 'customer'}."] as JSON)
        }

    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getCustomerPersonalInfo() {
        def customerParams = request.JSON
        try {
            def personalDetails = customerService.getCustomerPersonalInfo(customerParams)
            println "personalDetails = $personalDetails"
            if (personalDetails) {
                render(["result": personalDetails] as JSON)
            } else {
                render(["Error": "Error occurred while fetching customer details."] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error occurred while fetching customer details."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getCustomerTransactions() {
        def customerParams = request.JSON
        try {
            def transactions = transactionService.getCustomerTransactions(customerParams)
            println "transactions = $transactions"
            if (transactions) {
                render(["result": transactions] as JSON)
            } else {
                render(["Error": "No transactions found."] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error occurred while fetching customer transactions."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getReceiversList() {
        def customerParams = request.JSON
        try {
            def receivers = customerService.getReceiversList(customerParams)
            if (receivers) {
                render(["result": receivers] as JSON)
            } else {
                render(["Error": "No receivers found."] as JSON)
            }
        } catch (Exception ex) {
            ex.printStackTrace()
            render(["Error": "Error occurred while fetching receivers list."] as JSON)
        }
    }

   /* @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def addNumbers() {
        println "----here-----"
        println "params = $params"
    }*/

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def uploadIdDocument() {
        def identityParams = params
        String SAVE_DIR = "identityDocs";
        def resourcePath = servletContext.getRealPath("/")
        def altPath = resourcePath + "../../../../"
        String savePath = altPath +  SAVE_DIR
        String saveLocalPath = resourcePath  + SAVE_DIR
        MultipartFile image = identityParams.identityImage;
        def username = identityParams.emailAddress
        def imageId = Customer.findByEmailAddress(username)?.id

        try{
            identificationDetailsService.saveDoc(saveLocalPath, image, imageId)
            identificationDetailsService.copyFileUsingStream(new File(saveLocalPath, "${imageId}"), new File(savePath,"${imageId}"))

            def pathForDb = SAVE_DIR + File.separator + imageId
            identityParams.imageOfId = pathForDb

            def response = identificationDetailsService.addIdentificationDetails(identityParams)
            render(["result": response] as JSON)

        }catch(Exception ex){
            ex.printStackTrace()
            render(["Error": "Error occurred while saving identity image."] as JSON)
        }
    }

    @Secured('IS_AUTHENTICATED_ANONYMOUSLY')
    def getIdentityImage() {
        def customerParams = request.JSON
        try{
            def result = identificationDetailsService.getImage(customerParams)
            if (result) {
                render(["result": result] as JSON)
            } else {
                render(["Error": "No identity image found."] as JSON)
            }
        }catch(Exception ex){
            ex.printStackTrace()
            render(["Error": "Error occurred while fetching identity image."] as JSON)
        }
    }

}

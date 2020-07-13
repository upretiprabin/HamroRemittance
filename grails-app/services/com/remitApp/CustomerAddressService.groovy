package com.remitApp

import com.remitapp.Address
import com.remitapp.Customer
import com.remitapp.CustomerAddress
import grails.gorm.transactions.Transactional

@Transactional
class CustomerAddressService {

    def serviceMethod() {

    }
    def getCustomerAddress(Customer customer){
        return CustomerAddress.findByCustomer(customer);

    }

    def getAllCustomerAddresses(){
        return CustomerAddress.findAll()*.address
    }

    def saveAddress(params){
        def result = [:]
        Address address = new Address()
        address.addressLineOne = params.addressLineOne
        address.addressLineTwo = params.addressLineTwo
        address.suburbCity = params.suburbCity
        address.country = params.country
        address.stateProvince = params.stateProvince
        address.zipCode = params.zipCode
        address.save(flush: true, failOnError: true)
        result["message"] = "Saved successfully."
        result["address"] = address
        return result
    }

    def saveCustomerAddress(Customer customer, Address address){
        def result = [:]
        CustomerAddress customerAddress = new CustomerAddress()
        customerAddress.customer = customer
        customerAddress.address = address
        customerAddress.save(flush: true, failOnError: true)
        result["message"] = "Saved successfully."
        return result
    }

    def updateAddress(Customer customer, params){
        def currentAddress = CustomerAddress.findByCustomer(customer).address
        currentAddress.addressLineOne = params.addressLineOne
        currentAddress.addressLineTwo = params.addressLineTwo
        currentAddress.suburbCity = params.suburbCity
        currentAddress.country = params.country
        currentAddress.stateProvince = params.stateProvince
        currentAddress.zipCode = params.zipCoe
        currentAddress.save(flush: true, failOnError: true)
    }

    def deleteCustomerAddress(Customer customer){
        def customerAddress = CustomerAddress.findByCustomer(customer)
        if(customerAddress){
            def address = Address.findById(customerAddress.address.id)
            if(address){
                address.delete(failOnError: true, flush: true)
            }
            customerAddress.delete(failOnError: true, flush: true)
        }
    }
}

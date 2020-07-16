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
        return CustomerAddress.findByCustomer(customer).address;

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

    def updateAddress(customer, addressParams){
        println "addressParams== = $addressParams"
        def result = [:]
        def addressToEdit = getCustomerAddress(customer)
        println "{addressToEdit.id} = ${addressToEdit.id}"
        Address address = Address.findById(addressToEdit.id)
        address.addressLineOne = addressParams.addressLineOne
        address.addressLineTwo = addressParams.addressLineTwo
        address.suburbCity = addressParams.suburbCity
        address.country = addressParams.country
        address.stateProvince = addressParams.stateProvince
        address.zipCode = addressParams.zipCode
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

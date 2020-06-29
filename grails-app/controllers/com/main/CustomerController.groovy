package com.main

import grails.converters.JSON


class CustomerController {

    def index() {
        def a = [a: 'abc']
        render a as JSON
    }
}

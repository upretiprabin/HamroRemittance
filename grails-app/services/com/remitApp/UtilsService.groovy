package com.remitapp

import grails.gorm.transactions.Transactional

@Transactional
class UtilsService {

    def getRandomNumberOf4Digit() {
        Random rand = new Random()
        return String.format("%04d", rand.nextInt(10000))
    }
}

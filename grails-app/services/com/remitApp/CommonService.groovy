package com.remitapp

import grails.gorm.transactions.Transactional

import java.text.SimpleDateFormat

@Transactional
class CommonService {

    def serviceMethod() {

    }

    def getFormattedDate(String dateString){
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy", Locale.ENGLISH);
//        String dateInString = "7-Jun-2013";
        String dateInString = dateString
        Date date = formatter.parse(dateInString);
        println "date = $date"
        return date
    }
}

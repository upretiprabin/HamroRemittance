package com.remitApp

import com.remitapp.um.User
import grails.gorm.transactions.Transactional

import java.text.DateFormat
import java.text.SimpleDateFormat

@Transactional
class UserService {

    static DateFormat df = new SimpleDateFormat("yyyy-MM-dd")

    def loginUser(def username) {
        User user = User.findByUsernameAndEnabled(username,true)
        return User.collectClosure(user)
    }
}

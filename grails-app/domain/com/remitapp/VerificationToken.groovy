package com.remitapp

import com.remitapp.um.User
import org.joda.time.DateTime

class VerificationToken {

    User user
    String token
    Date expiryDate = calculateExpiryDate()
    Date createdDate = new Date()

    static constraints = {
        token blank: false, unique: true
        expiryDate blank: false
    }

    Date calculateExpiryDate() {
        DateTime dt = new DateTime()
        return dt.plusHours(24).toDate()
    }
}

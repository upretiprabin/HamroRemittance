package com.remitapp.um

import com.remitApp.UserService
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

    private static final long serialVersionUID = 1

    String username
    String password
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    Date dateCreated = new Date()

    Set<Role> getAuthorities() {
        (UserRole.findAllByUser(this) as List<UserRole>)*.role as Set<Role>
    }

    static transients = ['collectClosure']

    static constraints = {
        password nullable: false, blank: false, password: true
        username nullable: false, blank: false, unique: true
    }

    static mapping = {
	    password column: '`password`'
    }

    def static collectClosure = {
        if(!it)
            return null

        return [id :it.id,
                username :it.username,
                accountLocked :it.accountLocked,
                accountExpired :it.accountExpired,
                dateCreated :UserService.df.format(it.dateCreated),
                enabled: it.enabled
        ]
    }
}

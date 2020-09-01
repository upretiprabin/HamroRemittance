package com.remitapp.um

import com.remitapp.Customer
import com.remitapp.UserService
import grails.plugin.springsecurity.SpringSecurityService
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

    private static final long serialVersionUID = 1

    SpringSecurityService springSecurityService

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

    static transients = ['collectClosure', 'springSecurityService']

    def beforeInsert() {
        encodePassword()
    }

    def beforeUpdate() {
        if (isDirty('password')) {
            encodePassword()
        }
    }

    protected void encodePassword() {
        password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
    }

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
        def isRegistered = Customer.findByEmailAddress(it.username)
        def isAdmin = isAdmin(it.username)
        return [id :it.id,
                username :it.username,
                accountLocked :it.accountLocked,
                accountExpired :it.accountExpired,
                dateCreated :UserService.df.format(it.dateCreated),
                enabled: it.enabled,
                isRegistered : isRegistered?true:false,
                isAdmin : isAdmin
        ]
    }

    def static isAdmin(username){
        def user = User.findByUsername(username)
        def role = Role.findByAuthority("ROLE_ADMIN")
        def userRoles = UserRole.findAllByUserAndRole(user,role)
        if(userRoles){
            return true
        }else{
            return false
        }
    }
}

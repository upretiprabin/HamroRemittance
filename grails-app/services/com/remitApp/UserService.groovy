package com.remitApp

import com.remitapp.CustomException
import com.remitapp.RolesEnum
import com.remitapp.um.Role
import com.remitapp.um.User
import com.remitapp.um.UserRole
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

    def create(def username, def password){
        User user = null
        try{
            user = new User()
            if(User.findByUsername(username)){
                throw new CustomException("Username already exists.")
            }
            user.username = username
            user.password = password
            if(user.hasErrors()){
                log.error(user.getErrors())
                throw new Exception("Error Occurred!")
            }
            user.save()
            updateRoleToUser(user, RolesEnum.ROLE_USER)
        }catch(CustomException e){
            throw new CustomException(e.message)
        }
        catch(e){
            log.error("Error occurred! $e")
            user.delete(flush:true, failOnError:true)
            throw new Exception("Error Occurred!")
        }
        return User.collectClosure(user)
    }

    def updateRoleToUser(User user, def authority){
        Role role = Role.findByAuthority(authority)
        if(!role)
            role = new Role()
        role.authority = authority
        role.save()
        UserRole userRole = UserRole.findByRoleAndUser(role,user)
        if(!userRole){
            userRole = new UserRole()
        }
        userRole.user = user
        userRole.role = role
        userRole.save(flush:true, failOnError: true)
    }
}

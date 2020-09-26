
import * as EmailValidator from 'email-validator';
export const isEmptyString = value => {
    return (typeof (value) === "string" && value == "")
}
export const isNumber = value => {
    return !!Number(value)
}
export const emailValidator = value => {
    return EmailValidator.validate(value)
}
export const phoneValidator = value => {
    const regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return regx.test(value)
}
export const passwordValidator = (value) => {
    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return regx.test(value)
}
const australianPhoneValidator = (value) => {
    const regx = /4\d{8}/
    return regx.test(value)
}

const Validator = { isEmptyString, isNumber, emailValidator, phoneValidator, passwordValidator, australianPhoneValidator }
export default Validator
export const currencyFormatter = value => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(value);
}
export const phoneNumberFormatter = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '+61 ' + '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}
export const nepaliPhoneNumberFormatter = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '+977 ' + '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}
const Formatter = { currencyFormatter, phoneNumberFormatter, nepaliPhoneNumberFormatter }
export default Formatter
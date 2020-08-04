/**
 * Helpers Functions
 */
import moment from 'moment';

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Get formatted date from datestring
 * */

export function getFormattedDate(dateString, format) {
    let formatDate = format ? format : 'YYYY-MM-DD hh:mm:SS A';
    return moment(dateString).format(formatDate);
}

export function getDateDifference(dateString){
    if(dateString){
        let date = moment(dateString);
        let differenceString = "";
        let difference = moment.duration(moment().diff(date));
        let diffData = difference._data;
        if(diffData.years)
            differenceString = differenceString.concat(diffData.years+" y ");
        if(diffData.months)
            differenceString = differenceString.concat(diffData.months+" m ");
        if(diffData.days)
            differenceString = differenceString.concat(diffData.days+" d ");
        if(diffData.hours)
            differenceString = differenceString.concat(diffData.hours+" h ");
        if(diffData.minutes)
            differenceString = differenceString.concat(diffData.minutes+" min ");
        differenceString = differenceString.concat("ago");
        return differenceString;
    }
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

/**
 * validate email
 * */

export function validateEmail(email) {
    let validator = require("email-validator");
    return validator.validate(email);
}

/**
 * validate passwordStrength
 * */

export function validatePasswordStrength(password) {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!*()_&+=])(?=\S+$).{8,}$/.test(password);
}

/**
 * validate phoneNumber
 * */

export function validatePhoneNumber(phoneNumber) {
    return /^((\+1|1)\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/.test(phoneNumber);
}

/**
 * format phoneNumber
 * */

export function formatPhoneNumber(phoneNumberString,plainFormat=false) {
    console.log("here in formatphone")
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    console.log("cleaned",cleaned)
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        let intlCode = '+1 ';
        if(plainFormat)
            return [intlCode, match[2], ' ', match[3], ' ', match[4]].join('');
        else
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')

    }
    return null
}

export function stripOutPhoneFormat(phoneNumber){
    phoneNumber = phoneNumber.replace(/[\-\s(\)]/g,"");
    return phoneNumber;
}

/**
 * merge objects for existing keys only
 * */

export function objectMergeForExistingKeys(source,target) {
    console.log(source)
    console.log(target)
    Object.keys(target).forEach((key)=>{
        target[key] = source[key]
    });
    console.log("after",target)
    return target;
}

export function isDateWithinLastWeek(dateString) {
    let date = moment(dateString);
    let now = moment();
    let rangeDate = now.subtract(1, 'week').startOf('week');
    return date >= rangeDate;
}

export function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
            let positionObj = {};
            positionObj['latitude'] = position.coords.latitude;
            positionObj['longitude'] = position.coords.longitude;
            callback(positionObj);
        });
    }
}
export default {
    // user endpoints
    USER_LOGIN_USER: 'user/login',
    USER_FORGOT_PASSWORD: 'user/sendForgotPasswordEmail',
    USER_RESET_PASSWORD: 'user/resetPassword',
    USER_LOGOUT: 'user/logout',
    USER_REGISTER: 'customer/saveCustomer',

    //dashboard endpoints
    DASHBOARD_LOAD_DATA: 'dashboard/loadData',

    //Transaction endpoints
    TRANSACTION_CREATE: 'transaction/saveTransaction',
    TRANSACTION_TEST_DATA: 'transaction/testData',

    //Reciever endpoints
    RECIEVER_REGISTER: "customer/saveCustomer",
    GET_RECIEVERS: "transaction/getReceivers",
    
    //Company endpoints
    GET_COMPANY_CHARGES: 'transaction/getCompanyCharges'
}
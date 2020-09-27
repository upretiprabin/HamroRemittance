export default {
    // user endpoints
    USER_LOGIN_USER: 'user/login',
    USER_FORGOT_PASSWORD: 'user/sendForgotPasswordEmail',
    USER_RESET_PASSWORD: 'user/resetPassword',
    USER_LOGOUT: 'user/logout',
    USER_IS_USER_ENABLED: 'user/isUserEnabled',
    USER_REGISTER: 'customer/saveCustomer',
    USER_CREATE: 'user/create',
    SEND_VERIFICATION_CODE: 'user/sendVerificationCode',
    VERIFY_USER: 'user/verifyUser',
    CHECK_SESSION: 'user/checkSession',
    USER_PASSWORD_CHANGE: 'user/changePassword',
    UPDATE_USER_DETAILS: 'customer/updateCustomer',
    USER_ID_UPLOAD: 'customer/uploadIdDocument',
    USER_LIST: 'adminDetails/getAllSenders',

    //dashboard endpoints
    DASHBOARD_LOAD_DATA: 'customer/getCustomerTransactions',
    LOAD_PERSONAL_DATA: 'customer/getCustomerPersonalInfo',
    DELETE_CUSTOMER: 'customer/deleteCustomer',

    //Transaction endpoints
    TRANSACTION_CREATE: 'transaction/saveTransaction',
    TRANSACTION_TEST_DATA: 'transaction/testData',
    TRANSACTION_DELETE: 'adminDetails/deleteTransactionOrderDetails',

    //Reciever endpoints
    RECIEVER_REGISTER: 'customer/saveCustomer',
    GET_RECIEVERS: 'transaction/getReceivers',

    //Company endpoints
    GET_COMPANY_CHARGES: 'transaction/getCompanyCharges',

    //Admin-Dashboard endpoints
    GET_TXN_DATA: 'adminDetails/getAllTransactionsOrderDetails',
    GET_TXT_STATUS: 'transaction/fetchTransactionStatus',
    GET_FILTERED_TXT_DATA: 'adminDetails/getTransactionOrdersByStatus',
    GET_PAYING_AGENTS: 'payingAgents/getPayingAgents',
    POST_BULK_DATA: 'adminDetails/updateTransactionStatusBulk',
    UPDATE_TXN_STATUS: 'adminDetails/storeTransactionStatusUpdate',
    UPDATE_PAYING_AGENT: 'payingAgents/updatePayingAgentsForCustomerTxns',
    SAVE_TRN_VALUE: 'adminDetails/saveTrnValue'

}

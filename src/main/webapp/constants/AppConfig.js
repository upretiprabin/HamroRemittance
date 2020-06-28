/**
 * App Config File
 */

import {middleWareUrlResolver} from '../services/utilsService';

const domain = "hamroremittance.com";
const middleWareDevUrl = "http://127.0.0.1:8080/remitApp";

const AppConfig = {
   appLogo: require('Assets/img/logo/site-logo.png'),          // App Logo
   appVersion: '1.0.0',                                    // App version
   brandName: 'Hamro Remittance',                                    // Brand Name
   navCollapsed: false,                                      // Sidebar collapse
   locale: {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'en',
   },
   copyRightText: '© Hamro Remittance',      // Copy Right Text
   //support url
   supportUrl: "support@hamroremittance.com",
   middleWareUrl : process.env.NODE_ENV === "development" ? middleWareDevUrl :middleWareUrlResolver(domain,middleWareDevUrl),
   homePage : "dashboard"
};

export default AppConfig;

/**
 * App Config File
 */

import {middleWareUrlResolver} from '../services/utilsService';

const domain = "hamroremittance.com";
const middleWareDevUrl = "http://127.0.0.1:8080";

const AppConfig = {
    appLogo: require('Assets/img/app_logo.png'),          // App Logo
    appVersion: '1.0.0',                                    // App version
    brandName: 'Hamro Remittance',                                    // Brand Name
    navCollapsed: false,                                      // Sidebar collapse
    darkMode: false,
    miniSidebar: false,                                       // Mini Sidebar
    enableSidebarBackgroundImage: true,                      // Enable Sidebar Background Image
    sidebarImage: require('Assets/img/sidebar-4.jpg'),     // Select sidebar image
    isDarkSidenav: true,                                   // Set true to dark sidebar
    enableThemeOptions: true,                              // Enable Theme Options
    locale: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'en',
    },
    // light theme colors
    themeColors: {
        'primary': '#5D92F4',
        'secondary': '#677080',
        'success': '#00D014',
        'danger': '#FF3739',
        'warning': '#FFB70F',
        'info': '#00D0BD',
        'dark': '#464D69',
        'default': '#FAFAFA',
        'greyLighten': '#A5A7B2',
        'grey': '#677080',
        'white': '#FFFFFF',
        'purple': '#896BD6',
        'yellow': '#D46B08'
    },
    // dark theme colors
    darkThemeColors: {
        darkBgColor: '#424242'
    },
    copyRightText: '© Hamro Remittance ' + (new Date()).getFullYear() ,      // Copy Right Text
    //support url
    supportUrl: "support@hamroremittance.com",
    middleWareUrl : process.env.NODE_ENV === "development" ? middleWareDevUrl :middleWareUrlResolver(domain,middleWareDevUrl),
    homePage : "dashboard"
};

export default AppConfig;

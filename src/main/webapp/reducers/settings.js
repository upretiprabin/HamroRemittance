/**
 * App Settings Reducers
 */
import {
    COLLAPSED_SIDEBAR,
    DARK_MODE,
    BOXED_LAYOUT,
    RTL_LAYOUT,
    MINI_SIDEBAR,
    SEARCH_FORM_ENABLE,
    CHANGE_THEME_COLOR,
    TOGGLE_SIDEBAR_IMAGE,
    SET_SIDEBAR_IMAGE,
    SET_LANGUAGE,
    START_USER_TOUR,
    STOP_USER_TOUR,
    TOGGLE_DARK_SIDENAV,
    CHANGE_AGENCY_LAYOUT_BG
} from 'Actions/types';

// app config
import AppConfig from 'Constants/AppConfig';

/**
 * initial app settings
 */
const INIT_STATE = {
    navCollapsed: AppConfig.navCollapsed,
    locale: AppConfig.locale
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        // collapse sidebar
        case COLLAPSED_SIDEBAR:
            return { ...state, navCollapsed: action.isCollapsed };

        default: return { ...state };
    }
}

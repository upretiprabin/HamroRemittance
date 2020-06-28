/**
 * App Settings Reducers
 */

import {
	COLLAPSED_SIDEBAR
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
        case COLLAPSED_SIDEBAR:
            return { ...state, navCollapsed: action.isCollapsed };
        default: return { ...state };
	}
}

/**
 * Rct Theme Provider
 */
import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

// App locale
import AppLocale from '../lang';

class RctThemeProvider extends Component {
	render() {
		const { locale, children } = this.props;
		const currentAppLocale = AppLocale[locale.locale];
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <Fragment>
                    {children}
                </Fragment>
            </IntlProvider>
        );
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings
};

export default connect(mapStateToProps)(RctThemeProvider);

/**
 * Footer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from 'Constants/AppConfig';

const Footer = () => (
	<div className="rct-footer d-flex justify-content-between align-items-center mb-30 mt-30">
		<ul className="list-inline footer-menus mb-0">
			<li className="list-inline-item">
				<Button component={Link} to="/app/dashboard"><IntlMessages id="sidebar.blog" /></Button>
			</li>
			<li className="list-inline-item">
				<Button component={Link} to="/app/about-us"><IntlMessages id="sidebar.about" /></Button>
			</li>
			<li className="list-inline-item">
				<Button component={Link} to="/app/pages/faq"><IntlMessages id="sidebar.support" /></Button>
			</li>
			<li className="list-inline-item">
				<Button component={Link} to="app/terms-condition"><IntlMessages id="sidebar.terms-legal" /></Button>
			</li>
		</ul>
		<h5 className="mb-0">{AppConfig.copyRightText}</h5>
	</div>
);

export default Footer;

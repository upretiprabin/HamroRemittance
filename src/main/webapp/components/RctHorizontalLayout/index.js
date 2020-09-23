/**
 * Rct Horizontal Menu Layout
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

// Components
import Footer from 'Components/Footer/Footer';
import HorizontalMenu from 'Components/HorizontalMenu/HorizontalMenu';
import classnames from 'classnames';

class RctHorizontalLayout extends Component {

    renderPage() {
        const { pathname } = this.props.location;
        const { children, match, isDefault } = this.props;
        return (
            <Scrollbars
                className="rct-scroll"
                autoHide
                autoHideDuration={100}
                style={{ height: 'calc(100vh - 100px)' }}
            >
                <div className={"rct-page-content d-flex flex-column"}>
                    {children}
                    <Footer isDefault={isDefault}/>
                </div>
            </Scrollbars>
        );
    }

    render() {
        return (
            <div className="app-horizontal collapsed-sidebar">
                <div className="app-container">
                    <div className="rct-page-wrapper">
                        <div className="rct-app-content">
                            <div className="rct-page">
                                <HorizontalMenu isDefault={this.props.isDefault} history={this.props.history}/>
                                {this.renderPage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RctHorizontalLayout);

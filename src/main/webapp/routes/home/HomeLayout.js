import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {AsyncHomeComponent} from "../../components/AsyncComponent/AsyncComponent";
// horizontal layout
import RctHorizontalLayout from 'Components/RctHorizontalLayout';

class HomeLayout extends Component {
    render() {
        const { user } = this.props;
        return (
            <RctHorizontalLayout>
                <AsyncHomeComponent/>
            </RctHorizontalLayout>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
};

export default connect(mapStateToProps)(HomeLayout);

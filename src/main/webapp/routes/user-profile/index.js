import React, { Component } from 'react'
import ErrorBoundary from "Components/ErrorBoundary/index";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import UserProfile from '../../components/UserProfile/UserProfile';
import { Button } from '@material-ui/core';
import UploadIdDocument from '../../components/UserProfile/UploadIdDocument';
import ChangePassword from '../../components/UserProfile/ChangePassword';

import { getRandomColor } from '../../util/helpers';

class Index extends Component {

    _isMounted = false;

    state = {
        loading: false,
        userData: {},
        selected: 0,
        initials: "",
        bgColor: '',
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        this.setState(data)
    }

    loadData() {
        const color = getRandomColor()
        this.setState(
            { userData: JSON.parse(localStorage.getItem('user')), bgColor: color }
        )
    }
    changeSelected(id) {
        this.setState({ selected: id })
    }

    render() {
        const { loading, userData, selected, initials, bgColor } = this.state
        return (
            <div className="user-profile-wrapper mt-30 container">
                <ErrorBoundary>
                    {loading &&
                        <div className="page-loader d-flex justify-content-center mb-30">
                            <CircularProgress />
                        </div>
                    }
                    {!loading &&
                        <RctCollapsibleCard heading="User Profile">

                            <div className='row'>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                    <div className="flex text-right">
                                        <Button variant={selected === 0 ? "outlined" : "contained"} className="m-5" color={selected === 0 ? "primary" : "inherit"} onClick={e => this.changeSelected(0)}>User Details</Button>
                                        <Button variant={selected === 1 ? "outlined" : "contained"} className="m-5" color={selected === 1 ? "primary" : "inherit"} onClick={e => this.changeSelected(1)}>Identification Document</Button>
                                        <Button variant={selected === 2 ? "outlined" : "contained"} className="m-5" color={selected === 2 ? "primary" : "inherit"} onClick={e => this.changeSelected(2)}>Change Password</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-20 ml-20'>
                                <div className="col-sm-12 col-md-12 col-lg-4 ">
                                    <div className="col-sm-12 col-md-12 col-lg-12 mb-20" style={{height:"fit-content"}}>
                                        <div className="ml-auto mr-auto">
                                            <div className="user-image-alt-lg p-10"
                                                 style={{ background: bgColor }}>
                                                {initials}
                                            </div>
                                        </div>
                                        <div className="text-center mt-25">
                                            <span className="text-3" style={{ color: bgColor }}><i>{userData?.username}</i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-8">
                                    {selected === 0 &&
                                        <UserProfile username={userData.username} setInitials={e => this.changeState(e)} bgColor={bgColor} />
                                    }
                                    {selected === 1 &&
                                        <UploadIdDocument username={userData.username} initials={initials} bgColor={bgColor} />
                                    }
                                    {selected === 2 &&
                                        <ChangePassword username={userData.username} initials={initials} bgColor={bgColor} />
                                    }
                                </div>
                            </div>
                        </RctCollapsibleCard>
                    }
                </ErrorBoundary>
            </div>
        )
    }
}
export default Index;
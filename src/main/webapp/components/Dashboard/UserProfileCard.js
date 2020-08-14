import React, { useState, useEffect } from 'react'
import Controller from "../../controllers/dashboardController"
import { getRandomColor } from '../../util/helpers';

import { phoneNumberFormatter } from '../../util/Formatter'

const UserProfileCard = ({ }) => {
    const [userData, setUserData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        userImage: "",
        email: "",
        phone: ""
    })
    useEffect(() => {
        Controller.loadUserProfileData({ setUserData });
    }, [])


    const redirectToEditProfile = (e) => {
        e.preventDefault()
        //TODO
    }
    const name = `${userData?.firstName?userData.firstName:""} ${userData?.middleName === '' ? '' : (userData?.middleName?userData.middleName:"") + '.'} ${userData.lastName?userData.lastName:""}`
    return (
        <div className='row'>
            <div className='col-12'>
                <div className="dash-cards" id='user-profile'>
                    <a href="#" onClick={e => { redirectToEditProfile(e) }} className="square-40 bg-info card-right-action"><i className="ti-pencil-alt"></i></a>
                    <div className="card text-right">
                        <div className="media">
                            <div className="media-left mr-25">
                                {userData.img === "" && <img src={userData.userImage} className="img-fluid rounded-circle" alt="user profile" width="100" height="100" />}
                                {userData.img !== "" && <div className="user-image-alt-md p-10" style={{ background: getRandomColor() }}>{`${userData?.firstName?userData.firstName[0]:""} ${userData?.lastName?userData.lastName[0]:""}`}</div>}
                            </div>
                            <div className="media-body pt-10">
                                <span className="mb-5 text-primary fs-14 d-block">Hello,</span>
                                <h4 className="mb-5">{name}</h4>
                                <span className="text-muted fs-14 mb-15 d-block"><i className="zmdi zmdi-email"></i> {userData.email}</span>
                                <span className="text-muted fs-14 mb-15 d-block"><i className="zmdi zmdi-phone"></i> {phoneNumberFormatter(userData.phone)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileCard
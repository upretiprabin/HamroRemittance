import React from 'react';
import HowItWorks from "../../components/Homepage/HowItWorks";
import {userFromLocalStorage} from "../../sagas/AuthenticationManager";
import RctHorizontalLayout from "../../components/RctHorizontalLayout";

const HowItWorksPage = () =>{
    return (
        <RctHorizontalLayout isDefault={true}>
            <HowItWorks isDefault={true} noSignup={!!userFromLocalStorage()}/>
        </RctHorizontalLayout>
    )
};

export default HowItWorksPage;
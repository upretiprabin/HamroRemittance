import React from 'react';
import HowItWorks from "../../components/Homepage/HowItWorks";
import {userFromLocalStorage} from "../../sagas/AuthenticationManager";

const HowItWorksPage = () =>{
    return (
        <HowItWorks noSignup={!!userFromLocalStorage()}/>
    )
};

export default HowItWorksPage;
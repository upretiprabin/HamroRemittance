import Select from "../Select/Select";
import MatButton from "@material-ui/core/Button/Button";
import React from "react";
const countryList = [
    {
        'id' : 1,
        'name' : 'Nepal'
    }
];
const InstantSend = ({countryRate,onContinue}) =>{
    return (
        <div className="container send">
            <div className="mb-15">
                <h1>A better and secure way</h1>
            </div>
            <h3>to send money from Australia to Nepal</h3>
            <div className="select-country mt-15 mb-15">
                <Select
                    optionList={countryList}
                    selection={"Nepal"}
                />
            </div>
            <h5>Today's Rate : {countryRate} NPR</h5>
            <MatButton className="btn btn-primary mt-10" onClick={onContinue}>Continue</MatButton>
        </div>
    )
};

export default InstantSend;
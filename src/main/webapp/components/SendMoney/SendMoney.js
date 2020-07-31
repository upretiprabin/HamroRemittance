import React from 'react';
import Select from "../Select/Select";
import MatButton from "@material-ui/core/Button/Button";
import {Form, FormGroup, Input, Label} from 'reactstrap';

const countryList = [
    {
        'id' : 1,
        'name' : 'NPR'
    }
];

const countryList2 = [
    {
        'id' : 1,
        'name' : 'AUD'
    }
];

const SendMoney = ({
                       fee,
                       countryRate,
                       onContinue
                   }) =>{
    return (
        <div className={"send-money"}>
            <Form>
                <FormGroup className={"text-left"}>
                    <Label for="youSend">You Send</Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <Input className={"w-50"} type="text" name="youSend" id="youSend"/>
                        <div className="input-group-append">
                            <Select
                                optionList={countryList2}
                                selection={"AUD"}
                            />
                        </div>
                    </div>
                </FormGroup>
                <FormGroup className={"text-left"}>
                    <Label for="recipientGets">Recipient Gets</Label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Rs.</span>
                        </div>
                        <Input className={"w-50"} type="text" name="recipientGets" id="recipientGets"/>
                        <div className="input-group-append">
                            <Select
                                optionList={countryList}
                                selection={"NPR"}
                            />
                        </div>
                    </div>
                </FormGroup>
            </Form>
            <p className="mb-1 text-left">Total fees - <span className="font-weight-500">7.21 AUD</span></p>
            <p className="mb-1 text-left">The current exchange rate is <span className="font-weight-500">1 AUD = {countryRate} NPR</span></p>
            <MatButton className="btn btn-primary mt-10" onClick={onContinue}>Continue</MatButton>
        </div>
    );
};

export default SendMoney;
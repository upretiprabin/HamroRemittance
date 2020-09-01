import React from 'react';
import Select from "../Select/Select";
import MatButton from "@material-ui/core/Button/Button";
import { Form, FormGroup, Input, Label, Card, CardTitle } from 'reactstrap';

const countryList = [
    {
        'id': 1,
        'name': 'NPR'
    }
];

const countryList2 = [
    {
        'id': 1,
        'name': 'AUD'
    }
];

const style = {
    "width": "100%"
};

const inputGroupTextStyle = {
    "width": "45px"
};

const SendMoney = ({
    fee,
    countryRate,
    onContinue
}) => {
    return (
        <div className={"send-money ml-5"}>
            <Form>
                <FormGroup className={"text-left"}>
                    <Label for="youSend">You Send</Label>
                    <div style={style} className="input-group d-flex flex-row">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={inputGroupTextStyle}>$</span>
                        </div>
                        <Input className={"w-25"} type="text" name="youSend" id="youSend" />
                        <div className="aud input-group-append select-country">
                            <Select
                                optionList={countryList2}
                                selection={"AUD"}
                            />
                        </div>
                    </div>
                </FormGroup>
                <FormGroup className={"text-left"}>
                    <Label for="recipientGets">Recipient Gets</Label>
                    <div style={style} className="input-group d-flex flex-row">
                        <div className="input-group-prepend">
                            <span className="input-group-text" style={inputGroupTextStyle}>Rs.</span>
                        </div>
                        <Input className={"w-25"} type="text" name="recipientGets" id="recipientGets" />
                        <div className="input-group-append">
                            <Select
                                optionList={countryList}
                                selection={"NPR"}
                            />
                        </div>
                    </div>
                </FormGroup>
            </Form>
            <p className="mb-1 text-left">Total fees : <span className="font-weight-500">{fee} AUD</span></p>
            <p className="mb-1 text-left">The current exchange rate is <span className="font-weight-500">1 AUD = {countryRate} NPR</span></p>
            <MatButton style={style} className="btn btn-primary text-white mt-10 p-10" onClick={onContinue}>Continue</MatButton>
        </div>
    );
};

export default SendMoney;
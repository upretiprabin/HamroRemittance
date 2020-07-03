/**
 * Stepper 1 Transaction Details
 */
import React, { useState } from 'react';

// rct card box
import { RctCardContent } from 'Components/RctCard';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Input } from '@material-ui/core';

const StepOne = ({ saveData }) => {
    const [selectedCountry, setSelectedCountry] = useState('')
    const [ratesAndFees, setRatesAndFees] = useState({
        convertTo: "****",
        rate: "****",
        fees: "****"
    })
    const [countries, setCountries] = useState([{ code: "NP", currency: 'NRS', name: "Nepal", rate: 87.16, fees: 9.49 }, {
        code: "JP", name: "Japan", currency: 'YEN', rate: 88.85, fees: 9.99
    },])
    const onCountryChange = (e) => {
        setSelectedCountry(e.target.value)
        const selected = countries.find(data => data.code === e.target.value)
        setRatesAndFees({
            convertTo: selected.currency,
            rate: selected.rate,
            fees: selected.fees
        })
        saveData(selected)
    }
    return (
        <div className="row" >
            <div className='col-sm-6 col-md-4 w-xs-half-block'>
                <RctCardContent>
                    <div className='current-widget bg-info'>
                        <div className="d-flex justify-content-around">
                            <div className="form-group">
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="age-helper">Send Money To:</InputLabel>
                                    <Select value={selectedCountry} onChange={(e) => { onCountryChange(e) }}
                                        input={<Input name="age" id="age-helper" />}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {countries.map((country, index) => <MenuItem key={index} value={country.code}>{country.name}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>Select country to view rates</FormHelperText>
                                </FormControl>
                            </div>
                        </div>

                    </div>
                </RctCardContent>
            </div>
            <div className='col-sm-6 col-md-4 w-xs-half-block'>
                <RctCardContent >
                    <CardDataWithIcon
                        header='Rate per AUD'
                        data={selectedCountry === '' ? '****' : `${ratesAndFees.rate} ${ratesAndFees.convertTo}`}
                        iconRef='zmdi-money-box'
                        colorCode='bg-primary' />
                </RctCardContent>
            </div>
            <div className='col-sm-6 col-md-4 w-xs-half-block'>
                <RctCardContent >
                    <CardDataWithIcon
                        header='Fees'
                        data={`from ${ratesAndFees.fees} AUD`}
                        iconRef='zmdi-money-off'
                        colorCode='bg-success' />
                </RctCardContent>
            </div>
        </div >
    )
}
const CardDataWithIcon = ({ header, data, iconRef, colorCode }) => (
    <div className={`current-widget ${colorCode}`}>
        <div className="d-flex justify-content-between">
            <div className="align-items-start">
                <h3 className="mb-10">{header}</h3>
                <h2 className="mb-0">{data}</h2>
            </div>
            <div className="align-items-end">
                <i className={`zmdi ${iconRef}`}></i>
            </div>
        </div>
    </div>
);

export default StepOne;

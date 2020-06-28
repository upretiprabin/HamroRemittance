/* eslint-disable no-use-before-define */
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class ComboBox extends Component{

    state = {
        selectedValue : null
    };

    static getDerivedStateFromProps(props,state){
        return {selectedValue : props.selection?props.selection:null}
    }

    handleChange = (event,option,onSelectionChange)=>{
        Promise.resolve(this.setState({selectedValue:option}))
            .then(()=>{
                onSelectionChange(option)
            })
    };

    render()
    {
        const {index,selection,optionList,label,freeSolo,onSelectionChange} = this.props;
        const {selectedValue} = this.state;
        return (
            <Autocomplete
                className={selectedValue ? "selection" : ""}
                id={"combo-box-demo" + (index ? index : "")}
                freeSolo={freeSolo}
                options={optionList}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => {
                    return option.name === value.name
                }}
                style={{width: 300}}
                value={selection}
                onChange={(event, option) => {
                    this.handleChange(event, option, onSelectionChange)
                }}
                renderInput={(params) => <TextField {...params} label={selectedValue ? " " : label} margin="normal"/>
                }
                size={"small"}
            />
        );
    }
}

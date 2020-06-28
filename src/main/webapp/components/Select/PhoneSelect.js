import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "70%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const formatDisplay = (formatter,value)=>{
    if(formatter)
        value = formatter(value);
    return value
};

export default function NativeSelects(
    {
        selectName,
        label,
        onSelectionChange,
        selection,
        optionList,
        valueFieldName,
        displayFormatter,
        isAdd,
        newItemLabel
    }) {
    const classes = useStyles();
    let [selectedValue,setSelectedValue] = useState(selection?selection:null);
    valueFieldName = valueFieldName?valueFieldName:"name";

    if(selectedValue === "new")
        selectedValue = selection;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        Promise.resolve(setSelectedValue(value))
            .then(()=>{
                onSelectionChange(name,value)
            })
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor={selectName}>{label}</InputLabel>
                <Select
                    value={selectedValue?selectedValue:""}
                    onChange={handleChange}
                    label={label}
                    inputProps={{
                        name: selectName,
                        id: selectName,
                    }}
                >
                    {
                        !selectedValue &&
                        <MenuItem hidden value={""}/>
                    }
                    {optionList &&
                    optionList.map((option,index)=>{
                        return (
                            <MenuItem key={index} value={option[valueFieldName]}>{formatDisplay(displayFormatter,option[valueFieldName])}</MenuItem>
                        )
                    })
                    }
                    {isAdd &&
                    <MenuItem value={"new"}>{newItemLabel?newItemLabel:"Add new item"}</MenuItem>
                    }
                </Select>
            </FormControl>
        </div>
    );
}

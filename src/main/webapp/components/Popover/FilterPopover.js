import React,{Component} from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import {Card,CardTitle} from "reactstrap";
import Autocomplete from "Components/Autocomplete/Autocomplete";
import MatButton from "@material-ui/core/Button/Button";

export default class FilterPopover extends Component {
    state = {
        selectedOption : null,
        anchorEl : null
    };

    static getDerivedStateFromProps(props,state){
        let selectedOption = null;
        if(Boolean(state.anchorEl))
            selectedOption = state.selectedOption?state.selectedOption:props.selected;
        return {
            selectedOption
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl:null
        })
    };

    onApply = (selectedOption,allOption,onFilterApply)=>{
        let option = selectedOption?selectedOption:allOption;
        onFilterApply(option);
        this.setState({
            selectedOption : null
        });
        this.handleClose();
    };

    onReset = ()=>{
        this.setState({
            selectedOption : {'id':'all','name':'All'}
        })
    };

    onChange = (option)=>{
        this.setState({
            selectedOption : option
        })
    };

    render() {
        let {btnText,classNames,optionList,filterLabel,onFilterApply,selected} = this.props;
        const {selectedOption,anchorEl} = this.state;
        let allOption = {'id':'all','name':'All'};
        if(optionList){
            optionList = [allOption,...optionList];
        }
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <span>
        <Button className={classNames} onClick={(event)=>{this.handleClick(event)}}>
            {btnText}
        </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={()=>{this.handleClose()}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Card body className={"filter-bg"}>
                    <CardTitle>
                    <span className={"mr-10 table-filter-label"}>FILTERS</span>
                    <span>
                        <MatButton onClick={()=>{this.onReset()}} className="text-primary">
                            <span className="MuiButton-label">RESET</span>
                        </MatButton>
                    </span>
                    </CardTitle>
                    <div className={"mt-20"}>

                        <span className={"text-muted"} style={{
                            marginBottom: "-25px",
                            display: "block"
                        }}>{filterLabel}</span>
                        <Autocomplete selection={selectedOption} optionList={optionList} onSelectionChange={(option)=>{this.onChange(option)}}
                                      label={""}/>
                        <div style={{marginTop: '40px'}}>
                    <Button variant="contained" onClick={()=>{this.onApply(selectedOption,allOption,onFilterApply)}}>Apply</Button>
                    <div style={{"minWidth": "400px"}}> </div>
                    </div>
                    </div>
                </Card>
            </Popover>
        </span>
        );
    }
}
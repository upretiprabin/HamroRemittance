import React from 'react';
import { connect } from 'react-redux';
import DateTimeRangePicker from './index';
import moment from 'moment';
import {
    Button,
    Input
} from 'reactstrap';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CachedIcon from '@material-ui/icons/Cached';
import {updateDate,refreshDate,search} from "Actions/DateRangeActions";
import DownloadIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';
import $ from "jquery";
class PredefinedRanges extends React.Component {

    dateFormat = "MM/DD/YYYY";
    constructor(props) {
        super(props);

        this.state = {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'),moment().subtract(1, 'days')],
                'This week': [moment().startOf('week'), moment()],
                'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'This Month': [moment().startOf('month'), moment()],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Year': [moment().startOf('year'), moment()],
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment()],
            },
            victimSearch : null,
            dispatcherSearch : null
        };
    }

    static getDerivedStateFromProps(props,state){
        return {...state,startDate:props.fromDate,endDate:props.toDate}
    }

    componentDidMount(){
        if(this.props.isAlert)
            this.hideSearch();
    }

    hideSearch(){
        $("#searchForm").hide();
    }

    handleSearch(event,isVictim){
        let searchString = event.target.value;
        if(isVictim)
            this.setState({victimSearch:searchString});
        else
            this.setState({dispatcherSearch:searchString});
    }

    downloadAlert(){
        const {fromDate,toDate,victimSearch,dispatcherSearch} = this.props;
        AlertController.downloadAlertList(fromDate,toDate,victimSearch,dispatcherSearch);
    }

    resetAlertToolbar(){
        if(this.props.isAlert){
            document.getElementById("search-victim").value = null;
            document.getElementById("search-dispatcher").value = null;
            this.setState({victimSearch:null,dispatcherSearch:null});
            this.hideSearch();
        }
    }

    refresh(){
        this.resetAlertToolbar();
        this.props.refreshDate();
    }

    search(){
        this.props.search(this.state.victimSearch,this.state.dispatcherSearch);
    }

    getSelectedRange(start,end) {
        let format = this.dateFormat;
        let selectedRange = null;
        let ranges = this.state.ranges;
        for(let range in ranges){
            if(!selectedRange && ranges[range][0].format(format) === start.format(format) && ranges[range][1].format(format) === end.format(format)){
                selectedRange = range;
            }
        }
        if(!selectedRange)
            selectedRange = "Custom";
        return selectedRange
    }


    handleEvent(event, picker) {
        this.props.updateDate(picker.startDate,picker.endDate)
    }

    render() {
        let start = this.state.startDate.format(this.dateFormat);
        let end = this.state.endDate.format(this.dateFormat);
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        let buttonText = this.getSelectedRange(this.state.startDate,this.state.endDate);

        let labelStyle = {
            fontSize : "15px !important"
        };

        return (
            <div className={"row d-flex"}>
                <div className={"col-md-2"}>
                    <DateTimeRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        ranges={this.state.ranges}
                        onApply={(event,picker)=>{this.handleEvent(event,picker)}}
                        linkedCalendars={false}
                        applyClass={"apply-btn"}
                        showCustomRangeLabel={false}
                        // showDropdowns={true}
                    >
                        <Button className="selected-date-range-btn" color={""}>
                            <div className="pull-left pl-3">
                                <span>
                                    {buttonText}
                                </span>
                            </div>
                            <div className="pull-right pl-3">
                                <DateRangeIcon/>
                            </div>
                        </Button>
                    </DateTimeRangePicker>
                </div>
                <div className="col-md-3 pt-1 pl-3">
                    <span style={labelStyle}>{label}</span>
                </div>

            </div>
        );
    }

}

export default connect(null,{updateDate,refreshDate,search})(PredefinedRanges);
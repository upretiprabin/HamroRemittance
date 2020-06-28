import {REFRESH_DATE, UPDATE_DATE, SEARCH} from "Actions/types";

export const updateDate = (fromDate,toDate)=>({
    type : UPDATE_DATE,
    dates : {fromDate,toDate}
});

export const refreshDate = ()=>({
    type : REFRESH_DATE
});

export const search = (victimSearch,dispatcherSearch)=>({
    type : SEARCH,
    victimSearch,
    dispatcherSearch
});
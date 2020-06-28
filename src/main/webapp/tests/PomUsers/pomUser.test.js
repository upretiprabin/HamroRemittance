import React from 'react';
import {shallow} from 'enzyme';

import PomUsers from "../../routes/pomUsers"
import requestHandler from "Middleware/RequestHandler";
import controller from "../../controllers/controller"
const userObj = {
    "primaryEmail":"lukas.lampe@pom-co.com",
    "sessionPassword":"0011"
};
localStorage.setItem("user",JSON.stringify(userObj));

const INIT_STATE =  {
    filter: {
        showConnected: true,
        showDisconnected: true,
        showConnectedNA: true,
        showSilent: true,
        showLoud: true,
        showSilentNA: true
    },
    connectionStatusFilter: [ 'Show Connected', 'Show Disconnected', 'Show ConnectedNA' ],
    speakerStatusFilter: [ 'Show Silent', 'Show Loud', 'Show SilentNA' ],
    tableData: null,
    tableTotal: null,
    speakerStats: null,
    connectionStats: null,
    page: 0,
    isInWeeklyReport: false,
    loading: true,
    isManagerActive: false,
    tableLoading: true
};


describe("get filtered students",()=>{
    it("calls student/getStudents",async () =>{
        // const dummyResponse ={data:"0011"};
        //
        // //mock request handler
        // const loadData = jest.spyOn(requestHandler,'loadData')
        //     .mockImplementation(()=>Promise.resolve(dummyResponse));
        //
        //
        // // const wrapper = shallow(<PomUsers/>);
        // // expect(wrapper.state()).toStrictEqual(INIT_STATE);
        //
        // const ctx = {state:INIT_STATE}
        //
        // const a = await controller.loadData(ctx);
        //
        // // done();
        //
        // //test mock api
        // expect(loadData).toHaveBeenCalledTimes(1);
        // loadData.mockClear();

    });
});
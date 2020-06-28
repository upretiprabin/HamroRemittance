//to test signInUserWithEmailPassword
import { runSaga } from 'redux-saga';
import { call, put, takeEvery  } from 'redux-saga/effects';
import {signInUserWithEmailPassword} from '../../sagas/AuthenticationManager'
import requestHandler from '../../services/webServices/RequestHandler';
import {
    signinUserSuccess,
    signinUserFailure,
} from 'Actions';
import URL from '../../services/webServices/UrlMappings';

const mockSaga =(actionList,method,args)=>{
    return runSaga({
        dispatch: (action) => {
            actionList.push(action);
            return actionList;
        },
    }, method,args);
};

describe("sign in with username and password",()=>{
    it('should call login api with email and password',async ()=>{
        const email = "lukas.lampe@pom-co.com";
        const password = "password";
        const userObj = {payload:{user:{email,password},history:[]}};
        const dummyResponse ={data:"0011"};

        //mock request handler
        const loadData = jest.spyOn(requestHandler,'loadData')
            .mockImplementation(()=>Promise.resolve(dummyResponse));
        //run saga
        const dispatched = [];
        const result = await mockSaga(dispatched,signInUserWithEmailPassword,userObj);

        //test mock api
        expect(loadData).toHaveBeenCalledTimes(1);
        //test saga output
        expect(dispatched).toEqual([signinUserSuccess(dummyResponse.data)]);
        loadData.mockClear();
    });

});

describe("sign in with incorrect credentials",()=>{
    it('should call isUserEnabled api for bad credentials',async ()=>{
        const email = "lukas.lampe@pom-co.com";
        const password = "incorrect";
        const userObj = {payload:{user:{email,password},history:[]}};
        const dummyResponse = {data:"no-auth-password"};

        //mock request handler
        const loadData = jest.spyOn(requestHandler,'loadData')
            .mockImplementation((args)=>{
                if(args === URL.USER_CHECK_USER){
                    throw new Error("Bad Credentials")
                }else if (args === URL.USER_IS_USER_ENABLED){
                    return Promise.resolve(dummyResponse)
                }
            });
        //run saga
        const dispatched = [];
        const result = await mockSaga(dispatched,signInUserWithEmailPassword,userObj);

        //test mock api
        expect(loadData).toHaveBeenCalledTimes(2);
        //test saga output
        expect(dispatched).toEqual([signinUserFailure("Login failed. Either the email address or password is not correct.")]);
        loadData.mockClear();
    });

});
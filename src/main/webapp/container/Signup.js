/**
 * Sign Up With Firebase
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, withRouter } from 'react-router-dom';
import { Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

// components
// import SessionSlider from '../components/Widgets/SessionSlider';
import NameForm from '../components/FormComponents/NameForm'
import AddressForm from '../components/FormComponents/AddressForm';

// app config
import AppConfig from 'Constants/AppConfig';

// validators
import Validator from '../util/Validators'
import { Divider } from '@material-ui/core';
import DocumentIdentification from '../components/FormComponents/DocumentIdentification';

import Controller from "../controllers/userController"

import {
   signIn
} from 'Actions';


class Signup extends Component {

   state = {
      fName: { value: '', error: false },
      mName: { value: '', error: false },
      lName: { value: '', error: false },
      phone: { value: '', error: false },
      dob: { value: '', error: false },
      email: { value: '', error: false },
      password: { value: '', error: false },
      confirmPassword: { value: '', error: false },
      aLine1: { value: '', error: false },
      aLine2: { value: '', error: false },
      subUrb: { value: '', error: false },
      state: { value: '', error: false },
      zip: { value: '', error: false },
      country: { value: 'Australia' },
      nationality: { value: '', error: false },
      docType: { value: '', error: false },
      docExpiry: { value: '', error: false },
      docId: { value: '', error: false },
      file: { value: null, error: false }
   };

	/**
	 * On User Signup
	 */
   onUserSignUp() {
      var formData = {}
      if (!this.validator()) {
         for (let obj in this.state) {
            formData[obj] = this.state[obj].value
         }
         console.log(formData)
         /**
          * TODO register and redirect to dashboard on successful sign in
          */
      }
      Controller.register(this,formData)
   }
   onChangeValue = e => {
      let updatedState = this.state;
      updatedState[e.target.name].value = e.target.value
      this.setState({ ...updatedState })
   }
   onFileSelected = e => {
      let updatedState = this.state
      updatedState.file.value = e.target.files[0]
      this.setState({ ...updatedState })
   }
   validator = () => {
      let error = false
      let updatedState = this.state
      for (let obj in updatedState) {
         switch (obj) {
            case 'phone':
               if (!Validator.phoneValidator(updatedState[obj].value)) {
                  updatedState[obj].error = true
                  error = true
               } else {
                  updatedState[obj].error = false
               }
               break
            // case 'email':
            //    if (!Validator.emailValidator(updatedState[obj].value)) {
            //       updatedState[obj].error = true
            //       error = true
            //    } else {
            //       updatedState[obj].error = false
            //    }
            //    break
            // case 'password':
            //    if (!Validator.passwordValidator(updatedState[obj].value)) {
            //       updatedState[obj].error = true
            //       error = true
            //    } else {
            //       updatedState[obj].error = false
            //    }
            //    break
            // case 'confirmPassword':
            //    if (updatedState[obj].value !== updatedState.password.value) {
            //       updatedState[obj].error = true
            //       error = true
            //    } else {
            //       updatedState[obj].error = false
            //    }
            //    break
            case 'file':
               if (updatedState[obj].value === null) {
                  updatedState[obj].error = true
                  error = true
               } else {
                  updatedState[obj].error = false
               }
               break
            case 'mName':
            case 'aLine2':
               break
            default:
               if (updatedState[obj].value == '') {
                  updatedState[obj].error = true
                  error = true
               } else {
                  updatedState[obj].error = false
               }
               break
         }
      }
      this.setState({ ...updatedState })
      return error
   }
   render() {
      const {
         fName, mName, lName,
         phone, dob, email, password, confirmPassword,
         aLine1, aLine2, subUrb, state, zip, country, nationality,
         docType, docExpiry, docId, file
      } = this.state;
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
                              </Link>
                           </div>
                           <div>
                              <Link to="/signin" className="mr-15 text-white">Already have an account?</Link>
                              <Button
                                 component={Link}
                                 to="/signin"
                                 variant="contained"
                                 className="btn-light"
                              >
                                 Sign In
										</Button>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                                 <h2>Get started with {AppConfig.brandName}</h2>
                              </div>
                              <Form>
                                 <Label>User Details</Label>
                                 <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} />
                                 <div className='row mt-10'>
                                    <div className='col-sm-12 col-md-6 col-lg-4'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={phone.error}
                                             type="number"
                                             value={phone.value}
                                             name="phone"
                                             id="user-phone"
                                             className="has-input input-lg"
                                             placeholder="Phone Number*"
                                             onChange={(e) => {
                                                if (Number(e.target.value) || e.target.value == '')
                                                   this.onChangeValue(e)
                                             }}
                                          />
                                          <span className="has-icon"><i className="ti-mobile"></i></span>
                                          <FormFeedback>Invalid</FormFeedback>
                                       </FormGroup>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-4'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={dob.error}
                                             type="date"
                                             value={dob.value}
                                             name="dob"
                                             id="user-dob"
                                             className="has-input input-lg"
                                             placeholder="Date of Birth*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <FormFeedback>Required</FormFeedback>
                                       </FormGroup>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-4'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={nationality.error}
                                             type="nation"
                                             value={nationality.value}
                                             name="nationality"
                                             id="user-nation"
                                             className="has-input input-lg"
                                             placeholder="Nationality*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <span className="has-icon"><i className="ti-flag-alt-2"></i></span>
                                          <FormFeedback>Required</FormFeedback>
                                       </FormGroup>
                                    </div>
                                 </div>
                                 <Label>User Address</Label>
                                 <AddressForm aLine1={aLine1} aLine2={aLine2} subUrb={subUrb} zip={zip} state={state} country={country} disabledCountry={true} onChangeValue={this.onChangeValue} />
                                 <Label>User Documents</Label>
                                 <DocumentIdentification file={file} docType={docType} docExpiry={docExpiry} docId={docId} onChangeValue={this.onChangeValue} onFileSelected={this.onFileSelected} />
                                 <h5>By submitting this form, you accept Hamro Remittance's <a className="text-primary">Terms and Conditions</a> and <a className="text-primary">Privacy Policy</a>.</h5>
                                 <FormGroup className="mb-15">
                                    <Button
                                       className="btn-info text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.onUserSignUp()}>
                                       Register
                            			</Button>
                                 </FormGroup>
                              </Form>
                           </div>
                        </div>
                        {/*<div className="col-sm-3 col-md-3 col-lg-3">
                           <SessionSlider />
                        </div>*/}
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim >
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { loading } = authUser;
   return { loading };
};

export default withRouter(connect(mapStateToProps, { signIn })(Signup));

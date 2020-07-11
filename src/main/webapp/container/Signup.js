/**
 * Sign Up With Firebase
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';

// components
import SessionSlider from '../components/Widgets/SessionSlider';
import NameForm from '../components/FormComponents/NameForm'
import AddressForm from '../components/FormComponents/AddressForm';

// app config
import AppConfig from 'Constants/AppConfig';

// validators
import Validator from '../util/Validators'

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
      state: { value: '', error: false },
      zip: { value: '', error: false },
      country: { value: 'Australia' },
      sOfFund: { value: '', error: false },
      nationality: { value: '', error: false },
   };

	/**
	 * On User Signup
	 */
   onUserSignUp() {
      if (!this.validator()) {
         var formData = {}
         for (let obj in this.state) {
            formData[obj] = this.state[obj].value
         }
         console.log(formData)
         /**
          * TODO register
          */
      }
   }
   onChangeValue = e => {
      let updatedState = this.state;
      updatedState[e.target.name].value = e.target.value
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
            case 'email':
               if (!Validator.emailValidator(updatedState[obj].value)) {
                  updatedState[obj].error = true
                  error = true
               } else {
                  updatedState[obj].error = false
               }
               break
            case 'password':
               if (!Validator.passwordValidator(updatedState[obj].value)) {
                  updatedState[obj].error = true
                  error = true
               } else {
                  updatedState[obj].error = false
               }
               break
            case 'confirmPassword':
               if (updatedState[obj].value === updatedState.password.value) {
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
      const { fName, mName, lName, phone, dob, email, password, confirmPassword, aLine1, aLine2, state, zip, country, sOfFund, nationality } = this.state;
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
                        <div className="col-sm-9 col-md-9 col-lg-9">
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                                 <h2>Get started with {AppConfig.brandName}</h2>
                              </div>
                              <Form>
                                 <NameForm fName={fName} mName={mName} lName={lName} onChangeValue={this.onChangeValue} />
                                 <div className='row mt-10'>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={email.error}
                                             type="mail"
                                             value={email.value}
                                             name="email"
                                             id="user-mail"
                                             className="has-input input-lg"
                                             placeholder="Email Address*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <span className="has-icon"><i className="ti-email"></i></span>
                                          <FormFeedback>Email address in not valid</FormFeedback>
                                       </FormGroup>
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
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
                                          <FormFeedback>Required</FormFeedback>
                                       </FormGroup>
                                    </div>
                                 </div>
                                 <div className='row'>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={password.error}
                                             value={password.value}
                                             type="Password"
                                             name="password"
                                             id="pwd"
                                             className="has-input input-lg"
                                             placeholder="Password*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <span className="has-icon"><i className="ti-lock"></i></span>
                                          <FormFeedback>Password must contain more than 8 characters, 1 or more special character and a combination of upper and lowercase characters</FormFeedback>
                                       </FormGroup>
                                    </div><div className='col-sm-12 col-md-6 col-lg-6'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={confirmPassword.error}
                                             value={confirmPassword.value}
                                             type="password"
                                             name="confirmPassword"
                                             id="confm-pwd"
                                             className="has-input input-lg"
                                             placeholder="Confirm Password*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <span className="has-icon"><i className="ti-lock"></i></span>
                                          <FormFeedback>Passwords dont match or empty passwords</FormFeedback>
                                       </FormGroup>
                                    </div>
                                 </div>
                                 <div className='row mt-10'>
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
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
                                    <div className='col-sm-12 col-md-6 col-lg-6'>
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
                                 <AddressForm aLine1={aLine1} aLine2={aLine2} zip={zip} state={state} country={country} disabledCountry={true} onChangeValue={this.onChangeValue} />
                                 <div className='row'>
                                    <div className='col-sm-12 col-md-12 col-lg-12'>
                                       <FormGroup className="has-wrapper">
                                          <Input
                                             invalid={sOfFund.error}
                                             type="text"
                                             value={sOfFund.value}
                                             name="sOfFund"
                                             id="sOfFund"
                                             className="has-input input-lg"
                                             placeholder="Source of funds*"
                                             onChange={(e) => this.onChangeValue(e)}
                                          />
                                          <span className="has-icon"><i className="ti-money"></i></span>
                                          <FormFeedback>Required</FormFeedback>
                                       </FormGroup>
                                    </div>
                                 </div>
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
                        <div className="col-sm-3 col-md-3 col-lg-3">
                           <SessionSlider />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
   const { loading } = authUser;
   return { loading };
};

export default connect(mapStateToProps)(Signup);

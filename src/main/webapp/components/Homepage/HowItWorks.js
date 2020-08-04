import React from "react";

const HowItWorks = ({onSignUp,noSignup})=>{
    return (
        <div id={"how-it-works"} className="how-it-works section">
            <div className="container">
                <div className="container">
                    <h2 className="text-9 text-center">How does it work?</h2>
                    <p className="text-4 text-center mb-70">Hamro remit is very fast, simple and safe. Here are the
                        few steps you need to follow to make your transaction</p>
                    <div className="row">
                        <div className="col-sm-4 mb-4">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">1</span></div>
                                <h3 className="mb-3">Create an account</h3>
                                <p className="text-3 font-weight-300">Sign up for your free
                                    personal account just in a minute</p>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">2</span></div>
                                <h3 className="mb-3">Select the amount</h3>
                                <p className="text-3 font-weight-300">Select the required amount. You will get our transfer rates and service charge instantly</p>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">3</span></div>
                                <h3 className="mb-3">Pick your transfer method</h3>
                                <p className="text-3 font-weight-300">You can pay via Bank or Local Remit</p>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">4</span></div>
                                <h3 className="mb-3">Select recipient</h3>
                                <p className="text-3 font-weight-300">Pick existing recipient or create new
                                    one</p>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">5</span></div>
                                <h3 className="mb-3">Verify document and source</h3>
                                <p className="text-3 font-weight-300">Upload your identity document and mention source of fund</p>
                            </div>
                        </div>
                        <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="featured-box style-4">
                                <div className="featured-box-icon text-dark shadow-none border-bottom"><span
                                    className="w-100 text-20 font-weight-500">6</span></div>
                                <h3 className="mb-3">Confirm and send</h3>
                                <p className="text-3 font-weight-300">Confirm your transaction with the help of detailed summary</p>
                            </div>
                        </div>
                    </div>
                    {!noSignup &&
                        <div className="text-center mt-2">
                            <a href="#" onClick={onSignUp} className="btn btn-outline-primary shadow-none mt-2">
                                Open a Free Account</a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
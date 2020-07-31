import {Card} from "reactstrap";
import React from "react";

const WhyChooseUs = ({}) =>{
    return(
        <div className="choose mb-40">
        <Card body>
            <h2 className={"text-9 text-center mt-60"}>Why should you choose Hamro Remit?</h2>
            <p className="text-4 text-center mb-5">Here’s Top 4 reasons why</p>
            <div className="mt-30 container mb-30">
                <div className="row">
                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                        <div className="featured-box">
                            <div className="featured-box-icon text-primary">
                                <i className="fa fa-hand-pointer-o fa-lg" aria-hidden="true"/></div>
                            <h3>Easy to use</h3>
                            <p className="text-3">We provide sophisticated UI which makes your
                                transaction smooth and easy </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                        <div className="featured-box">
                            <div className="featured-box-icon text-primary">
                                <i className="fa fa-share fa-lg" aria-hidden="true"/></div>
                            <h3>Faster Payments</h3>
                            <p className="text-3">We have developed our system to be quick. We won't
                                keep you waiting for long</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                        <div className="featured-box">
                            <div className="featured-box-icon text-primary">
                                <i className="fa fa-dollar fa-lg" aria-hidden="true"/></div>
                            <h3>Lower Fees</h3>
                            <p className="text-3">We charge very reasonable service to our customer</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 mb-5 mb-lg-0">
                        <div className="featured-box">
                            <div className="featured-box-icon text-primary">
                                <i className="fa fa-lock fa-lg" aria-hidden="true"/></div>
                            <h3>100% Secure</h3>
                            <p className="text-3">Our main goal is to make our customers feel safe about
                                their transactions. We guarantee 100% security</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
    );
};

export default WhyChooseUs;
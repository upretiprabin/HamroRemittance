import React from 'react';
import RctHorizontalLayout from "../components/RctHorizontalLayout";
import {Link} from "react-router-dom";
import {userFromLocalStorage} from "../sagas/AuthenticationManager";

const Content = () =>{
    const user = userFromLocalStorage();
    return (
        <div className={"about-us"}>
            <section className="page-header page-header-text-light py-0 mb-0">
                <section className="hero-wrap section">
                    <div className="hero-mask opacity-5"/>
                    <div className="hero-bg hero-bg-scroll"/>
                    <div className="hero-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h1 className="text-11 font-weight-500 text-white mb-4">About Hamro Remit</h1>
                                    <p className="text-5 text-white line-height-4 mb-4">Our mission is to help you save
                                        on transfer fees and exchange rates!</p>
                                    <span>
                                        {!user &&
                                            <Link to={"/signUp"} className="btn btn-primary m-2">Open a Free Account</Link>
                                        }
                                        <Link to={"/how-it-works"} className={"btn btn-outline-light m-2"} >See How it Works</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex">
                            <div className="my-auto px-0 px-lg-5 mx-2">
                                <h2 className="text-9">Who we are</h2>
                                <p className="text-4">
                                    Hamro Remit is a money transfer company registered and operated from Australia under the Licensed from Australian Transaction Reports and Analysis Centre (Austrac) with the Austrac Account Number 100694664
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 my-auto text-center">
                            <img className="img-fluid shadow-lg rounded-lg" src={require("Assets/img/about-1.jpg")} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section bg-blue-gray">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="row">
                                <div className="col-6 col-lg-7 ml-auto mb-lg-n5">
                                    <img className="img-fluid rounded-lg shadow-lg"
                                         src={require("Assets/img/about-2.png")}
                                         alt="banner"/>
                                </div>
                                <div className="col-6 col-lg-8 mt-lg-n5">
                                    <img className="img-fluid rounded-lg shadow-lg"
                                         src={require("Assets/img/about-3.png")}
                                         alt="banner"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex order-1 order-lg-2">
                            <div className="my-auto px-0 px-lg-5">
                                <h2 className="text-9 mb-4">Our Values</h2>
                                <h4 className="text-4 font-weight-500">Our Mission</h4>
                                <p className="text-3">
                                    Hamro Remit has an objective of providing prompt, reliable, affordable and better reach in remittance service
                                </p>
                                <h4 className="text-4 font-weight-500 mb-2">Our Vision</h4>
                                <p className="text-3">
                                    Hamro Remit started with a dream to offer world class remittance service and deliver the most wonderful feeling to our valued customers
                                </p>
                                <h4 className="text-4 font-weight-500 mb-2">Our Network</h4>
                                <p className="text-3">
                                    We have the largest payment network in Nepal which covers 77 districts with more than 10,000 paying agents authorized by Nepal Rastra Bank (Central Bank of Nepal)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

const AboutUs = () =>{
    return (
        <RctHorizontalLayout isDefault={true}>
            <Content/>
        </RctHorizontalLayout>
    );
};

export default AboutUs;
/**
 ** Session Slider
 **/
import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class SessionSlider extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            swipe: true,
            touchMove: true,
            swipeToSlide: true,
            draggable: true
        };
        const wallpapers = [require("Assets/img/dashboard/166027.jpg"),require("Assets/img/dashboard/166015.jpg"),require("Assets/img/dashboard/166134.jpg")];
        return (
            <div className="session-slider">
                <Slider {...settings}>
                    {wallpapers.map((img,index)=>{
                        return(
                            <div key={index}>
                                <img
                                    src={img}
                                    alt="session-slider"
                                    className="img-fluid"
                                    width={1920}
                                    height={500}
                                />
                            </div>
                        )
                    })
                    }
                </Slider>
            </div>
        );
    }
}

/**
 ** Session Slider
 **/
import React, { Component } from "react";
import Slider from "react-slick";

export default class SessionSlider extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
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
                                    width={"100%"}
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

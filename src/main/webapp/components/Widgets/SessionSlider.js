/**
** Session Slider
**/
import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class SessionSlider extends Component {

	state = {
		sessionUsersData: null
	}

	componentDidMount() {
		this.getSessionUsersData();
	}

	// session users data
	getSessionUsersData() {
		let dummyData = [{"id":1,"name":"Mia Mabanta","avatar":"https://reactify.theironnetwork.org/data/images/user-1.jpg","profile":"https://reactify.theironnetwork.org/data/images/client-1.png","designation":"UI Developer","body":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."},{"id":2,"name":"Emmy Loren","avatar":"https://reactify.theironnetwork.org/data/images/user-2.jpg","profile":"https://reactify.theironnetwork.org/data/images/client-2.png","designation":"UX Developer","body":"Sed consequat lobortis risus, vitae congue nulla tempor id. Curabitur eu augue id nibh tristique tristique. Phasellus vel est nisi"},{"id":3,"name":"Astell Mercell","avatar":"https://reactify.theironnetwork.org/data/images/user-3.jpg","profile":"https://reactify.theironnetwork.org/data/images/client-3.png","designation":"Director of Brand Development at Quartz","body":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}]
		Promise.resolve(this.setState({ sessionUsersData: dummyData }))
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			swipe: true,
			touchMove: true,
			swipeToSlide: true,
			draggable: true
		};
		const { sessionUsersData } = this.state;
		return (
			<div className="session-slider">
				<Slider {...settings}>
					{(sessionUsersData && sessionUsersData !== null) && sessionUsersData.map((data, key) => (
						<div key={key}>
							<img
								src={data.profile}
								alt="session-slider"
								className="img-fluid"
								width="377"
								height="588"
							/>
							<div className="rct-img-overlay">
								<h5 className="client-name">{data.name}</h5>
								<span>{data.designation}</span>
								<p className="mb-0 fs-14">{data.body}</p>
							</div>
						</div>
					))}
				</Slider>
			</div>
		);
	}
}

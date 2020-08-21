import React, { Component } from 'react';

class CustomIcon extends Component{
    _isMounted = false;

    state = {
        name: ''
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        if (this._isMounted) {
            this.setState(data)
        }
    }

    action = () => {
        this.props.action();
    }

    render(){
       const {name, title, action} = this.props;
        return (
            <span onClick={this.action}><i className={name} title={title}></i></span>
        )
    }
}

export default CustomIcon;
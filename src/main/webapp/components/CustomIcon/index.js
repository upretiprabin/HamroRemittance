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
       const {name, title, preText, action} = this.props;
        return (
            <div className="d-flex">
                {preText && <h4> {preText} &nbsp;&nbsp;&nbsp; <span onClick={this.action}><i className={name} title={title}></i></span></h4>}
                {!preText && <span onClick={this.action}><i className={name} title={title}></i></span>}
            </div>
        )
    }
}

export default CustomIcon;
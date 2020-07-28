/**
 * Receiver List
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class ReceiverList extends Component {

    state = {
        people: null
    }

    componentDidMount() {
        this.getDiscoverPeoples();
    }

    // get discover peoples
    getDiscoverPeoples() {
        this.setState({ people: [{ "id": 1, "name": "Kate Doyle", "status": true, "photo_url": "https://reactify.theironnetwork.org/data/images/user-1.jpg" }, { "id": 2, "name": "Lizzie Ortiz", "status": false, "photo_url": "https://reactify.theironnetwork.org/data/images/user-6.jpg" }, { "id": 3, "name": "Mario Santos", "status": true, "photo_url": "https://reactify.theironnetwork.org/data/images/user-7.jpg" }, { "id": 5, "name": "Mattie Gill", "status": true, "photo_url": "https://reactify.theironnetwork.org/data/images/user-8.jpg" }, { "id": 6, "name": "Leona Douglas", "status": false, "photo_url": "https://reactify.theironnetwork.org/data/images/user-4.jpg" }] })
    }

    /**
     * Function to follow and unfolow people
     * @param {object} data
     */
    togglePeopleFollow(key) {
        let people = this.state.people;
        people[key].status = !people[key].status;
        this.setState({ people });
    }

    render() {
        const { people } = this.state;
        return (
            <List className="discover-list-wrap">
                {people && people.map((data, key) => (
                    <ListItem key={key}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex align-items-center">
                                <div className="media">
                                    <div className="media-left mr-20">
                                        <img src={data.photo_url} alt="user profile" className="rounded-circle img-fluid" width="55" height="55" />
                                    </div>
                                    <div className="media-body pt-15">
                                        <p className="mb-0 text-muted">{data.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <Fab color="primary" aria-label="add" size="small" onClick={() => this.togglePeopleFollow(key)}>
                                    <EditIcon />
                                </Fab>
                            </div>
                        </div>
                    </ListItem>
                ))}
                <ListItem button>
                    <div className="d-flex justify-content-center w-100">
                        <div className="d-flex align-items-center">
                            <span className={classnames('badge badge-pill badge-lg', { 'badge-info': true, 'badge-dark': true })}>Add Receiver</span>
                        </div>
                    </div>
                </ListItem>
            </List>
        );
    }
}

export default ReceiverList;

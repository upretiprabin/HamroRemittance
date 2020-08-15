/**
 * Receiver List
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Controller from '../../controllers/dashboardController'
import { getRandomColor } from '../../util/helpers';

class ReceiverList extends Component {

    state = {
        people: []
    }

    componentDidMount() {
        this.getDiscoverPeoples();
    }

    getDiscoverPeoples() {
        Controller.fetchReceivers(this);
    }

    editReceiver(key) {
        /**TODO
         * Redirect to receiver page
         */
    }

    render() {
        const { people } = this.state;
        return (
            <List className="discover-list-wrap">
                {people.length === 0 &&
                    <ListItem>
                        <div className="d-flex justify-content-center w-100">
                            <div className="d-flex align-items-center">
                                <i>No Receivers added.</i>
                            </div>
                        </div>
                    </ListItem>
                }
                {people && people.map((data, key) => (
                    <ListItem key={key}>
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex align-items-center">
                                <div className="media">
                                    <div className="media-left mr-20">
                                        <div className="user-image-alt p-10" style={{ background: getRandomColor() }}>{`${data.receiver.firstName[0]} ${data.receiver.lastName[0]}`}</div>
                                    </div>
                                    <div className="media-body pt-15">
                                        <p className="mb-0 text-muted">{`${data.receiver.firstName} ${data.receiver.lastName}`}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <Fab color="primary" aria-label="add" size="small" onClick={() => this.editReceiver(key)}>
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

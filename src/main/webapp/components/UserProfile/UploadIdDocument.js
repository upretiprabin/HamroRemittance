/**
 * Update user document
 */

import React, { Component } from 'react'
import { FormGroup } from 'reactstrap';
import DocumentIdentification from '../FormComponents/DocumentIdentification';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
class UploadIdDocument extends Component {

    _isMounted = false;
    state = {
        loading: false,
        docId: { value: '', error: false },
        docType: { value: '', error: false },
        docExpiry: { value: '', error: false },
        file: { value: null, error: false },
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        if (this._isMounted) {
            this.setState(data)
        }
    }

    onChangeValue = e => {
        let updatedState = this.state;
        updatedState[e.target.name].value = e.target.value;
        this.setState({ ...updatedState })
    };

    loadData() {
        // Controller.loadUserData(this)
    }
    render() {
        const {
            docExpiry, docType, docId, file
        } = this.state
        return (
            <div>

                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <p className="text-danger"><b>**Warning:</b> This will overwrite your previous document uploaded!!</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                        <DocumentIdentification file={file} docType={docType} docId={docId} docExpiry={docExpiry} onChangeValue={this.onChangeValue} onFileSelected={e => console.log(e)} />
                    </div>
                </div>

                <FormGroup className="mb-15 mr-auto ml-auto text-center">
                    <Button
                        className="text-white pr-20 pl-20 btn-primary"
                        variant="contained"
                        size="large"
                        onClick={() => this.onRegister()}>
                        Update Document
                    </Button>
                    <Button
                        className="text-white pr-20 pl-20 ml-10 btn-secondary"
                        variant="contained"
                        size="large"
                        onClick={() => this.props.history.push('dashboard')}>
                        Cancel
                    </Button>
                </FormGroup>
            </div>
        )
    }
}

export default withRouter(UploadIdDocument)
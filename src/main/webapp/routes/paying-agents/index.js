import React, { Component } from 'react'
import ErrorBoundary from "Components/ErrorBoundary/index";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Paper, Tabs, Tab } from '@material-ui/core';
import PayingAgentsStatement from '../../components/PayingAgents/PayingAgentsStatement';
import PayingAgentsCreateTransaction from '../../components/PayingAgents/PayingAgentsCreateTransaction';
import PayingAgentsCreate from '../../components/PayingAgents/PayingAgentsCreate';

class Index extends Component {

    _isMounted = false;

    state = {
        loading: false,
        index: 0,
    };

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    changeState(data) {
        this.setState(data)
    }

    loadData() {
    }
    changeSelected(id) {
        this.setState({ selected: id })
    }
    handleIndexChange = (e,i) =>{
        this.changeState({index:i})
    }
    render() {
        const { loading,index } = this.state
        return (
            <div className="mt-30">
                <ErrorBoundary>
                    {loading &&
                        <div className="page-loader d-flex justify-content-center mb-30">
                            <CircularProgress />
                        </div>
                    }
                    {!loading &&
                        <RctCollapsibleCard heading="Paying Agents">
                                <Paper>
                                    <Tabs
                                        value={index}
                                        onChange={(e,i)=>this.handleIndexChange(e,i)}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Statement" />
                                        <Tab label="Create Transaction" />
                                        <Tab label="Create Paying Agent" />
                                    </Tabs>
                                    {index == 0 && <PayingAgentsStatement />}
                                    {index == 1 && <PayingAgentsCreateTransaction />}
                                    {index == 2 && <PayingAgentsCreate />}
                                </Paper>
                        </RctCollapsibleCard>
                    }
                </ErrorBoundary>
            </div>
        )
    }
}
export default Index;
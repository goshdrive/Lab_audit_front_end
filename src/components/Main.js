import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { TestHistory } from './TestHistory';
import { Inventory } from './Inventory';
import { connect } from 'react-redux';
import { deleteReagents, postReagents, fetchReagents, deleteTests, fetchTests, switchTests, fetchTestTypes} from '../redux/ActionCreators'
import { actions } from 'react-redux-form';


const mapStateToProps = state => {
    return {
        reagents: state.reagents,
        tests: state.tests,
        testTypes: state.testTypes
    }     
}

const mapDispatchToProps = (dispatch) => ({    
    deleteReagents: (reagent_id) => {dispatch(deleteReagents(reagent_id))},
    postReagents: (
        reagent_name,
        supplier,
        lot_number,
        cat_number,
        expiry_date,
        date_received,
        storage_location) => dispatch(postReagents(reagent_name, supplier, lot_number, cat_number, expiry_date, date_received, storage_location)),    
    fetchReagents: () => {dispatch(fetchReagents())},
    fetchTests: () => {dispatch(fetchTests())},
    switchTests: (tests) => {dispatch(switchTests(tests))},
    deleteTests: (test_id) => {dispatch(deleteTests(test_id))},
    fetchTestTypes: () => {dispatch(fetchTestTypes())},
    resetAddReagentForm: () => {dispatch(actions.reset('addReagent'))},
    changeAddReagentForm: (data) => {dispatch(actions.change('addReagent', data))},
    resetEditReagentForm: () => {dispatch(actions.reset('editReagent'))},
    changeEditReagentForm: (data) => {dispatch(actions.change('editReagent', data))}    
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchReagents();
        this.props.fetchTests();
        this.props.fetchTestTypes();
    }

    render() {
        const InventoryPage = () => {
            return(
                <Inventory reagents={this.props.reagents.reagents} 
                    reagentsErrMess={this.props.reagents.errMess}
                    postReagents={this.props.postReagents}
                    deleteReagents={this.props.deleteReagents} 
                    resetAddReagentForm={this.props.resetAddReagentForm}
                    changeAddReagentForm= {this.props.changeAddReagentForm}
                    resetEditReagentForm={this.props.resetEditReagentForm}
                    changeEditReagentForm= {this.props.changeEditReagentForm} />
            );
        }

        const TestHistoryPage = () => {
            return(
                <TestHistory tests={this.props.tests.tests} 
                    testsErrMess={this.props.tests.errMess} 
                    switchTests={this.props.switchTests}
                    fetchTests={this.props.fetchTests}
                    deleteTests={this.props.deleteTests} />
            );
        }

        const AssayPage = () => {
            return(
                <Assays testTypes={this.props.testTypes.testTypes} 
                    testTypesErrMess={this.props.testTypes.errMess} />
            );
        }

        return(
            <div id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <Switch>
                    <Route path="/inventory" component={InventoryPage}/>
                    <Route exact path="/testhistory" component={TestHistoryPage}/>
                    <Route exact path="/assays" component={AssayPage}/>
                    <Route exact path="/account" component={AccountDetails}/> 
                    <Redirect to="/inventory"/>
                </Switch>
            </div>
            
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
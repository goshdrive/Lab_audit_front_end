import React, { Component } from 'react';
import Assays from './Assays'
import AccountDetails from './AccountDetails'
import Sidebar from './Sidebar.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Login } from './Login';
import { TestHistory } from './TestHistory';
import TestHistoryNEW from './TestHistoryNEW';
import { Inventory } from './Inventory';
import InventoryNEW from './InventoryNEW';
import InvSecReagentsOverview from './InvSecReagentsOverview';
import { connect } from 'react-redux';
import { checkJWTToken, loginUser, logoutUser, putReagent, deleteReagent, postReagent, fetchReagents, fetchDeletedReagents,
    fetchSecReagents, fetchDeletedSecReagents, putSecReagent, deleteSecReagent, 
    deleteTest, fetchTests, putTest, fetchTestTypes,
    postTestType} from '../redux/ActionCreators.js'


const mapStateToProps = state => {
    return {
        reagents: state.reagents,
        deletedReagents: state.deleteReagents,
        secReagents: state.secReagents,
        deletedSecReagents: state.deletedSecReagents,
        tests: state.tests,
        testTypes: state.testTypes,
        auth: state.auth
    }     
}

const mapDispatchToProps = (dispatch) => ({   
    checkJWTToken: () => dispatch(checkJWTToken()), 
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()), 
    putReagent: (reagent) => {dispatch(putReagent(reagent))},
    deleteReagent: (reagent_id) => {dispatch(deleteReagent(reagent_id))},
    postReagent: (
        unit,
        reagentName,
        supplier,
        lotNr,
        catNr,
        expiryDate,
        dateReceived,
        storageLocation
        ) => dispatch(postReagent(unit, reagentName, supplier, lotNr, catNr, expiryDate, dateReceived, storageLocation)),    
    fetchReagents: () => {dispatch(fetchReagents())},
    fetchDeletedReagents: () => {dispatch(fetchDeletedReagents())},
    fetchSecReagents: () => {dispatch(fetchSecReagents())},
    fetchDeletedSecReagents: () => {dispatch(fetchDeletedSecReagents())},
    putSecReagent: (secReagent) => {dispatch(putSecReagent(secReagent))},
    deleteSecReagent: (secReagent_id) => {dispatch(deleteSecReagent(secReagent_id))},
    fetchTests: () => {dispatch(fetchTests())},
    putTest: (updatedTest) => {dispatch(putTest(updatedTest))},
    deleteTest: (test_id) => {dispatch(deleteTest(test_id))},
    fetchTestTypes: () => {dispatch(fetchTestTypes())},
    postTestType: (newTestType) => {dispatch(postTestType(newTestType))}   
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.fetchReagents();
            this.props.fetchDeletedReagents();
            this.props.fetchSecReagents();
            this.props.fetchDeletedSecReagents();
            this.props.fetchTests();
            this.props.fetchTestTypes();
            this.props.checkJWTToken();
            //alert(JSON.stringify(this.props.auth.user))
        } 
        //alert("Mounted")
        
    }

    render() {
        const InventoryPage = () => {
            return(
                <InventoryNEW 
                    logoutUser={this.props.logoutUser}
                    // Primary Reagents
                    reagents={this.props.reagents.reagents}
                    deletedReagents={this.props.reagents.deletedReagents}
                    fetchReagents={this.props.fetchReagents} 
                    reagentsErrMess={this.props.reagents.errMess}
                    postReagent={this.props.postReagent}
                    deleteReagent={this.props.deleteReagent} 
                    putReagent={this.props.putReagent}
                    // Secondary Reagents
                    secReagents={this.props.secReagents.secReagents} 
                    deletedSecReagents={this.props.secReagents.deletedSecReagents}
                    fetchSecReagents={this.props.fetchSecReagents}
                    secReagentsErrMess={this.props.secReagents.errMess}
                    deleteSecReagent={this.props.deleteSecReagent} 
                    putSecReagent={this.props.putSecReagent}
                    />
            );
        }

        const TestHistoryPage = () => {
            return(
                <TestHistoryNEW tests={() => this.props.tests.tests.filter(entry => entry.status != "DELETED")}
                    deletedTests={() => this.props.tests.tests.filter(entry => entry.status == "DELETED")}
                    myTests={() => (this.props.tests.tests.filter(entry => entry.conductedByUsername == this.props.auth.user.username))} 
                    testsErrMess={this.props.tests.errMess} 
                    fetchTests={this.props.fetchTests}
                    putTest={this.props.putTest}
                    deleteTest={this.props.deleteTest} 
                    logoutUser={this.props.logoutUser}/>
            );
        }

        const AssayPage = () => {
            return(
                <Assays testTypes={this.props.testTypes.testTypes} 
                    testTypesErrMess={this.props.testTypes.errMess} 
                    postTestType={this.props.postTestType}
                    logoutUser={this.props.logoutUser}/>
            );
        }

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
          );

        return(
                <>
                <Switch>
                    <Route path="/login" 
                        component={() => 
                            (<Login 
                                auth={this.props.auth} 
                                loginUser={this.props.loginUser} 
                                logoutUser={this.props.logoutUser}
                                fetchReagents={this.props.fetchReagents}
                                fetchDeletedReagents={this.props.fetchDeletedReagents}
                                fetchSecReagents={this.props.fetchSecReagents}
                                fetchDeletedSecReagents={this.props.fetchDeletedSecReagents}
                                fetchTests={this.props.fetchTests}
                                fetchTestTypes={this.props.fetchTestTypes}/>)}/>
                    {/*<Route path="/inventory" component={InventoryPage}/>*/}
                    <PrivateRoute exact path="/inventory/primary-reagents/overview" component={InventoryPage}/>
                    <PrivateRoute exact path="/inventory/primary-reagents/recent" component={InventoryPage}/>
                    <PrivateRoute exact path="/inventory/primary-reagents/bin" component={InventoryPage}/>
                    <PrivateRoute exact path="/inventory/secondary-reagents/overview" component={InventoryPage}/>
                    <PrivateRoute exact path="/inventory/secondary-reagents/recent" component={InventoryPage}/>
                    <PrivateRoute exact path="/inventory/secondary-reagents/bin" component={InventoryPage}/>
                    <PrivateRoute exact path="/testhistory/all-tests/overview" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/testhistory/all-tests/recent" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/testhistory/all-tests/bin" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/testhistory/my-tests/overview" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/testhistory/my-tests/recent" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/testhistory/my-tests/bin" component={TestHistoryPage}/>
                    <PrivateRoute exact path="/assays" component={AssayPage}/>
                    <PrivateRoute exact path="/account" component={AccountDetails}/> 
                    <Redirect to="/inventory/primary-reagents/overview" />
                </Switch>
                </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
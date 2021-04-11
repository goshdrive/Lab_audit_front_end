import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import Sidebar from './Sidebar';

const required = value => (value ? undefined : 'Required')
const matchesOldPassword = oldPassword => value => ( value == oldPassword ? undefined : 'Does not match old password' )
const newPasswordsMatch = newPassword => value => ( value == newPassword ? undefined : 'Passwords do not match' )
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

class AccountDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '1234567',
            editPassword: false,
        }
    }

    editPassword = () => {
        this.setState({
            editPassword: true
        });
    }

    handleSubmit = async values => {
        alert(values);
    }

    render() {
        return (
            <div id="page-wrap" className="container-fluid">         
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} logoutUser={this.props.logoutUser} />                               
                <div className="row flex-fill h-100 d-flex">
                    <div className="col">
                        <div style={{"z-index":"10", "position":"fixed", "border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-top": "0px", "padding": "10px", "width":"110%"}} className="row header">
                            <div className="col ml-5">
                                <span className="menu-header"> Account Details </span>
                            </div>
                        </div>
                        <div style={{"border-right":"1px solid #E2E2E4", "paddingTop":"81px", "paddingLeft":"18px"}} className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="row">
                                            <div className="col-3">
                                                <a className="account-icon" href="/account"><span className="dot" style={{"height": "50px",
                                                                        "width": "50px",
                                                                        "border": "0.5px solid rgba(229, 229, 229, 1)",
                                                                        "background-color": "#ffffff",
                                                                        "border-radius": "50%",
                                                                        "display": "inline-block",
                                                                        "box-shadow": "0px 0px 1px 0px #888888",
                                                                        "padding":"12px",
                                                                        "margin-right":"10px",
                                                                        "color":"#432F87",
                                                                        "font-weight":"600"
                                                                        }}>
                                                    AM
                                                </span></a>
                                            </div>
                                            <div style={{"margin-left":"10px"}} className="col">
                                                <div className="row">
                                                    <a style={{"color":"black"}} href="/account"><span style={{"display":"block", "fontWeight":"600", "color":"#432F87"}}>{this.props.auth.user.firstName + ' ' + this.props.auth.user.lastName}</span></a>
                                                </div>
                                                <div style={{"color":"gray"}} className="row">
                                                    {this.props.auth.user.supervisor ? 'Supervisor Account' : 'Regular Account'}   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{"marginTop":"20px"}} className="row">
                                    <div style={{"fontWeight":"600", "fontSize":"18px", "color":"#432F87"}} className="col-1">
                                        Username
                                    </div>
                                    <div style={{"fontSize":"20px"}} className="col-10">
                                        {this.props.auth.user.username}
                                    </div>
                                </div>
                                <div style={{"marginTop":"10px"}} className="row">
                                    <div style={{"fontWeight":"600", "fontSize":"18px", "color":"#432F87"}} className="col-1">
                                        Password
                                    </div>
                                    <div style={{"fontSize":"18px", "marginRight":"30px"}} className="col-1">
                                        **********
                                    </div>
                                    <div style={{"fontSize":"18px"}} className="col-2">
                                        <button style={{"backgroundColor":"#432F87", "border":"none", "borderRadius":"5px", "boxShadow":"0px 0px 3px 0px grey", "color":"white", "padding":"2px 10px 2px 10px"}} onClick={this.editPassword}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                {!this.state.editPassword ? <div></div> : (
                                <Form
                                    onSubmit={this.handleSubmit}
                                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                                        <form onSubmit={handleSubmit}>
                                        <Field
                                            name="oldPassword"
                                            validate={composeValidators(required, matchesOldPassword(this.state.oldPassword))}
                                        >
                                            {({ input, meta }) => (
                                            <div style={{"marginTop":"10px"}} className="row">
                                                <div style={{"fontWeight":"600", "fontSize":"18px", "color":"#432F87", "paddingRight":"15px"}} className="col-1">
                                                    Old Password
                                                </div>
                                                <div className="col-11">
                                                    <input style={{"width":"230px", "border":"none", "borderRadius":"5px", "height":"30px", "boxShadow":"0px 0px 3px 0px lightgrey"}} {...input} type="password" placeholder="Old Password" />
                                                    {meta.error && meta.touched && <span style={{"marginLeft":"10px", "color":"red"}}>{meta.error}</span>}
                                                </div>
                                            </div>
                                            )}
                                        </Field>
                                        <Field
                                            name="newPassword"
                                            validate={required}
                                        >
                                            {({ input, meta }) => (
                                            <div style={{"marginTop":"10px"}} className="row">
                                                <div style={{"fontWeight":"600", "fontSize":"18px", "color":"#432F87", "paddingRight":"10px"}} className="col-1">
                                                    New Password
                                                </div>
                                                <div className="col-11">
                                                    <input style={{"width":"230px", "border":"none", "borderRadius":"5px", "height":"30px", "boxShadow":"0px 0px 3px 0px lightgrey"}} {...input} type="password" placeholder="New Password" />
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </div>
                                            )}
                                        </Field>
                                        <Field
                                            name="confirmPassword"
                                            validate={composeValidators(required, newPasswordsMatch(values.newPassword))}
                                        >
                                            {({ input, meta }) => (
                                            <div style={{"marginTop":"10px"}} className="row">
                                                <div style={{"fontWeight":"600", "fontSize":"18px", "color":"#432F87"}} className="col-1">
                                                    Confirm
                                                </div>
                                                <div className="col-5">
                                                    <input style={{"width":"230px", "border":"none", "borderRadius":"5px", "height":"30px", "boxShadow":"0px 0px 3px 0px lightgrey"}} {...input} type="password" placeholder="Confirm New Password" />
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </div>
                                            )}
                                        </Field>
                                        <div className="mt-3 row">
                                            <div style={{"fontSize":"18px"}} className="col offset-1">
                                                <button style={{"backgroundColor":"#432F87", "border":"none", "borderRadius":"5px", "boxShadow":"0px 0px 3px 0px grey", "color":"white", "padding":"2px 10px 2px 10px"}} type="submit" disabled={submitting}>
                                                    Save Password
                                                </button>
                                            </div>
                                        </div>
                                        </form>
                                    )}
                                />
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default AccountDetails
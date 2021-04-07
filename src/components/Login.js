import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Form, Field } from 'react-final-form';

const required = value => (value ? undefined : 'Required')

export const Login = (props) => {
    

    const { state } = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const login = () => {
        setRedirectToReferrer(true);
    };

    if (redirectToReferrer) {
        props.fetchReagents();
        props.fetchDeletedReagents();
        props.fetchSecReagents();
        props.fetchDeletedSecReagents();
        props.fetchTests();
        props.fetchTestTypes();
        return <Redirect to={from} />;
    }

    const handleLogin = (values) => {
        props.loginUser({username: values.username, password: values.password});
    }


    if (!props.auth.isAuthenticated) {
        return(
            <div className="container-fluid login-page">
                <div className="row">
                    <div style={{"backgroundColor":"white"}} className="col-5 text-center">
                        <span style={{"fontSize":"30px", "color":"#432F87", "fontWeight":"400"}}> Welcome Back </span>
                        <Form
                        onSubmit={handleLogin}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <>                                     
                            <div className="row">
                                <div className="container">
                                    <form id="loginForm" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <Field
                                            name="username"
                                            component="input"
                                            type="text"
                                            validate={required}
                                            >
                                            {({ input, meta }) => (
                                                <div className="col-12">
                                                    <input {...input} placeholder="Username" className="login-input"/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                            </Field>
                                        </div>
                                        <div className="row">
                                            <Field
                                            name="password"
                                            component="input"
                                            type="password"
                                            validate={required}
                                            >
                                            {({ input, meta }) => (
                                                <div className="col-12">
                                                    <input {...input} placeholder="Password" className="login-input"/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                            </Field>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <button className="submit-button" type="submit" disabled={submitting || pristine}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>  
                            </div>                                             
                            </>
                        )}
                    /> 
                <div className="row">{props.auth.errMess == "Error 401: Unauthorized" ? ("Login Unsuccessfull") : ""}</div> 
                    </div>
                    <div className="col-7">
                        
                    </div>
                </div>                  
            </div>
        );
    }
    else {
        return login()
    }
}  

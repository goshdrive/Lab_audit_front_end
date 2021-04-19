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
        props.checkJWTToken();
        
        var userData = JSON.parse(localStorage.getItem('userData'))
        if (userData.admin == true) {
            props.fetchUsers();
            return <Redirect to='/admin' />;
        }
        else {
            return <Redirect to={from} />;
        }
    }

    const handleLogin = (values) => {
        props.loginUser({username: values.username, password: values.password});
    }


    if (!props.auth.isAuthenticated) {
        return(
            <div className="container-fluid login-page">
                <div className="row min-vh-100">
                    <div style={{"backgroundColor":"white", "paddingTop":"15%"}} className="col-4 text-center vertical-align">
                        <span style={{"fontSize":"40px", "color":"#432F87", "fontWeight":"700", "display":"block"}}>DRIVE</span>
                        <span style={{"fontSize":"20px", "color":"#432F87", "fontWeight":"500", "display":"inline-block"}}> LabAssist </span>
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
                                                    {meta.error && meta.touched && <span style={{"textAlign": "left", "color":"red"}} className="error"><br></br>{meta.error}</span>}
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
                                                    {meta.error && meta.touched && <span style={{"textAlign": "left", "color":"red"}} className="error"><br></br>{meta.error}</span>}
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
                    <div style={{"paddingTop":"10%"}} id="login-right" className="col-8">
                        <div className="row">
                            <div className="col-5 ml-auto">
                                <img src="assets/images/Humaaans_Wireframe.png" height="500px" width="500px" alt="image" />
                            </div>
                            <div className="col-7 mr-auto">
                                <img className="block-center" src="assets/images/Humaaans_Space.png" height="500px" width="680px" alt="image" />
                            </div>              
                        </div>
                    </div>
                </div>                  
            </div>
        );
    }
    else {
        return login()
    }
}  

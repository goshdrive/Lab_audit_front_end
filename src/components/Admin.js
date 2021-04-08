import React, { createRef, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class Admin extends Component {
    constructor(props) {
        super(props);

        state = {
            users: []
        }
    }

    render() {
        return (
            <div id="page-wrap" className="container-fluid">         
                <FontAwesomeIcon icon={faSignOutAlt} color="#3e8bd6" size='md'/>
                <div className="row flex-fill h-100 d-flex">
                    <div className="col">
                        <div style={{"z-index":"10", "position":"fixed", "border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-top": "0px", "padding": "10px", "width":"110%"}} className="row header">
                            <div className="col ml-5">
                                <span className="menu-header"> Sign Out </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
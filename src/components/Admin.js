import React, { createRef, Component } from 'react';
import AddUser from './AddUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
            usersRenderList: this.props.users,
            isModalOpen: false 
        }
    }

    handleChange = (e) => {
        var usersCopy = this.state.users.slice();
        
        this.setState({
            usersRenderList: usersCopy.filter(user => user.username.includes(e.target.value))
        })
    }

    changeUserRole = (user, e) => {
        var updatedUser = {
            _id: user._id,
            supervisor:  e.target.value=="Supervisor User" ? true : false
        }
        this.props.putUser(updatedUser);
    }

    deleteUser = (user) => {
        var updatedUser = {
            _id: user._id,
            status:  "DELETED"
        }
        this.props.putUser(updatedUser);
    }

    reActivateUser = (user) => {
        var updatedUser = {
            _id: user._id,
            status:  "ACTIVE"
        }
        this.props.putUser(updatedUser);
    }

    handleModalShow = () => {
        this.setState({
            isModalOpen: true
        });
    }

    handleModalClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    render() {
        return (
            <div id="page-wrap" className="container-fluid">         
                <div className="row flex-fill h-100 d-flex">
                    <div className="col">
                        <div style={{"z-index":"10", "position":"fixed", "border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-top": "0px", "padding": "10px", "width":"110%"}} className="row header">
                            <div className="col ml-2">
                                <a href="/" onClick={this.props.logoutUser}>
                                <FontAwesomeIcon style={{"verticalAlign":"middle"}} icon={faSignOutAlt} size='lg'/>
                                <span style={{"verticalAlign":"middle"}} className="menu-header"> Sign Out </span>
                                </a>
                            </div>
                        </div>
                        <div style={{"border-right":"1px solid #E2E2E4", "paddingTop":"81px", "paddingLeft":"10px"}} className="row">
                            <div className="col-6 ml-2">
                                <div className="container-fluid">
                                    <div className="row">
                                        <span style={{"verticalAlign":"middle"}}>User Management</span>
                                        <span><FontAwesomeIcon style={{"verticalAlign":"middle", "marginLeft":"30px"}} icon={faSearch} size='sm'/><input style={{"border":"1px solid lightgrey", "borderRadius":"4px", "marginLeft":"5px"}} type="text" onChange={(e => this.handleChange(e))}/></span>
                                        <span className="ml-auto"><a style={{"verticalAlign":"middle"}} type="button" onClick={this.handleModalShow}><FontAwesomeIcon icon={faPlus} size='sm'/>{' '}Add New User</a></span>
                                    </div>
                                    <div className="row">
                                        <ul style={{"width":"100%"}} className="list-unstyled">
                                            {this.state.usersRenderList.map(user => {
                                                return(
                                                    <li key={user._id}>
                                                        {
                                                            user.status!="DELETED" ? (
                                                                <div style={{"border":"1px solid lightgrey", "padding":"20px", "borderRadius":"7px", "backgroundColor":"white", "boxShadow":"0px 0px 3px 0px lightgrey"}} key={user._id} className="user-card">
                                                                    <span>{user.username}</span>
                                                                    <span style={{"float":"right"}}>
                                                                        {
                                                                            user.admin ? (
                                                                                <span>Admin</span>
                                                                            ) : (
                                                                                <select style={{"borderRadius":"3px", "height":"27px"}} onChange={(e) => this.changeUserRole(user, e)}>
                                                                                    <option selected={user.supervisor ? ("selected") : ""}>Supervisor User</option>
                                                                                    <option selected={!user.supervisor ? ("selected") : ""}>Regular User</option>
                                                                                </select>
                                                                            )
                                                                        }
                                                                    </span>
                                                                    <span style={{"float":"right", "height":"27px","border":"1px solid #432F87", "backgroundColor":"#432F87", "color":"white", "borderRadius":"3px", "padding":"0px 3px 0px 3px", "margin-left":"10px", "margin-right":"10px"}}>
                                                                        <a type="button">Reset Password</a>
                                                                    </span>
                                                                    <span style={{"float":"right", "height":"27px","border":"1px solid #432F87", "borderRadius":"3px", "color":"#432F87", "padding":"0px 3px 0px 3px", "margin-left":"10px", "margin-right":"10px"}}>
                                                                        <a onClick={() => this.deleteUser(user)} type="button">Delete User</a>
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div style={{"border":"1px solid lightgrey", "padding":"20px", "borderRadius":"7px", "backgroundColor":"#E2E2E4", "boxShadow":"0px 0px 3px 0px lightgrey"}} key={user._id} className="user-card">
                                                                    <span>{user.username}</span>
                                                                    <span style={{"float":"right"}}>
                                                                        {
                                                                            user.admin ? (
                                                                                <span>Admin</span>
                                                                            ) : (
                                                                                <select style={{"borderRadius":"3px", "height":"27px", "backgroundColor":"grey", "color":"lightgrey"}} onChange={(e) => this.changeUserRole(user, e)}>
                                                                                    <option selected={user.supervisor ? ("selected") : ""}>Supervisor User</option>
                                                                                    <option selected={!user.supervisor ? ("selected") : ""}>Regular User</option>
                                                                                </select>
                                                                            )
                                                                        }
                                                                    </span>
                                                                    <span style={{"float":"right", "height":"27px","border":"1px solid grey", "backgroundColor":"grey", "color":"lightgrey", "borderRadius":"3px", "padding":"0px 3px 0px 3px", "margin-left":"10px", "margin-right":"10px"}}>
                                                                        <a type="button">Reset Password</a>
                                                                    </span>
                                                                    <span style={{"float":"right", "height":"27px","border":"1px solid #432F87", "borderRadius":"3px", "backgroundColor":"#432F87", "color":"white", "padding":"0px 3px 0px 3px", "margin-left":"10px", "margin-right":"10px"}}>
                                                                        <a onClick={() => this.reActivateUser(user)} type="button">Reactivate</a>
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddUser isModalOpen={this.state.isModalOpen} handleModalClose={this.handleModalClose} handleModalOpen={this.handleModalShow} 
                    postUser={this.props.postUser} />
            </div>
        );
    }
}

export default Admin;
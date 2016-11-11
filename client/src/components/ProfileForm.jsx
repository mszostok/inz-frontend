import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import "../assets/sass/light-bootstrap-dashboard.scss";

@observer
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
    }

    updateProperty(event) {
        this.props.data.user[event.target.name] = event.target.value;
    }

    render() {
        const {data, submitForm, error, message} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    {error.summary &&
                    <div className="alert alert-danger fade in"><span><b>Error - </b> {error.summary}</span></div>}
                    {message.summary &&
                    <div className="alert alert-info fade in"><span><b> Success - </b> {message.summary}</span></div>
                    }
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="header">
                                    <h4 className="title">Edit Profile</h4>
                                </div>
                                <div className="content">
                                    <form onSubmit={submitForm}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Email address</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="Email address"
                                                           disabled readOnly
                                                           value={data.user.email}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="Username"
                                                           name="username"
                                                           onChange={this.updateProperty}
                                                           value={data.user.username}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="First Name"
                                                           name="firstName"
                                                           onChange={this.updateProperty}
                                                           value={data.user.firstName}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="Last Name"
                                                           name="lastName"
                                                           onChange={this.updateProperty}
                                                           value={data.user.lastName}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="City"
                                                           name="city"
                                                           onChange={this.updateProperty}
                                                           value={data.user.city}/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Country</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           placeholder="Country"
                                                           name="country"
                                                           onChange={this.updateProperty}
                                                           value={data.user.country}/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Postal Code</label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="postalCode"
                                                           onChange={this.updateProperty}
                                                           value={data.user.postalCode}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="button-line">
                                            <button type="submit" className="btn btn-info btn-fill pull-right">Update
                                                Profile
                                            </button>
                                        </div>
                                        <div className="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* user view */}
                        <div className="col-md-4">
                            <div className="card card-user">
                                <div className="image">
                                    <img
                                        src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                                        alt="..."/>
                                </div>
                                <div className="content">
                                    <div className="author">
                                        <a href="#">
                                            <img className="avatar border-gray" src="assets/img/faces/cage.jpg"
                                                 alt="..."/>
                                            <h4 className="title">{(data.user.firstName || '') + ' ' + ( data.user.lastName || '')}<br />
                                                <small>{data.user.username || ''}</small>
                                            </h4>
                                        </a>
                                    </div>

                                </div>
                                <hr/>
                                <div className="text-center">
                                    <button href="#" className="btn btn-simple"><i
                                        className="fa fa-facebook-square"></i>
                                    </button>
                                    <button href="#" className="btn btn-simple"><i className="fa fa-twitter"></i>
                                    </button>
                                    <button href="#" className="btn btn-simple"><i
                                        className="fa fa-google-plus-square"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
















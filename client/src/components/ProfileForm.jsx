import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import "../assets/sass/light-bootstrap-dashboard.scss";
import {Tabs, Tab} from "material-ui/Tabs";


@observer
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'a',
        };
    }

    updateProperty = (event) => {
        this.props.data.user[event.target.name] = event.target.value;
        this.setState({});

    };

    handleChange = (value) => {
        if (value == 'a' || value == 'b') {
            this.setState({
                tab: value,
            });
        }
    };

    render() {
        const {data, submitProfileForm, submitPasswordForm, message} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    {data.error &&
                    <div className="alert alert-danger fade in"><span><b>Error - </b> {data.error}</span></div>}
                    {message.summary &&
                    <div className="alert alert-info fade in"><span><b> Success - </b> {message.summary}</span></div>
                    }


                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <Tabs
                                    value={this.state.tab}
                                    onChange={this.handleChange}
                                    inkBarStyle={{background: 'grey'}}>
                                    <Tab className="title" style={{color: "black !important", backgroundColor: "white"}}
                                         label="Edit profile" value="a">
                                        <div className="content" style={{paddingTop: "30px"}}>
                                            <div id="profile" className="tab-pane  in active">
                                                <form onSubmit={submitProfileForm}>
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
                                                                       required
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
                                                                <label>Education Degree</label>
                                                                <input type="text"
                                                                       className="form-control"
                                                                       placeholder="Education Degree"
                                                                       name="educationDegree"
                                                                       onChange={this.updateProperty}
                                                                       value={data.user.educationDegree}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="form-group">
                                                                <label>University</label>
                                                                <input type="text"
                                                                       className="form-control"
                                                                       placeholder="University"
                                                                       name="university"
                                                                       onChange={this.updateProperty}
                                                                       value={data.user.university}/>
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
                                                        <button type="submit"
                                                                className="btn btn-info btn-fill pull-right">
                                                            Update
                                                            Profile
                                                        </button>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </form>

                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab className="title" style={{color: "black !important", backgroundColor: "white"}}
                                         label="Change password" value="b">
                                        <div className="content" style={{paddingTop: "30px"}}>
                                            <div id="profile" className="tab-pane  in active">
                                                <form onSubmit={submitPasswordForm}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Old password</label>
                                                                <input type="text"
                                                                       className="form-control"
                                                                       placeholder="Old password"
                                                                       name="oldPassword"
                                                                       onChange={this.updateProperty}
                                                                       value={data.user.oldPassword}/>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>New password</label>
                                                                <input type="text"
                                                                       className="form-control"
                                                                       placeholder="New Password"
                                                                       name="newPassword"
                                                                       onChange={this.updateProperty}
                                                                       value={data.user.newPassword}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Confirm new password</label>
                                                                <input type="text"
                                                                       className="form-control"
                                                                       placeholder="Confirm new password"
                                                                       name="confirmNewPassword"
                                                                       onChange={this.updateProperty}
                                                                       value={data.user.confirmNewPassword}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="button-line">
                                                        <button type="submit"
                                                                className="btn btn-info btn-fill pull-right">
                                                            Save
                                                        </button>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                </form>

                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>

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
                                <div className="text-center ">
                                    <form method="post" action={"mailto:" + data.user.email}>
                                        <button type="submit" className="btn btn-simple">
                                            <i className="fa fa-envelope"/>
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
















import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import AppCtx from "AppCtx";
import Toggle from "material-ui/Toggle";

@observer
export default class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.data = observable({
            error: null,
            users: [],
            selectedUser: {
                active: null,
                delete: null,
                id: null,
            },
        });

        this.state = {
            open: false,
        }
    }


    async componentDidMount() {
      this.fetchUsers();
    }

    fetchUsers = async function() {
        let usersReq = new Request(AppCtx.serviceBasePath + '/api/users/', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, usersReq, 'manage/users');
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                });
                return;
            }
            response.json().then(data => {
                this.data.users = data;
                console.log(this.data.users);
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    };

    handleOpen = (row) => {
        this.setState({
            open: true,
        });
        this.data.selectedUser = {
            active: row.activated,
            baseActive: row.activated,
            delete: false,
            id: row.id,
        }
    };


    deleteUser = async function (id) {
        let deleteUserReq = new Request(AppCtx.serviceBasePath + '/api/users/' + id, {
            method: 'DELETE',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, deleteUserReq, 'manage/users/');
            if (response.status !== 204) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                });
                return
            }
            this.data.users = this.data.users.filter(function (el) {
                return el.id !== id;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    };

    updateActive = async function (id, isActive) {
        let usersReq = new Request(AppCtx.serviceBasePath + '/api/users/' + id + '/active', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isActive: isActive,
            })
        });

        try {
            let response = await AppCtx.doWithToken(this.context, usersReq, 'manage/users/');
            if (response.status !== 204) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                });
                return;
            }
           this.fetchCompetitions();
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }

        this.setState({open: false});
    }

    handleSubmit = () => {
        this.setState({open: false});

        if (this.data.selectedUser.delete) {
            console.log(this.data.selectedUser.id);
            this.deleteUser(this.data.selectedUser.id);
            return
        }

        if (this.data.selectedUser.baseActive != this.data.selectedUser.active) {
            this.updateActive(this.data.selectedUser.id, this.data.selectedUser.active);
        }
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleActivity = (event, toggle) => {
        this.data.selectedUser.active = toggle
    };

    handleDelete = (event, toggle) => {
        let t = toggle;
        this.data.selectedUser.active = !t;
        this.data.selectedUser.delete = t;
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleSubmit}
            />,
        ];

        const options = {
            onRowClick: this.handleOpen,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.data.users.length
            }],
            sizePerPage: 5,  // which size per page you want to locate as default
        };
        return (
            <div className="content">

                <div className="container-fluid">
                    {this.data.error &&
                    <div className="alert alert-danger fade in"><span><b>Error - </b> {this.data.error}</span></div>}
                    <Dialog
                        title="Mange user"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        titleStyle={{color: "rgba(74, 71, 71, 0.870588)", textAlign: "center"}}
                        contentStyle={{width: "500px"}}
                    >
                        <Toggle
                            toggled={this.data.selectedUser.active}
                            onToggle={this.handleActivity}
                            labelPosition="left"
                            label="User is active"
                            labelStyle={{color: "rgba(74, 71, 71, 0.870588)", fontWeight: "500"}}
                        />
                        <Toggle
                            toggled={this.data.selectedUser.delete}
                            onToggle={this.handleDelete}
                            labelPosition="left"
                            label="Delete user"
                            labelStyle={{color: "rgba(247, 58, 58, 0.8)", fontWeight: "500"}}
                        />
                    </Dialog>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="header">
                                        <h4 className="title">List of all users</h4>
                                    </div>
                                    <div className="content">
                                        <BootstrapTable data={this.data.users} striped hover options={ options }
                                                        search={ true }
                                                        pagination>
                                            <TableHeaderColumn dataField='username'
                                                               dataSort={ true }>Username</TableHeaderColumn>
                                            <TableHeaderColumn dataField='email' isKey
                                                               dataSort={ true }>Email</TableHeaderColumn>
                                            <TableHeaderColumn dataField='activated' dataSort={ true }
                                                               width='90'>Active</TableHeaderColumn>
                                        </BootstrapTable>
                                        <div className="footer">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



ManageUser.contextTypes = {
    router: PropTypes.object.isRequired
};

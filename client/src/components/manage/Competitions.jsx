import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import AppCtx from "AppCtx";
import Toggle from "material-ui/Toggle";

@observer
export default class ManageCompetitions extends Component {
    constructor(props) {
        super(props);
        this.data = observable({
            error: null,
            competitions: [],
            selectedCompetition: {
                delete: null,
                id: null,
            },
        });

        this.state = {
            open: false,
        }
    }


    async componentDidMount() {
        this.fetchCompetitions();
    }

    fetchCompetitions = async function () {
        let usersReq = new Request(AppCtx.serviceBasePath + '/api/competitions', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, usersReq, 'manage/competitions');
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
                this.data.competitions = data;
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
        this.data.selectedCompetition = {
            delete: false,
            id: row.id,
        }
    };


    deleteUser = async function (id) {
        let deleteUserReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id, {
            method: 'DELETE',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, deleteUserReq, 'manage/competitions/');
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
            this.data.competitions = this.data.competitions.filter(function (el) {
                return el.id !== id;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    };

    handleSubmit = () => {
        this.setState({open: false});
        if (this.data.selectedCompetition.delete) {
            this.deleteUser(this.data.selectedCompetition.id);
        }
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDelete = (event, toggle) => {
        this.data.selectedCompetition.delete = toggle;
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
                text: 'All', value: this.data.competitions.length
            }],
            sizePerPage: 5,  // which size per page you want to locate as default
        };
        return (
            <div className="content">

                <div className="container-fluid">
                    {this.data.error &&
                    <div className="alert alert-danger fade in"><span><b>Error - </b> {this.data.error}</span></div>}
                    <Dialog
                        title="Mange competition"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        titleStyle={{color: "rgba(74, 71, 71, 0.870588)", textAlign: "center"}}
                        contentStyle={{width: "500px"}}
                    >
                        <Toggle
                            toggled={this.data.selectedCompetition.delete}
                            onToggle={this.handleDelete}
                            labelPosition="left"
                            label="Delete competition"
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
                                        <BootstrapTable data={this.data.competitions} striped hover options={ options }
                                                        search={ true }
                                                        pagination>
                                            <TableHeaderColumn dataField='id' isKey
                                                               dataSort={ true }>Competition Id</TableHeaderColumn>
                                            <TableHeaderColumn dataField='name'
                                                               dataSort={ true }>Competition Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='author'
                                                               dataSort={ true }>Author</TableHeaderColumn>
                                            <TableHeaderColumn dataField='startDate'
                                                               dataSort={ true } width='120'>Start date</TableHeaderColumn>
                                            <TableHeaderColumn dataField='endDate'
                                                               dataSort={ true } width='90'>End date</TableHeaderColumn>
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


ManageCompetitions.contextTypes = {
    router: PropTypes.object.isRequired
};














import React, {PropTypes, Component} from "react";
import DatePicker from "material-ui/DatePicker";
import TinyMCE from "react-tinymce";
import {observer} from "mobx-react";
import {observable} from "mobx";
import AppCtx from "AppCtx";
@observer
export default class Configure extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            error: null,
            message: null,
            configure: {},
        });
        this.submitConfigureForm = this.submitConfigureForm.bind(this);
    }

    updateProperty = (event) => {
        this.setState({}); //required to refresh input
        this.data.configure[event.target.name] = event.target.value;
    };

    handleEndDate = (event, date) => {
        this.setState({}); //required to refresh input
        this.data.configure.endDate = date;
    };

    handleStartDate = (event, date) => {
        this.setState({}); //required to refresh input
        this.data.configure.startDate = date;
    };

    handleEditorChange = (e) => {
        e.target.save();
        this.data.configure[e.target.id] = e.target.getContent();
    };

    submitConfigureForm = async function (e) {
        e.preventDefault();
        this.data.message = null;
        this.data.error = null;

        let desc = this.data.configure.shortDescription;
        if (typeof desc == 'undefined' || desc == "") {
            this.data.error = "Short description is required.";
            return
        }

        const id = this.props.params.id;
        let generalInfoReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id + '/configure', {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(
                this.data.configure
            )
        });

        try {
            let response = await AppCtx.doWithToken(this.context, generalInfoReq, '/competition/' + id + '/manage');
            if (response.status !== 204) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;

                    } else {
                        this.data.error = data.message;
                    }
                    this.data.message = null;
                });
                return;
            }
            this.data.message = "Updated successful";
            this.data.error = null;
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }

    };

    async componentDidMount() {
        const id = this.props.params.id;
        let generalInfoReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id + '/configure', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, generalInfoReq, '/competition/' + id + '/manage');
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
                data.startDate = new Date(data.startDate);
                data.endDate = new Date(data.endDate);
                this.data.configure = data;
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Configure</h4>
                        </div>
                        {/* form body */}
                        <div className="content" style={{paddingTop: "80px"}}>
                            <div>
                                {this.data.error &&
                                <div className="alert alert-danger fade in">
                                    <span><b>Error - </b> {this.data.error}</span>
                                </div>
                                }
                                {this.data.message &&
                                <div className="alert alert-info fade in">
                                    <span><b> Success - </b> {this.data.message}</span></div>
                                }

                                <form onSubmit={this.submitConfigureForm}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Competition name</label>
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="Competition name"
                                                       required
                                                       name="competitionName"
                                                       value={this.data.configure.competitionName || ""}
                                                       onChange={this.updateProperty}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-md-offset-1">
                                            <div className="form-group">
                                                <label>Start</label>
                                                <DatePicker
                                                    name="startDate"
                                                    minDate={new Date()}
                                                    textFieldStyle={{width: '100%'}}
                                                    value={this.data.configure.startDate || new Date()}
                                                    onChange={this.handleStartDate}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-sm-3">
                                            <div className="form-group has-error">
                                                <label>Deadline</label>
                                                <DatePicker
                                                    name="endDate"
                                                    minDate={new Date()}
                                                    textFieldStyle={{width: '100%'}}
                                                    value={this.data.configure.endDate || new Date()}
                                                    onChange={this.handleEndDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Frequency of participation in min</label>
                                                <input type="number"
                                                       className="form-control"
                                                       placeholder=""
                                                       required
                                                       min="0"
                                                       name="allowParticipationFreqMin"
                                                       value={this.data.configure.allowParticipationFreqMin || 0}
                                                       onChange={this.updateProperty}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Short Description</label>
                                                <TinyMCE
                                                    content={ this.data.configure.shortDescription || ""}
                                                    config={{
                                                        theme: 'inlite',
                                                        inline: true,
                                                        insert_toolbar: '',
                                                        plugins: '',
                                                        selection_toolbar: '',
                                                        content_css: [
                                                            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                                            '//www.tinymce.com/css/codepen.min.css'
                                                        ]
                                                    }}
                                                    id="shortDescription"
                                                    className="tiny-border"
                                                    onChange={this.handleEditorChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-info btn-fill pull-right">
                                        Save
                                    </button>
                                </form>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Configure.contextTypes = {
    router: PropTypes.object.isRequired
};

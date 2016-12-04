import React, {PropTypes, Component} from "react";
import Dropzone from "react-dropzone";
import AppCtx from "AppCtx";

export default  class PostSubmission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            error: null,
            message: {},
        }
    }

    onDropTesting = (files) => {
        this.setState({
            file: files[0],
        })
    };

    uploadFiles = () => {
        if (this.props.preview) {
            this.setState({
                error: "It's only preview mode, you will be able to upload submission when competition start",
                dataset: {},
            });
            return;
        }
        let self = this,
            data = new FormData();
        data.append('file', this.state.file);
        let loginReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + this.props.params.id + "/submission/", {
            method: 'POST',
            body: data,
        });

        AppCtx.doWithToken(self.context, loginReq, "/competitions/" + this.props.params.id + "/submission/").then((response) => {
            if (response.status !== 204) {
                console.log('unexpected response status: ' + response.status);
                response.json().then((data) => {
                    if (data.error) {
                        this.setState({
                            error: data.error,
                            message: {
                                summary: null,
                            }
                        });
                    } else {
                        this.setState({
                            error: data.message,
                            message: {
                                summary: null,
                            }
                        });
                    }
                });
            } else {
                this.setState({
                    message: {
                        summary: "Submission was uploaded successful, now please wait for computing result score"
                    },
                    error: null,
                })
            }

        }).catch(reason => {
            this.setState({
                message: {
                    summary: null,
                },
                error: reason,
            });
        });
    };

    render() {
        return (
            <div className="card">
                <div className="header">
                    <h4 className="title">Post submission </h4>
                    <p className="category">Here you can upload your solution</p>
                </div>
                <div className="content">
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.error &&
                            <div className="alert alert-danger fade in">
                                <span><b>Error - </b> {this.state.error}</span>
                            </div>
                            }
                            {this.state.message && this.state.message.summary &&
                            <div className="alert alert-info fade in">
                                <span><b> Success - </b> {this.state.message.summary}</span></div>
                            }
                            <div className="form-group">
                                <label >Solution</label>
                                <Dropzone onDrop={this.onDropTesting} multiple={false}
                                          className="upload">
                                    {this.state.file ?
                                        <div>
                                            <p> {this.state.file.name} </p>
                                        </div>
                                        :
                                        <p>Try dropping some files here, or click to select files
                                            to upload.</p>
                                    }
                                </Dropzone>
                            </div>
                            <div className="button-line">
                                <button onClick={this.uploadFiles} className="btn btn-info btn-fill pull-right">
                                    Upload solution
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )

    }
}








import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import download from "downloadjs";
import AppCtx from "../../modules/AppCtx";


@observer
export default  class Dataset extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
                dataset: {},
                error: '',
            }
        )
    }

    downloadFile = (event) => {
        const id = this.props.params.id;
        let type = event.target.name ? event.target.name : event.target.parentNode.name;
        let self = this,
            loginReq = new Request('http://localhost:8081/api/competitions/' + id + '/dataset/' + type, {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/dataset").then(response => {
            if (response.status !== 200) {
                response.json().then((data) => {
                    if (data.error) {
                        self.data.error = data.error;
                    } else {
                        self.data.error = data.message;
                    }
                });
                return null;
            }
            return response.blob();
        }).then(blob => {
            if (blob) {
                download(blob, type + ".csv");
            }
        }).catch(reason => {
            self.data.error = reason;
        });
    };

    componentDidMount() {
        const id = this.props.params.id;
        let self = this,
            loginReq = new Request('http://localhost:8081/api/competitions/' + id + '/description/dataset', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/dataset").then((response) => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(function (data) {
                    if (data.error) {
                        self.data.error = data.error;
                    } else {
                        self.data.error = data.message;
                    }
                });
                return;
            }
            response.json().then(function (data) {
                self.data.dataset = data;
                self.data.error = null;
            });
        }).catch((reason) => {
            console.log(reason);
        });
    }

    render() {
        return (
            <div >

                <div className="card">
                    <div className="header">
                        <h4 className="title">Dataset description</h4>
                        <p className="category">Dataset description and download page</p>
                    </div>

                    <div className="content">
                        {this.data.error &&
                        <div className="content">
                            <div className="alert alert-danger fade in"><span><b>Error - </b> {this.data.error}</span>
                            </div>
                        </div>
                        }
                        <div className="content" dangerouslySetInnerHTML={{__html: this.data.dataset.text}}></div>
                        <div className="row row-centered" style={{textAlign: "center"}}>
                            <div className="col-md-6 col-centered">
                                <button name="testing" className="btn" style={{borderWidth: "0px"}}
                                        onClick={this.downloadFile}>
                                    <i className="pe-7s-download" style={{fontSize: "2em"}}/> <br />Download testing
                                    file
                                </button>
                            </div>
                            <div className="col-md-6 col-centered">
                                <button name="training" className="btn" style={{borderWidth: "0px"}}
                                        onClick={this.downloadFile}>
                                    <i className="pe-7s-download" style={{fontSize: "2em"}}/> <br />Download training
                                    file
                                </button>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="legend">
                            </div>
                            <hr/>
                            <div className="stats">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};


Dataset.contextTypes = {
    router: PropTypes.object.isRequired
};

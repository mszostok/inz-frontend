import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import Dropzone from "react-dropzone";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import AppCtx from "AppCtx";

@observer
export default class Data extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
        this.props.data.competition.files = {};
        this.state = {
            error: "",
            items: [],
        };
    }

    componentDidMount() {
        let self = this,
            loginReq = new Request(AppCtx.serviceBasePath + '/api/competitions/score-functions', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/create-competition").then((response) => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    let err;
                    if (data.error) {
                        err = data.error;
                    } else {
                        err = data.message;
                    }
                    this.setState({
                        error: err,
                        dataset: {},
                    })
                });
                return;
            }
            response.json().then(data => {
                this.createSelectItems(data);
                this.setState({
                    error: null,
                })
            });
        }).catch((reason) => {
            this.setState({
                error: reason,
            })
        });
    }

    createSelectItems = (scoreFnList) => {
        let scoreFnItems = scoreFnList.map(elem => {
            return <MenuItem key={elem.id} value={elem.id} primaryText={elem.name}/>
        });
        this.setState({
            items: scoreFnItems,
        });
    };

    updateProperty = (event) => this.props.data.competition[event.target.name] = event.target.value;


    onDropTraining = (files) => {
        this.props.data.competition.files.training = files[0];
        this.setState({});
    };

    onDropTesting = (files) => {
        this.props.data.competition.files.testing = files[0];
        this.setState({});
    };

    nextFormWrapper = () => {
        if (this.props.data.competition.scoreFnId == undefined) {
            this.setState({
                error: "Selecting score function is required",
            });
            return;
        }
        if (this.props.data.competition.files.testing == undefined) {
            this.setState({
                error: "Uploading testing file is required",
            });
            return;
        }
        if (this.props.data.competition.files.training == undefined) {
            this.setState({
                error: "Uploading training file is required",
            });
            return;
        }
        this.props.nextForm()
    };

    handleSelectChange = (event, index, value) => {
        this.props.data.competition.scoreFnId = value;
        this.setState({});
    };

    render() {
        const {data, prevForm} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                {/* control nav-bar */}
                                <div className="container-fluid nav-background">
                                    <div className="row nav-box">
                                        <div className="col-md-4 nav-left col-sm-4 col-xs-4">
                                            <button className="btn" onClick={prevForm}>
                                                <span className="fa fa-angle-left"/>Back
                                            </button>
                                        </div>
                                        <div className="col-md-4 nav-center col-sm-4 col-xs-4">
                                            <h4 className="title">Data</h4>

                                        </div>
                                        <div className="col-md-4 nav-right col-sm-4 col-xs-4">
                                            <button className="btn btn-next" onClick={this.nextFormWrapper}>
                                                Next<span className="fa fa-angle-right"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* form body */}
                                <div className="content" style={{paddingTop: "10px"}}>
                                    <div>
                                        {this.state.error &&
                                        <div className="alert alert-danger fade in">
                                            <span><b>Error - </b> {this.state.error}</span>
                                        </div>
                                        }
                                        <div className="row ">
                                            <div className="col-md-12 ">
                                                <div className="form-group">
                                                    <SelectField
                                                        value={data.competition.scoreFnId}
                                                        onChange={this.handleSelectChange}
                                                        floatingLabelText="Score function">
                                                        {this.state.items}
                                                    </SelectField>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row row-centered">
                                            <div className="col-md-6 col-centered">
                                                <div className="form-group">
                                                    <label >Training Dataset</label>
                                                    <Dropzone onDrop={this.onDropTraining} multiple={false}
                                                              className="upload">
                                                        {data.competition.files.training ?
                                                            <div>
                                                                <p> {data.competition.files.training.name} </p>
                                                            </div>
                                                            :
                                                            <p>Try dropping some files here, or click to select files
                                                                to upload.</p>
                                                        }
                                                    </Dropzone>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-centered">
                                                <div className="form-group">
                                                    <label >Testing Dataset</label>
                                                    <Dropzone onDrop={this.onDropTesting} multiple={false}
                                                              className="upload">

                                                        {data.competition.files.testing ?
                                                            <div>
                                                                <p> {data.competition.files.testing.name} </p>
                                                            </div>
                                                            :
                                                            <p>Try dropping some files here, or click to select files
                                                                to upload.</p>
                                                        }
                                                    </Dropzone>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Data.propTypes = {
    nextForm: PropTypes.func.isRequired,
    prevForm: PropTypes.func.isRequired,

};
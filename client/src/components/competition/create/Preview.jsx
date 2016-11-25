import React, {PropTypes, Component} from "react";
import AppCtx from "../../../modules/AppCtx";

export default class Preview extends Component {
    constructor(props, context) {
        super(props, context);
    }

    sendCompetition = () => {
        let self = this,
            loginReq = new Request('http://localhost:8081/api/competitions', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(
                    self.props.data.competition
                )
            });

        AppCtx.doWithToken(self.context, loginReq, "/create-competition").then((response) => {
            if (response.status !== 201) {
                console.log('unexpected response status: ' + response.status);
                response.json()
                    .then(function (data) {
                        console.log("Err response body: ", data);
                    });
                return;
            }
            response.json()
                .then((data) => {
                    const id = data.competitionId;
                    self.uploadFiles(id);
                    self.context.router.replace("competition/" + id + "/introduction")
                });
        }).catch((reason) => {
            console.log(reason);
        });
    };

    uploadFiles = (id) => {
        var self = this;
        ['training', 'testing'].forEach(name => {
            let data = new FormData();
            data.append('file', this.props.data.competition.files[name]);
            let loginReq = new Request('http://localhost:8081/api/competitions/' + id + "/dataset/" + name, {
                method: 'POST',
                body: data,
            });

            AppCtx.doWithToken(self.context, loginReq, "/create-competition").then((response) => {
                if (response.status !== 201) {
                    console.log('unexpected response status: ' + response.status);
                    response.json()
                        .then(function (data) {
                            console.log("Err response body: ", data);
                        });
                }
            });
        });
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
                                            <h4 className="title">Overview</h4>
                                        </div>
                                        <div className="col-md-4 nav-right col-sm-4 col-xs-4">
                                            <button className="btn btn-next" onClick={this.sendCompetition}>
                                                <i className="fa fa-floppy-o" aria-hidden="true"/>Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <pre>
                                    {JSON.stringify(data, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Preview.propTypes = {
    nextForm: PropTypes.func.isRequired,
    prevForm: PropTypes.func.isRequired,
};

Preview.contextTypes = {
    router: PropTypes.object.isRequired
};
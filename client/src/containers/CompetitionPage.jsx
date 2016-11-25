import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import LinearProgress from "material-ui/LinearProgress";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "../modules/AppCtx";

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var dayNames = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];


@observer
export default class Competition extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            generalInfo: {},
            error: null,
            diff: 0,
        });
    }

    async componentDidMount() {
        const id = this.props.params.id;
        let generalInfoReq = new Request('http://localhost:8081/api/competitions/' + id + '/general-info', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, generalInfoReq, 'competitions/' + id + '/general-info');
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
                this.data.generalInfo = data;
                this.calcDate(data);
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    }

    calcDate = (data) => {
        let gi = this.data.generalInfo,
            now = new Date();

        gi.endDate = new Date(data.endDate);
        gi.startDate = new Date(data.startDate);

        let allDays = Math.abs(gi.endDate.getTime() - gi.startDate.getTime()),
            elapsedDays = Math.abs(now.getTime() - gi.startDate.getTime());

        this.data.diff = elapsedDays * 100 / allDays;
    };

    getLinkFor = (suffix) => {
        const id = this.props.params.id;
        return "/competition/" + id + suffix;
    };

    printDate = (name) => {
        if (this.data.generalInfo[name]) {
            var date = new Date(this.data.generalInfo[name]);

            return dayNames[date.getDay()] + " " + date.getDate() + " "
                + monthNames[date.getMonth()] + " " + date.getFullYear();
        }
    };

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div style={{marginBottom: "50px"}}>
                        <div style={{display: "flex"}}>
                            <div >
                                {this.printDate("startDate")}
                            </div>
                            <div style={{marginLeft: "auto"}}>
                                {this.printDate('endDate')}
                            </div>
                        </div>
                        <LinearProgress mode="determinate" value={this.data.diff}/>
                    </div>

                    <div className="row">
                        {this.data.error &&
                        <div className="col-md-12">
                            <div className="alert alert-danger fade in">
                                <span><b>Error - </b> {this.data.error}</span>
                            </div>
                        </div>
                        }
                        <div className="col-md-9 col-xs-9 col-sm-9">
                            {this.props.children}
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="header">
                                            <p className="title">Browse Panel</p>
                                            <hr/>

                                        </div>
                                        <div className="content">
                                            <ul className="nav" style={{marginLeft: "-18px"}}>
                                                <li><Link to={this.getLinkFor("/introduction")}
                                                          style={{color: "#333333"}}
                                                          activeClassName="nav-comp-active">
                                                    <i className="pe-7s-ribbon"/> Introduction
                                                </Link>
                                                </li>
                                                <li><Link to={this.getLinkFor("/formula")}
                                                          style={{color: "#333333"}}
                                                          activeClassName="nav-comp-active">
                                                    <i className="pe-7s-note2"/> Competition Formula
                                                </Link></li>
                                                <li><Link to={this.getLinkFor("/dataset")}
                                                          style={{color: "#333333"}}
                                                          activeClassName="nav-comp-active">
                                                    <i className="pe-7s-server"/> Dataset
                                                </Link></li>
                                                <li><Link to={this.getLinkFor("/post-submission")}
                                                          style={{color: "#333333"}}
                                                          activeClassName="nav-comp-active">
                                                    <i className="pe-7s-upload"/> Post submission
                                                </Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="header">
                                            <p className="title">Leaderboard</p>
                                            <hr/>

                                        </div>
                                        <div className="content">
                                            <ol style={{marginLeft: "-18px"}}>
                                                <li>----</li>
                                                <li>----</li>
                                                <li>----</li>
                                                <li>----</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="header">
                                            <p className="title">Author</p>
                                            <hr/>

                                        </div>
                                        <div className="content">
                                            <div className="stats">
                                                {this.data.generalInfo.author}
                                            </div>
                                        </div>
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



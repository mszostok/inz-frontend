import React, {PropTypes, Component} from "react";
import AppCtx from "AppCtx";
import {observable} from "mobx";
import {Link} from "react-router";


export default class ManagePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.data = observable({
            user: {},
            error: null,
        });

        this.message = observable({
            summary: '',
        });
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="  col-md-4 col-sm-4 col-xs-6">
                                    <div className="card">
                                        <Link style={{color: "grey"}} to="/manage/users">
                                            <div className=" text-center"><i className="pe-7s-user"
                                                                             style={{fontSize: "74px"}}/>
                                                <h4 >Users
                                                    <div className="small">Manage users</div>
                                                </h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-6">
                                    <div className="card">
                                        <a style={{color: "grey"}} href="/manage/competitions">

                                            <div className=" text-center"><i className="pe-7s-science"
                                                                             style={{fontSize: "74px"}}/>
                                                <h4>Competitions
                                                    <div className="small">Manage competitions</div>
                                                </h4>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className=" col-md-4 col-sm-4 col-xs-6">
                                    <div className="card">
                                        <a style={{color: "grey"}} href="#">
                                            <div className=" text-center"><i className="pe-7s-diamond"
                                                                             style={{fontSize: "74px"}}/>
                                                <h4>TBD
                                                    <div className="small">TBD</div>
                                                </h4>
                                            </div>
                                        </a>
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
ManagePage.contextTypes = {
    router: PropTypes.object.isRequired
};


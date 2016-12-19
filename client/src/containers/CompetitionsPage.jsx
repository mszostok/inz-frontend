import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "AppCtx";

@observer
export default class Competitions extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            competitions: [{}],
            error: null,
        });
    }

    goToCompetition = (e) => {
        const id = e.target.parentNode.getAttribute('data-item');
        this.context.router.replace('competition/' + id + '/introduction');
    };

    async componentDidMount() {
        let loginReq = new Request(AppCtx.serviceBasePath + '/api/competitions/active', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, loginReq, "/competitions");
            if (response.status !== 200) {
                response.json().then((data) => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                });
                return;
            }
            response.json().then((data) => {
                this.data.competitions = data;
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching active competitions data: ', reason);
            this.data.error = "Service unavailable";
        }
    }

    renderResultRows() {
        if (this.data.competitions.length > 0) {
            return this.data.competitions.map((competition, index) => {
                if (competition.id && competition.name && competition.shortDescription) {
                    return (
                        <tr data-item={competition.id} key={index} onClick={this.goToCompetition}>
                            <td data-item={competition.id} width="10px">
                                <i className="pe-7s-science" style={{fontSize: "2.5em"}}/>
                            </td>
                            <td data-item={competition.id} style={{paddingTop: "25px"}}>
                                <h5 className="title">{competition.name}</h5>
                                <div className="description">{competition.shortDescription}  </div>
                                <div className="description author">Author {competition.author}</div>
                            </td>
                        </tr>
                    );
                }
            });
        } else {
            return (
                <tr key="1">
                    <td >
                        <div>Currently we do not have any active competition</div>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid" style={{margin: "0 80px"}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card ">
                                <div className="header">
                                    <h4 className="title">Competitions</h4>
                                    <p className="description">List of all active competitions</p>
                                </div>

                                <div className="content content-table">
                                    {this.data.error ?
                                        <div className="alert alert-danger fade in">
                                            <span><b>Error - </b> {this.data.error}</span>
                                        </div>
                                        :
                                        <table className="table  table-hover">
                                            <tbody>
                                            {this.renderResultRows()}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Competitions.contextTypes = {
    router: PropTypes.object.isRequired
};

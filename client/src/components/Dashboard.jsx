import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";

@observer
export default class Dashboard extends Component {
    constructor(props, context) {
        super(props, context)
    }

    goToCompetition = (e) => {
        const id = e.target.parentNode.getAttribute('data-item');
        this.context.router.replace('competition/' + id + '/introduction');
    };

    printParticipation = () => {
        if (this.props.participation.length > 0) {
            console.log(this.props.participation);
            return this.props.participation.map((part, idx) => {
                return (
                    <tr data-item={part.competitionId} key={idx} onClick={this.goToCompetition}>
                        <td data-item={part.competitionId}>{part.competitionName}</td>
                        <td data-item={part.competitionId}>{part.lastScore}</td>
                        <td data-item={part.competitionId}>{part.bestScore}</td>
                    </tr>
                )
            })
        } else {
            return (
                <div id="chartHours" style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    You have not participated to any competition yet.
                </div>
            )
        }
    };

    printCreatedCompetitionRow = () => {
        if (this.props.createdCompetitions.length > 0) {
            console.log(this.props.createdCompetitions);
            return this.props.createdCompetitions.map((competition, idx) => {
                return (
                    <tr data-item={competition.id} key={idx} onClick={this.goToCompetition}>
                        <td data-item={competition.id}>{competition.name}</td>
                    </tr>
                )
            })
        } else {
            return (
                <div id="chartHours" style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    You have not created any competition yet.
                </div>
            )
        }
    };

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card ">
                                <div className="header">
                                    <h4 className="title">Competitions that you participate</h4>
                                    <p className="description">List of all competitions in which you participated</p>
                                </div>
                                <div className="content content-table">
                                    <table className="table  table-hover">
                                        <thead>
                                        { this.props.createdCompetitions.length > 0 &&
                                        <tr>
                                            <th>Competition Name</th>
                                            <th>Last Score</th>
                                            <th>Best Score</th>
                                        </tr>
                                        }
                                        </thead>
                                        <tbody>
                                        {this.printParticipation()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="footer">
                                    <hr/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="header">
                                    <h4 className="title">Competitions that you created</h4>
                                    <p className="description">List of all competitions create by you</p>
                                </div>
                                <div className="content content-table">
                                    <table className="table  table-hover">
                                        <tbody>
                                        {this.printCreatedCompetitionRow()}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="footer">
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Dashboard.contextTypes = {
    router: PropTypes.object.isRequired
};
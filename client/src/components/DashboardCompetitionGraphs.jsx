import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";

var LineChart = require("react-chartjs").Line;
var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [
                1,
                2,
                3,
                5,
                20,
                2,
                30,
            ]
        }
    ]
}

var options = {
    responsive: true
}

@observer
export default class DashboardCompetitionGraphs extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="header">
                                    <h4 className="title">Participation history</h4>
                                </div>
                                <div className="content content-table">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <LineChart data={chartData} options={options} height="50px"/>
                                        </div>
                                    </div>
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

DashboardCompetitionGraphs.contextTypes = {
    router: PropTypes.object.isRequired
};
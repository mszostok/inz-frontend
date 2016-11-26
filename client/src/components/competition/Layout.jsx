import React, {PropTypes, Component} from "react";
import BrowsePanel from "./general/BrowsePanel";
import Leaderboard from "./general/Leaderboard";
import Author from "./general/Author";
import LinearProgress from "material-ui/LinearProgress";

export default class Layout extends Component {

    printDate = (val) => {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const dayNames = [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
        ];

        let date = new Date(val);
        return dayNames[date.getDay()] + " " + date.getDate() + " "
            + monthNames[date.getMonth()] + " " + date.getFullYear();
    };

    calcDate = (start, end) => {
        let now = new Date(),
            startDate = new Date(start),
            endDate = new Date(end);

        let allDays = Math.abs(endDate.getTime() - startDate.getTime()),
            elapsedDays = Math.abs(now.getTime() - startDate.getTime());

        return elapsedDays * 100 / allDays;
    };

    render() {
        const {startDate, endDate, author} = this.props.generalInfo;
        return (
            <div className="content">
                {this.props.error ?
                    <div className="col-md-12">
                        <div className="alert alert-danger fade in">
                            <span><b>Error - </b> {this.props.error}</span>
                        </div>
                    </div>
                    :
                    <div className="container-fluid">
                        <div style={{marginBottom: "50px"}}>
                            <div style={{display: "flex"}}>
                                <div >
                                    {this.printDate(startDate)}
                                </div>
                                <div style={{marginLeft: "auto"}}>
                                    {this.printDate(endDate)}
                                </div>
                            </div>
                            <LinearProgress mode="determinate" value={this.calcDate(startDate, endDate)}/>
                        </div>
                        <div className="row">
                            <div className="col-md-9 col-xs-9 col-sm-9">
                                {this.props.children}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <BrowsePanel id={this.props.id}/>
                                    </div>

                                    <div className="col-md-12">
                                        <Leaderboard/>
                                    </div>

                                    <div className="col-md-12">
                                        <Author name={author}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    };
}

import React, {PropTypes, Component} from "react";
import BrowsePanel from "./general/BrowsePanel";
import Leaderboard from "./general/Leaderboard";
import Author from "./general/Author";
import LinearProgress from "material-ui/LinearProgress";
import Introduction from "./content/Introduction";
import Formula from "./content/Formula";
import Dataset from "./content/Dataset";
import PostSubmission from "./content/PostSubmission";

export default class PreviewLayout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            step: '/introduction',
        };

    }

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

    previewContent = () => {
        console.log(this.state.step);
        switch (this.state.step) {
            case '/introduction':
                return <Introduction
                    preview={this.props.competition}
                />;
            case '/formula':
                return <Formula
                    preview={this.props.competition}
                />;
            case '/dataset':
                return <Dataset
                    preview={this.props.competition}
                />;

            case '/post-submission':
                return <PostSubmission
                    preview={this.props.competition}
                />;

        }
    };

    switchContent = (e) => {
        if (e) {
            e.preventDefault();

            this.setState({
                step: e.target.name,
            });
        }

        return this.state.step;
    };

    render() {
        const {startDate, endDate} = this.props.competition;
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
                                {this.previewContent()}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <BrowsePanel preview={this.switchContent}/>
                                    </div>

                                    <div className="col-md-12">
                                        <Leaderboard/>
                                    </div>

                                    <div className="col-md-12">
                                        <Author name="Your username"/>
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

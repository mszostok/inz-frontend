import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import Configure from "./Configure";
import SendEmail from "./SendEmail"
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <Configure params={this.props.params}/>
                    <SendEmail params={this.props.params}/>
                </div>
            </div>
        );
    }
}
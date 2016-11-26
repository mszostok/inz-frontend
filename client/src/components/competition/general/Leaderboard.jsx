import React, {PropTypes, Component} from "react";


export default class Leaderboard extends Component {
    render() {
        return (
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
        )
    };
}

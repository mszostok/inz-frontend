import React, {PropTypes, Component} from "react";


export default class Leaderboard extends Component {

    printMembers = () => {
        if (this.props.members && this.props.members.length > 0) {
            return this.props.members.map((obj, idx) => {
                return (
                    <div key={idx}>
                        {obj.rank}. {obj.username}
                    </div>
                )
            });
        }
        return (
            <div>
                Nobody sent submission yet, be the first !
            </div>
        )

    };

    render() {
        return (
            <div className="card">
                <div className="header">
                    <p className="title">Leaderboard</p>
                    <hr/>
                </div>
                <div className="content" style={{paddingTop: "75px"}}>
                    {this.printMembers()}
                </div>
            </div>
        )
    };
}

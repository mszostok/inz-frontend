import React, {PropTypes, Component} from "react";


export default class Author extends Component {
    render() {
        return (
            <div className="card">
                <div className="header">
                    <p className="title">Author</p>
                    <hr/>

                </div>
                <div className="content">
                    <div className="stats">
                        {this.props.name}
                    </div>
                </div>
            </div>
        )
    };
}

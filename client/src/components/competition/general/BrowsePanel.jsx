import React, {PropTypes, Component} from "react";
import {Link} from "react-router";

export default class BrowsePanel extends Component {
    getLinkFor = (suffix) => {
        const id = this.props.id;
        return "/competition/" + id + suffix;
    };

    printLi() {
        return [
            {path: "/introduction", name: "Introduction"},
            {path: "/formula", name: "Competition Formula"},
            {path: "/dataset", name: "Dataset"},
            {path: "/post-submission", name: "Post submission"},
        ].map((to, idx) => {
            return (
                <li key={idx}><Link to={this.getLinkFor(to.path)}
                                    style={{color: "#333333"}}
                                    activeClassName="nav-comp-active">
                    <i className="pe-7s-ribbon"/> {to.name}
                </Link>
                </li>
            );
        });
    }

    printPreviewLi() {
        return [
            {path: "/introduction", name: "Introduction"},
            {path: "/formula", name: "Competition Formula"},
            {path: "/dataset", name: "Dataset"},
            {path: "/post-submission", name: "Post submission"},
        ].map((to, idx) => {
            return (
                <li key={idx}><a onClick={this.props.preview}
                                 name={to.path}
                                 style={this.props.preview() == to.path ? styles.active : styles.inactive}>
                    <i className="pe-7s-ribbon"/> {to.name}
                </a>
                </li>
            );
        });
    }

    setClass = (path) => {
        if (this.props.preview() == path) {
            return styles.active;
        }
        return styles.inactive;
    };

    render() {
        return (
            <div className="card">
                <div className="header">
                    <p className="title">Browse Panel</p>
                    <hr/>
                </div>
                <div className="content">
                    <ul className="nav" style={{marginLeft: "-18px"}}>
                        {this.props.preview ? this.printPreviewLi() : this.printLi()}
                        {this.props.canConfigure &&
                        <li key="999"><Link to={this.getLinkFor("/manage")}
                                            style={{color: "#333333"}}
                                            activeClassName="nav-comp-active">
                            <i className="pe-7s-config"/> Manage
                        </Link>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        )
    };
}

const styles = {
    inactive: {
        color: "#333333",
        cursor: "pointer",
    },
    active: {
        color: "#FF9500",
        cursor: "pointer",
    },
};
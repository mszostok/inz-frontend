import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "../../modules/AppCtx";

@observer
export default class Formula extends Component {
    constructor(props) {
        super(props);
        this.data = observable({
                formula: {},
                error: '',
            }
        )
    }

    componentDidMount() {
        var self = this;
        const id = this.props.params.id;
        var loginReq = new Request('http://localhost:8081/api/competitions/' + id + '/description/formula', {
            method: 'GET',
        });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/formula").then((response) => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then((data) => {
                        if (data.error) {
                            self.data.error = data.error;
                        } else {
                            self.data.error = data.message;
                        }
                    });
                return;
            }
            response.json().then((data) => {
                    self.data.formula = data;
                    self.data.error = null;
                });
        }).catch(reason => {
            self.data.error = reason;
        });

    }

    render() {
        return (
            <div className="card">
                <div className="header">
                    <h4 className="title">Competition Formula</h4>
                    <p className="category">Rules etc.</p>
                </div>
                <div className="content">
                    <div className="content" dangerouslySetInnerHTML={{__html: this.data.formula.text}}></div>
                    <div className="footer">
                        <div className="legend">
                        </div>
                        <hr/>
                        <div className="stats">
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

Formula.contextTypes = {
    router: PropTypes.object.isRequired
};

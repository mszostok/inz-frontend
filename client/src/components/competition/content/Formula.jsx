import React, {PropTypes, Component} from "react";
import AppCtx from "AppCtx";

export default class Formula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: {},
            error: null,
        }

    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({
                error: null,
                formula: {
                    text: this.props.preview.formulaDescription,
                },
            });
            return;
        }
        const id = this.props.params.id;
        let self = this,
            loginReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id + '/description/formula', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/formula").then((response) => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then((data) => {
                    let err;
                    if (data.error) {
                        err = data.error;
                    } else {
                        err = data.message;
                    }
                    this.setState({
                        error: err,
                        formula: {},
                    })
                });
                return;
            }
            response.json().then((data) => {
                this.setState({
                    formula: data,
                    error: null,
                })
            });
        }).catch(reason => {
            this.setState({
                error: reason,
                formula: {},
            })
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
                    {this.state.error &&
                    <div className="content">
                        <div className="alert alert-danger fade in"><span><b>Error - </b> {this.state.error}</span>
                        </div>
                    </div>
                    }
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.formula.text}}></div>
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

import React, {PropTypes, Component} from "react";
import {observer} from "mobx-react";
import AppCtx from 'AppCtx';

export default class Introduction extends Component {
    constructor(props) {
        super(props);

        this.state = {
                introduction: {},
                error: '',
            };
    }

    componentDidMount() {
        if (this.props.preview) {
            this.setState({
                error: null,
                introduction: {
                    text: this.props.preview.introductionDescription,
                },
            });
            return;
        }

        const id = this.props.params.id;
        let self = this,
            loginReq = new Request('http://localhost:8081/api/competitions/' + id + '/description/introduction', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/introduction").then((response) => {
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
                        introduction: {},
                    })
                });
                return;
            }
            response.json().then((data) => {
                this.setState({
                    introduction: data,
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
                    <h4 className="title">Introduction</h4>
                    <p className="category">Full description about this competition</p>
                </div>
                <div className="content">
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.introduction.text}}></div>

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

Introduction.contextTypes = {
    router: PropTypes.object.isRequired
};

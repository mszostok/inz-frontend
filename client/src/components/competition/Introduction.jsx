import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "../../modules/AppCtx";

@observer
export default class Introduction extends Component {
    constructor(props) {
        super(props);

        this.data = observable({
                introduction: {},
                error: '',
            }
        )
    }

    componentDidMount() {
        const id = this.props.params.id;
        let self = this,
            loginReq = new Request('http://localhost:8081/api/competitions/' + id + '/description/introduction', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, "/competition/" + id + "/introduction").then((response) => {
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
                self.data.introduction = data;
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
                    <h4 className="title">Introduction</h4>
                    <p className="category">Full description about this competition</p>
                </div>
                <div className="content">
                    <div className="content" dangerouslySetInnerHTML={{__html: this.data.introduction.text}}></div>

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

import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "AppCtx";
import Layout from "comp-comp/Layout";

@observer // todo: probably remove
export default class Competition extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            generalInfo: {},
            error: null,
        });
    }

    async componentDidMount() {

        const id = this.props.params.id;
        let generalInfoReq = new Request(AppCtx.serviceBasePath + '/api/competitions/' + id + '/general-info', {
            method: 'GET',
        });

        try {
            let response = await AppCtx.doWithToken(this.context, generalInfoReq, 'competitions/' + id + '/general-info');
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                });
                return;
            }
            response.json().then(data => {
                this.data.generalInfo = data;
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    }

    render() {
        const {id} = this.props.params;
        return (
            <Layout
                id={id}
                generalInfo={this.data.generalInfo}
                error={this.data.error}
                children={this.props.children}
            />
        );
    }
}


Competition.contextTypes = {
    router: PropTypes.object.isRequired
};

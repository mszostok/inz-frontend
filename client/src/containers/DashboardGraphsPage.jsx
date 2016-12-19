import React, {PropTypes, Component} from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import AppCtx from "AppCtx";
import Graphs from "../components/DashboardCompetitionGraphs";


@observer
export default class DashboardPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.data = observable({
            participation: {},
            createdCompetitions: {},
            error: null,
        });
    }

    async fetchParticipation() {
        let participationReq = new Request(AppCtx.serviceBasePath + '/api/competitions/participation', {
            method: 'GET',
        });
        try {
            let response = await AppCtx.doWithToken(this.context, participationReq, '/dashboard');
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
                this.data.participation = data;
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    }

    async fetchCreatedCompetition() {
        let createdCompetitionsReq = new Request(AppCtx.serviceBasePath + '/api/competitions/created', {
            method: 'GET',
        });
        try {
            let response = await AppCtx.doWithToken(this.context, createdCompetitionsReq, '/dashboard');
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
                this.data.createdCompetitions = data;
                this.data.error = null;
            });
        } catch (reason) {
            console.log('while fetching general info data: ', reason);
            this.data.error = "Service unavailable";
        }
    }

    async componentDidMount() {
        this.fetchParticipation();
        this.fetchCreatedCompetition();
    }

    render() {
        // const {id} = this.props.params;
        return (
            <Graphs
                participation={this.data.participation}
                createdCompetitions={this.data.createdCompetitions}
            />
        );
    }
}

//TODO: remove it and make as module
DashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
};



import React, {PropTypes, Component} from "react";
import Auth from "../modules/Auth";
import {observable} from "mobx";
import {observer} from "mobx-react";
import Data from "../components/competition/create/Data";
import BasicDetails from "../components/competition/create/BasicDetails";
import Documentation from "../components/competition/create/Documentation";
import Preview from "../components/competition/create/Preview";

// import store from '../store/index'
@observer
class CreateCompPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.data = observable({
            step: 1,
            competition: {},
        });

        this.error = observable({
            summary: '',
        });

        this.message = observable({
            summary: '',
        });
    }

    nextForm = () => {
        this.data.step += 1;
    };

    prevForm = () => {
        this.data.step -= 1;
    };

    properView() {
        switch (this.data.step) {
            case 1:
                return <BasicDetails
                    data={this.data}
                    nextForm={this.nextForm}/>;
            case 2:
                return <Documentation
                    nextForm={this.nextForm}
                    prevForm={this.prevForm}
                    data={this.data}
                />;
            case 3:
                return <Data
                    nextForm={this.nextForm}
                    prevForm={this.prevForm}
                    data={this.data}
                />;

            case 4:
                return <Preview
                    nextForm={this.nextForm}
                    prevForm={this.prevForm}
                    data={this.data}
                />;

        }
    }

    render() {
        return (
            this.properView()
        );
    }
}


export default CreateCompPage;

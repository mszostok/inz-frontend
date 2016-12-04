import React, {PropTypes} from "react";
import SignUpForm from "../components/SignUpForm.jsx";
import {observable} from "mobx";
import AppCtx from '../modules/AppCtx';

class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = observable({
            error: {},
            user: {
                email: '',
                username: '',
                password: ''
            },
            message: {
                summary: '',
            },
        });
    }

    clearUserDataForm() {
        this.data.error = {};
        this.data.user = {
            email: '',
            username: '',
            password: ''
        };
    }

    submitForm = (event) => {
        event.preventDefault();
        let self = this,
            loginReq = new Request(AppCtx.serviceBasePath + '/api/register', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(
                    this.data.user,
                )
            });

        fetch(loginReq).then(response => {
                if (response.status !== 201) { // todo add 404 and then we know that is validating issue
                    console.log('unexpected response status: ' + response.status);
                    response.json().then(function (data) {
                        self.data.error = data;
                        self.data.message.summary = null;
                    });
                    return;
                }
                self.data.message.summary = "Successful!";
                self.clearUserDataForm();
            }
        )
            .catch(reason => {
                console.log('while perform sing up: ', reason);
                self.data.message.summary = null;
                self.data.error = {
                    summary: "Service unavailable",
                }
            });
    };

    render() {
        return (
            <SignUpForm
                submitForm={this.submitForm}
                data={this.data}
                message={this.message}
            />
        );
    }

}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;

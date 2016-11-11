import React, {PropTypes} from "react";
import SignUpForm from "../components/SignUpForm.jsx";
import {observable} from "mobx";


class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.user = observable({
            email: '',
            name: '',
            password: ''
        });
        this.error = observable({
            summary: '',
        });

        this.message = observable({
            summary: '',
        });
        this.submitForm = this.submitForm.bind(this);
    }

    clearUserDataForm() {
        this.user.email = '';
        this.user.name = '';
        this.user.password = '';
    }

    submitForm(event) {
        event.preventDefault();
        var self = this;
        var loginReq = new Request('http://localhost:8081/api/register', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                username: this.user.name,
                email: this.user.email,
                password: this.user.password,
            })
        });

        console.log("tuu");

        fetch(loginReq)
            .then(response => {
                    if (response.status !== 201) {
                        console.log('unexpected response status: ' + response.status);
                        response.json()
                            .then(function (data) {
                                console.log("data: ", data);
                                self.error.summary = data.message;
                                self.message.summary = null;
                            });
                        return;
                    }

                    //this.context.router.replace('/login');
                    self.message.summary = "Successful!";
                    self.error.summary = null;
                    self.clearUserDataForm();
                }
            )
            .catch(reason => {
                console.log('while perform sing up: ', reason);
                self.error.summary = "Service unavailable";
            });
    }

    render() {
        return (
            <SignUpForm
                submitForm={this.submitForm}
                user={this.user}
                error={this.error}
                message={this.message}
            />
        );
    }

}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;

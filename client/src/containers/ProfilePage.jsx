import React, {PropTypes, Component} from "react";
import Auth from "../modules/Auth";
import {observable} from "mobx";
import ProfileForm from "../components/ProfileForm";

class ProfilePage extends Component {

    constructor(props, context) {
        super(props, context);

        this.data = observable({
            user: {},
        });

        this.error = observable({
            summary: '',
        });

        this.message = observable({
            summary: '',
        });

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        var self = this;
        var loginReq = new Request('http://localhost:8081/api/profile', {
            method: 'GET',
            headers: new Headers({
                "Authorization": "Bearer " + Auth.getToken(),
            }),
        });

        fetch(loginReq)
            .then(response => {
                    if (response.status === 401) {
                        Auth.deauthenticateUser();
                        self.context.router.replace("/login");
                        return;
                    }
                    if (response.status !== 200) {
                        console.log('unexpected response status: ' + response.status);
                        response.json()
                            .then(function (data) {
                                console.log("data: ", data);
                                self.error.summary = data.message;
                            });
                        return;
                    }
                    response.json()
                        .then(function (data) {
                            console.log("data: ", data);
                            self.data.user = data;
                            console.log("data: ", self.user);
                        });
                    self.error.summary = null;
                }
            )
            .catch(reason => {
                console.log('while fetching user data: ', reason);
                self.error.summary = "Service unavailable";
            });
    }

    submitForm(event) {
        event.preventDefault();
        var self = this;

        var loginReq = new Request('http://localhost:8081/api/profile', {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Auth.getToken(),
            }),
            body: JSON.stringify({
                username: this.data.user.username,
                email: this.data.user.email,
                firstName: this.data.user.firstName,
                lastName: this.data.user.lastName,
                city: this.data.user.city,
                country: this.data.user.country,
                postalCode: this.data.user.postalCode,
            })
        });

        fetch(loginReq)
            .then(response => {
                    if (response.status !== 200) {
                        console.log('unexpected response status: ' + response.status);
                        response.json()
                            .then(function (data) {
                                console.log("data: ", data);
                                self.error.summary = data.message;
                                self.message.summary = null;
                            });
                        return;
                    }

                    response.json()
                        .then(function (data) {
                            console.log("data: ", data);
                            self.data.user = data;
                            console.log("data: ", self.user);
                        });
                    self.message.summary = "Update successful";
                    self.error.summary = null;
                }
            )
            .catch(reason => {
                console.log('while updating profile: ', reason);
                self.error.summary = "Service unavailable";
            });

    }

    render() {
        return (
            <ProfileForm
                submitForm={this.submitForm}
                data={this.data}
                error={this.error}
                message={this.message}
            />
        );
    }

}


export default ProfilePage;

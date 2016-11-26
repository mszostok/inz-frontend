import React, {PropTypes, Component} from "react";
import AppCtx from 'AppCtx';
import {observable} from "mobx";
import ProfileForm from "../components/ProfileForm";

class ProfilePage extends Component {

    constructor(props, context) {
        super(props, context);

        this.data = observable({
            user: {},
            error: null,
        });

        this.message = observable({
            summary: '',
        });

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        let self = this,
            loginReq = new Request('http://localhost:8081/api/profile', {
                method: 'GET',
            });

        AppCtx.doWithToken(self.context, loginReq, 'profile').then(response => {
                if (response.status !== 200) {
                    console.log('unexpected response status: ' + response.status);
                    response.json()
                        .then(data => {
                            if (data.error) {
                                self.data.error = {
                                    summary: data.error,
                                };
                            } else {
                                self.data.error = {
                                    summary: data.message,
                                };
                            }
                        });
                    return;
                }
                response.json().then(data => {
                    self.data.user = data;
                    self.data.error = null;
                });
            }
        ).catch(reason => {
            self.data.error = {
                summary: reason,
            };
        });
    }

    submitForm(event) {
        event.preventDefault();
        let updateProfileReq = new Request('http://localhost:8081/api/profile', {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(
                this.data.user
            )
        });

        AppCtx.doWithToken(this.context, updateProfileReq, 'profile').then(response => {
            if (response.status !== 200) {
                console.log('unexpected response status: ' + response.status);
                response.json().then(data => {
                    if (data.error) {
                        this.data.error = data.error;
                    } else {
                        this.data.error = data.message;
                    }
                    this.message.summary = null;
                });
                return;
            }
            response.json().then(data => {
                this.data.user = data;
                this.message.summary = "Update successful";
                this.error.summary = null;
            });
        }).catch(reason => {
            this.error.summary = reason;
        })
    }

    render() {
        return (
            <ProfileForm
                submitForm={this.submitForm}
                data={this.data}
                message={this.message}
            />
        );
    }

}
ProfilePage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ProfilePage;

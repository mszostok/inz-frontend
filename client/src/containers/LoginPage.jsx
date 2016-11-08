import React, {PropTypes, Component} from "react";
import LoginForm from "../components/LoginForm.jsx";
import Auth from "../modules/Auth";
import {observable} from "mobx";

class LoginPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.user = observable({
            email: 'szostok.mateusz@gmail.com',
            password: 'demo',
        });

        this.error = observable({
            summary: '',
        });

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();

        const email = encodeURIComponent(this.user.email);
        const password = encodeURIComponent(this.user.password);
        console.log("email: ", email);
        Auth.login(email, password, (err) => {
            if (err) {
                this.error.summary = err.message;
                return;
            }

            const {location} = this.props;

            if (location.state && location.state.nextPathname) {
                console.log("redirecting to previous location: ", location.state.nextPathname);
                this.context.router.replace(location.state.nextPathname)
            } else {
                this.context.router.replace('/')
            }
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <LoginForm
                submitForm={this.submitForm}
                user={this.user}
                error={this.error}
            />
        );
    }

}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;

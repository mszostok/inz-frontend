import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import {observer} from "mobx-react";
import {Card, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "../assets/sass/blue.scss";

@observer
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this)
    }

    updateProperty(key, value) {
        this.props.user[key.target.name] = value
    }

    render() {
        const {user, submitForm, error} = this.props;
        return (
            <Card className="login-form">
                <form onSubmit={submitForm}>
                    <h2 className="card-heading">Login</h2>

                    {error.summary && <p className="error-message">{error.summary}</p>}

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Email"
                            name="email"
                            onChange={this.updateProperty}
                            value={user.email}
                        />
                    </div>

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            onChange={this.updateProperty}
                            value={user.password}
                        />
                    </div>

                    <div className="button-line">
                        <RaisedButton type="submit" label="Log in" primary/>
                    </div>
                    <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
                </form>
            </Card>
        )
    }
}

LoginForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string
    })
};
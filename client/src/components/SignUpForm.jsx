import React, {PropTypes, Component} from "react";
import {Link} from "react-router";
import {observer} from "mobx-react";
import {Card, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";


@observer
export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
    }

    updateProperty = (key, value) => {
        this.props.data.user[key.target.name] = value
    };

    render() {
        const {submitForm, data} = this.props;
        return (
            <Card className="login-form">
                <form action="/" onSubmit={submitForm}>
                    <h2 className="card-heading">Sign Up</h2>

                    {data.error.summary && <div className="alert alert-danger" role="alert">{data.error.summary}</div>}
                    {data.message.summary && <div>
                        {data.message.summary} Now you can <span style={{color: "white !important"}}><Link
                        to="/login">log in</Link></span></div>}


                    <div className="field-line">
                        <TextField
                            floatingLabelText="Name"
                            name="username"
                            onChange={this.updateProperty}
                            value={data.user.username}
                            errorText={data.error.username}
                        />
                    </div>

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Email"
                            name="email"
                            onChange={this.updateProperty}
                            value={data.user.email}
                            errorText={data.error.email}
                        />
                    </div>

                    <div className="field-line">
                        <TextField
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            onChange={this.updateProperty}
                            value={data.user.password}
                            errorText={data.error.password}
                        />
                    </div>

                    <div className="button-line">
                        <RaisedButton type="submit" label="Create New Account" primary/>
                    </div>

                    <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
                </form>
            </Card>
        );
    }
}

SignUpForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        username: PropTypes.string,
    })
};


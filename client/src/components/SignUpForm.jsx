import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {observer} from 'mobx-react';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


@observer
export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this)
    }

    updateProperty(key, value) {
        this.props.user[key.target.name] = value
    }

    render() {
        const {user, submitForm, error, message} = this.props;
        return (
            <Card className="login-form">
                <form action="/" onSubmit={submitForm}>
                    <h2 className="card-heading">Sign Up</h2>

                    {error.summary && <div className="alert alert-danger" role="alert">{error.summary}</div>}


                    <div className="field-line">
                        <TextField
                            floatingLabelText="Name"
                            name="name"
                            onChange={this.updateProperty}
                            value={user.name}
                        />
                    </div>

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


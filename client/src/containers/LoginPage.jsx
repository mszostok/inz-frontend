import React, {PropTypes} from "react";
import LoginForm from "../components/LoginForm.jsx";


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    var self = this;

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${email}&password=${password}`;

    var reqInit = {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body: formData
    };

    var loginReq = new Request('http://localhost:8080/api/auth/login', reqInit);
    fetch(loginReq)
      .then(function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            response.json().then(function (data) {
              console.log(data);
              // change the component state
              const errors = response.errors ? xhr.response.errors : {};
              errors.summary = data.message;

              self.setState({
                errors
              });

            });
            return;
          }

          // save the token
          response.json().then(function (data) {
            console.log(data);
           // Auth.authenticateUser(data.token);
          });

          // change the current URL to /
          self.context.router.replace('/');
        }
      )
      .catch(function (err) {
        console.log('Fetch Error', err);
      });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;

class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static redirectToLogin(nextState, replace) {
        if (!Auth.isUserAuthenticated()) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
            console.log('jaa')
        }
    }


    static login(email, password, cb) {
        const formData = `username=${email}&password=${password}`;
        cb = arguments[arguments.length - 1];

        if (localStorage.token) {
            if (cb) cb(null);
            return
        }

        var loginReq = new Request('http://localhost:8081/b1/auth/login', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: formData
        });

        fetch(loginReq)
            .then(response => {
                    if (response.status !== 200) {
                        console.log('unexpected response status: ' + response.status);
                        response.json()
                            .then(function (data) {
                                if (cb) cb(data)
                            });
                        return;
                    }

                    response.json().then(function (data) {
                        Auth.authenticateUser(data.token);
                    });

                    if (cb) cb(null);
                }
            )
            .catch(reason => {
                console.log('while perform login: ', reason);
                if (cb) cb({message: "Service unavailable"});
            });
    }

}

export default Auth;
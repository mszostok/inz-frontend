import AppCtx from "AppCtx";
import jwtDecode from "jwt-decode";

class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isAdmin() {
        return jwtDecode(Auth.getToken()).scopes.includes("ADMIN")
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
        }
    }


    static login(email, password) {
        if (localStorage.token) {
            return Promise.resolve();
        }

        const formData = `email=${email}&password=${password}`;
        let loginReq = new Request(AppCtx.serviceBasePath + '/api/auth/login', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded",
            }),
            body: formData
        });

        return new Promise((resolve, reject) => {
            fetch(loginReq).then(response => {
                    if (response.status !== 200) {
                        console.log('unexpected response status: ' + response.status);
                        response.json().then(function (data) {
                            if (data.error) {
                                reject(data.error);
                            } else {
                                reject(data.message);
                            }
                        });
                    }
                    response.json().then(function (data) {
                        Auth.authenticateUser(data.token);
                        resolve();
                    });
                }
            ).catch(reason => {
                console.log('while do with token ', reason);
                reject("Service unavailable");
            });
        });
    }
}

export default Auth;
import AppCtx from "AppCtx";
import jwtDecode from "jwt-decode";

class Auth {

    static authenticateUser(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
    }

    static getUserEmail() {
        return jwtDecode(Auth.getToken()).sub
    }
    static isAdmin() {
        return jwtDecode(Auth.getToken()).scopes.includes("ADMIN")
    }
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static tryRefreshToken() {
        let loginReq = new Request(AppCtx.serviceBasePath + '/api/auth/token', {
            method: 'GET',
            headers: new Headers({
                "Authorization": "Bearer " + Auth.getRefreshToken(),
            }),
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
                    response.json().then(function (tokens) {
                        Auth.authenticateUser(tokens);
                        resolve();
                    });
                }
            ).catch(reason => {
                console.log('while do with token ', reason);
                reject("Service unavailable");
            });
        });
    }
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
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
                    response.json().then(function (tokens) {
                        Auth.authenticateUser(tokens);
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
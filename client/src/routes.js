import Base from "./components/Base.jsx";
import Landing from "./components/Landing";
import EntryForm from "./components/EntryForm";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import Auth from "./modules/Auth";


const routes = {
    // base component (wrapper for the whole application).
    path: '/',
    component: Base,
    indexRoute: {
        component: Landing
    },
    childRoutes: [
        {
            onEnter: Auth.redirectToLogin,
            childRoutes: [
                // Protected routes
                {
                    path: '/user/:id',
                    component: SignUpPage,
                }
                // ...
            ]
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                // change the current URL to /
                replace('/');
            }
        },
        {
            getComponent: (location, callback) => {
                if (!Auth.isUserAuthenticated()) {
                    callback(null, EntryForm);
                } else {
                    callback(null, Landing);
                }
            },
            childRoutes: [
                {
                    path: '/login',
                    component: LoginPage,
                },
                {
                    path: '/signup',
                    component: SignUpPage,
                }
            ]
        },
    ]
};

export default routes;

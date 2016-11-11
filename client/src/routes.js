import Base from "./components/Base.jsx";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import EntryForm from "./components/EntryForm";
import ProfilePage from "./containers/ProfilePage";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import Auth from "./modules/Auth";


const routes = {
    // base component (wrapper for the whole application).
    path: '/',
    component: Base,
    indexRoute: {
        onEnter: (nextState, replace) => {
            if (Auth.isUserAuthenticated()) {
                replace('/dashboard');

            }
        },
        component: Landing
    },
    childRoutes: [
        {
            onEnter: Auth.redirectToLogin,
            component: Home,
            childRoutes: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                },
                {
                    path: '/profile',
                    component: ProfilePage,
                }

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

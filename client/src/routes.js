import Base from "./components/Base.jsx";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import EntryForm from "./components/EntryForm";
import Introduction from "./components/competition/Introduction";
import Formula from "./components/competition/Formula";
import Dataset from "./components/competition/Dataset";
import PostSubmission from "./components/competition/PostSubmission";
import ProfilePage from "./containers/ProfilePage";
import CreateCompPage from "./containers/CreateCompPage";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import CompetitionPage from "./containers/CompetitionPage";
import CompetitionsPage from "./containers/CompetitionsPage";
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
                },
                {
                    path: '/create-competition',
                    component: CreateCompPage,
                },
                {
                    path: '/competitions',
                    component: CompetitionsPage,
                },
                {
                    component: CompetitionPage,
                    childRoutes: [
                        {
                            path: '/competition/:id/introduction',
                            component: Introduction,
                        },
                        {
                            path: '/competition/:id/formula',
                            component: Formula,
                        },
                        {
                            path: '/competition/:id/dataset',
                            component: Dataset,
                        },
                        {
                            path: '/competition/:id/post-submission',
                            component: PostSubmission,
                        },
                    ]
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
            onEnter: (nextState, replace) => {
                if(Auth.isUserAuthenticated()){
                    replace("/");
                }
            },
            component: EntryForm,
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

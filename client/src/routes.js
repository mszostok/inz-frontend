import Base from "./components/Base.jsx";
import Landing from "./components/Landing";
import Home from "./components/Home";
import DashboardPage from "./containers/DashboardPage";
import EntryForm from "./components/EntryForm";
import Introduction from "./components/competition/content/Introduction";
import Formula from "./components/competition/content/Formula";
import Dataset from "./components/competition/content/Dataset";
import PostSubmission from "./components/competition/content/PostSubmission";
import ProfilePage from "./containers/ProfilePage";
import CreateCompPage from "./containers/CreateCompPage";
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import CompetitionPage from "./containers/CompetitionPage";
import CompetitionsPage from "./containers/CompetitionsPage";
import ManagePage from "./containers/ManagePage";
import Auth from "./modules/Auth";
import ManageUsers from "./components/manage/Users";
import ManageCompetitions from "./components/manage/Competitions";


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
                    component: DashboardPage,
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
                },
                {
                    path: '/manage',
                    component: ManagePage,
                },
                {
                    path: '/manage/users',
                    component: ManageUsers,
                },
                {
                    path: '/manage/competitions',
                    component: ManageCompetitions,
                },
            ]
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace('/');
            }
        },
        {
            onEnter: (nextState, replace) => {
                if (Auth.isUserAuthenticated()) {
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

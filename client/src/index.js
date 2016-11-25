import React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import routes from './routes.js';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        {/*<Router history={browserHistory} routes={routes} store={store} />*/}
        <Router history={browserHistory} routes={routes}  />
    </MuiThemeProvider>
), document.getElementById('app'));


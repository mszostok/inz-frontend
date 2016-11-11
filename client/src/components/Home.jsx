import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const Home = ({children}) => (
    <div className="wrapper">
        <div className="sidebar" data-color="blue" data-image="">

            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="" className="simple-text">
                        <b>Alpha</b>version
                    </a>
                </div>

                <ul className="nav">
                    <li>
                        <Link activeClassName="active" to="/dashboard">
                            <i className="pe-7s-graph"></i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link activeClassName="active" to="/profile">
                            <i className="pe-7s-user"></i>
                            <p>User Profile</p>
                        </Link>
                    </li>
                    <li>
                        <Link activeClassName="active" to="/notifications">
                            <i className="pe-7s-bell"></i>
                            <p>Notifications</p>
                        </Link>
                    </li>
                    <li className="active-pro">
                        <Link to="/upgrade">
                            <i className="pe-7s-rocket"></i>
                            <p>About</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        <div className="main-panel">
            <nav className="navbar navbar-default navbar-fixed">

                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <a href="#" className="js-burger-nav-toggle nav-toggle" data-toggle="collapse"
                               data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/logout"><span>Log out</span></Link></li>
                            </ul>
                        </div>
                    </nav>
            </nav>

            {children}

        </div>
    </div>


);


export default Home;



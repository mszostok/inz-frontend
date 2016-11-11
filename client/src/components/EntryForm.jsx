import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const EntryForm = ({children}) => (
    <div>
        <header className="header navbar-fixed-top">
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <a href="#" className="js-burger-nav-toggle nav-toggle" data-toggle="collapse"
                           data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                        <Link to="/" className="navbar-brand"><b>Alpha</b>version</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/signup"><span>Sign up</span></Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>

        <div className="parallax-banner filter-gradient blue" data-color="blue">
            <div className="parallax-banner-background"></div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-md-offset-2">

                            {children}

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer id="footer" role="contentinfo">
            <div className="col-md-12">
                <p className="copyright text-center">&copy; All Rights
                    Reserved.
                    Grażyna bij brawo, wylądowaliśmy !
                </p>
            </div>
        </footer>
    </div>
);

export default EntryForm;

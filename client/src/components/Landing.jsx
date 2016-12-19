import React, {PropTypes} from "react";
import {Link} from "react-router";
import Auth from "../modules/Auth";


const General = () => (
    <div>
        <header id="header-scroll" className="header">
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <a href="#" className="js-burger-nav-toggle nav-toggle" data-toggle="collapse"
                           data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                        <a className="navbar-brand" href=""><b>Alpha</b>version</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#" data-nav-section="goal"><span>What it is</span></a></li>
                            {Auth.isUserAuthenticated() ? (
                                <li><Link to="/logout"><span>Logout</span></Link></li>

                            ) : (
                                <li><Link to="/login"><span>Sign in</span></Link></li>

                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>

        <div className="parallax-banner filter-gradient blue" data-color="blue" data-section="banner">
            <div className="parallax-banner-background"></div>
            <div className="content">
                <div className="description">
                    <h2>Data mining</h2>
                    <h5>Portal for data mining competitions</h5>
                </div>
                <div className="buttons">
                    <Link to="/signup" className="btn btn-fill btn-neutral btn-banner">
                        Sign up
                    </Link>
                    <button className="btn btn-neutral btn-hover-trans btn-banner">
                        Learn more
                    </button>
                </div>
            </div>
        </div>
        <div className="triangle">
        </div>

        <div className="container">
            <div className="row" data-section="goal">
                <div className="headText">
                    <div className="headText-headline">What is a goal</div>
                    <div className="headText-text">
                        It's a platform which allows you to create and take part of any kind of data mining competition
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="homeimage-wrapper"><img src="assets/img/target.png"/></div>
                        <div className="headText">
                            <div className="headText-headline">Who is it for</div>
                            <div className="headText-text"><p>This portal is for all people interested in data mining
                                competitions.</p><p>
                                .</p></div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="homeimage-wrapper"><img src="assets/img/build.png"/></div>
                        <div className="headText">
                            <div className="headText-headline">Create competitions</div>
                            <div className="headText-text"><p>You have ability to create your own competition.
                                The interface is highly customizable - its allows you to describe all
                                steps related to your data set, rules etc. You can easily upload your
                                training and testing files, set competition time frame etc.</p></div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="homeimage-wrapper"><img src="assets/img/comp.png"/></div>
                        <div className="headText">
                            <div className="headText-headline">Take part</div>
                            <div className="headText-text"><p>After log in you can easily take part in competition
                                by downloading dataset and then post your submission which will be automated
                                calculated and you will get your score immediately.</p></div>
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
        { /* child component will be rendered here */ }
        {/*{children}*/}

    </div>
);


export default General;



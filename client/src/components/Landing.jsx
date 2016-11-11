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
                            <li><a href="#" data-nav-section="services"><span>Services</span></a></li>
                            <li><a href="#" data-nav-section="features"><span>Features</span></a></li>

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

        <div className="container-fluid">
            <div className="row">
                <div id="fh5co-our-services" data-section="services">
                    <div className="container">
                        <div className="row row-bottom-padded-sm">
                            <div className="col-md-12 section-heading text-center">
                                <h2 className="">Our Services</h2>
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 ">
                                        <h3>Far far away, behind the word mountains, far from the countries Vokalia and
                                            Consonantia,
                                            there live the blind texts.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="box ">
                                    <div className="icon colored-1"><span><i className="icon-mustache"></i></span></div>
                                    <h3>100% free</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. Separated they live in Bookmarksgrove right at the coast
                                        of
                                        the
                                        Semantics,
                                        a large language ocean.</p>
                                </div>
                                <div className="box to-animate">
                                    <div className="icon colored-4"><span><i className="icon-heart"></i></span></div>
                                    <h3>Made with love</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="box ">
                                    <div className="icon colored-2"><span><i className="icon-screen-desktop"></i></span>
                                    </div>
                                    <h3>Fully responsive</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts.</p>
                                </div>
                                <div className="box to-animate">
                                    <div className="icon colored-5"><span><i className="icon-rocket"></i></span></div>
                                    <h3>Fast &amp; light</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. Separated they live in Bookmarksgrove right at the coast
                                        of
                                        the
                                        Semantics,
                                        a large language ocean.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="box ">
                                    <div className="icon colored-3"><span><i className="icon-eye"></i></span></div>
                                    <h3>Retina-ready</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. Separated they live in Bookmarksgrove right at the coast
                                        of
                                        the
                                        Semantics,
                                        a large language ocean.</p>
                                </div>
                                <div className="box to-animate">
                                    <div className="icon colored-6"><span><i className="icon-user"></i></span></div>
                                    <h3>For creative like you!</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div id="fh5co-features" data-section="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 section-heading text-center">
                                <h2 className="single-animate animate-features-1">Features</h2>
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 single-animate animate-features-2">
                                        <h3>Far far away, behind the word mountains, far from the countries Vokalia and
                                            Consonantia,
                                            there live the blind texts.</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-bottom-padded-sm">
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-present"></i></div>
                                <div className="fh5co-desc">
                                    <h3>100% Free</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-eye"></i></div>
                                <div className="fh5co-desc">
                                    <h3>Retina Ready</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="clearfix visible-sm-block visible-xs-block"></div>
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-crop"></i></div>
                                <div className="fh5co-desc">
                                    <h3>Fully Responsive</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-speedometer"></i></div>
                                <div className="fh5co-desc">
                                    <h3>Lightweight</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="clearfix visible-sm-block visible-xs-block"></div>
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-heart"></i></div>
                                <div className="fh5co-desc">
                                    <h3>Made with Love</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-xs-6 col-xxs-12 fh5co-service to-animate">
                                <div className="fh5co-icon"><i className="icon-umbrella"></i></div>
                                <div className="fh5co-desc">
                                    <h3>Eco Friendly</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                        Consonantia,
                                        there
                                        live the blind texts. </p>
                                </div>
                            </div>
                            <div className="clearfix visible-sm-block visible-xs-block"></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 single-animate animate-features-3">
                                <a href="#" className="btn btn-primary btn-block btn-banner">Learn More</a>
                            </div>
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



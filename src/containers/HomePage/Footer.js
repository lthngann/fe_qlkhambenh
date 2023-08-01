import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./Footer.scss";
import { Link } from "react-router-dom";
import { path } from "../../utils";
import logo from "../../assets/images/logo.png";

class Footer extends Component {
    render() {
        return (
            <>
                <div className="footer-container">
                    <div className="container">
                        <div className="row footer-up">
                            <div className="col-12 col-md-4 col-lg-6 ">
                                <Link to={path.HOMEPAGE}>
                                    <img className="logo" src={logo} />
                                </Link>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 footer-list">
                                <ul>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.contact"}
                                        />
                                    </li>
                                    <li>
                                        <FormattedMessage id={"footer.edtp"} />
                                    </li>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.recruit"}
                                        />
                                    </li>
                                    <li>
                                        <FormattedMessage id={"footer.faq"} />
                                    </li>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.terms-of-use"}
                                        />
                                    </li>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.policy"}
                                        />
                                    </li>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.support-process"}
                                        />
                                    </li>
                                    <li>
                                        <FormattedMessage
                                            id={"footer.regulations"}
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 footer-address">
                                <div className="address-list">
                                    <strong>
                                        <FormattedMessage
                                            id={"footer.headquarters"}
                                        />
                                    </strong>
                                    <p>
                                        <FormattedMessage
                                            id={"footer.address-hn"}
                                        />
                                    </p>
                                </div>
                                <div className="address-list">
                                    <strong>
                                        <FormattedMessage
                                            id={"footer.office"}
                                        />
                                    </strong>
                                    <p>
                                        <FormattedMessage
                                            id={"footer.address-hcm"}
                                        />
                                    </p>
                                </div>
                                <div className="address-list">
                                    <strong>
                                        <FormattedMessage
                                            id={"footer.support"}
                                        />
                                    </strong>
                                    <p>
                                        <FormattedMessage
                                            id={"footer.time-email"}
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-down">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-6 footer-left">
                                <small> © 2022 BookingCare.</small>
                            </div>
                            <div className="col-6 col-md-6 footer-right">
                                <span className="icon fb">
                                    <Link to="/home">
                                        <i className="fab fa-facebook-square"></i>
                                    </Link>
                                </span>
                                <span className="icon yt">
                                    <Link to="/home">
                                        <i className="fab fa-youtube"></i>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Footer;

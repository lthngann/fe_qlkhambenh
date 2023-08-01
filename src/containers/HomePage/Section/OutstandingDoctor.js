import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import Slider from "react-slick";

import "./OutstandingDoctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils";
import { Link } from "react-router-dom";

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors,
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        let { arrDoctors } = this.state;
        let { language } = this.props;

        return (
            <div className="section outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id={"home-page.outstanding-doctor"}
                            />
                        </h2>
                        <div className="section-more">
                            <a>
                                <FormattedMessage id={"home-page.more-info"} />
                            </a>
                        </div>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = new Buffer(
                                            item.image,
                                            "base64"
                                        ).toString("binary");
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                        >
                                            <Link
                                                to={
                                                    path.DETAIL_DOCTORS +
                                                    item.id
                                                }
                                            >
                                                <div className="section-item-content">
                                                    <div
                                                        className="outstanding-doctor-img"
                                                        style={{
                                                            backgroundImage: `url(${imageBase64})`,
                                                        }}
                                                    ></div>
                                                    <div className="item-text">
                                                        <h3>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : nameEn}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);

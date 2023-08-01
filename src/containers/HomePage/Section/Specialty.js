import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "./Specialty.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils";

class Specialty extends Component {
    async componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    render() {
        let { language, specialties } = this.props;
        return (
            <div className="section specialty">
                <div className="section-container">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id={"home-page.specialty-popular"}
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
                            {specialties &&
                                specialties.length > 0 &&
                                specialties.map((item, index) => {
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                        >
                                            <Link
                                                to={
                                                    path.DETAIL_SPECIALTIES +
                                                    item.id
                                                }
                                            >
                                                <div
                                                    className="section-img specialty-img"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                                <h3>
                                                    {language === LANGUAGES.VI
                                                        ? item.nameVi
                                                        : item.nameEn}
                                                </h3>
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
        specialties: state.admin.specialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import "./MedicalFacility.scss";
import * as actions from "../../../store/actions";
import { path } from "../../../utils";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.props.fetchAllClinic();
    }

    render() {
        let { clinics } = this.props;
        return (
            <div className="section medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <h2>
                            <FormattedMessage
                                id={"home-page.outstanding-clinic"}
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
                            {clinics &&
                                clinics.length > 0 &&
                                clinics.map((item, index) => {
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                        >
                                            <Link
                                                to={
                                                    path.DETAIL_CLINICS +
                                                    item.id
                                                }
                                            >
                                                <div
                                                    className="section-img medical-facility-img"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                                <h3>{item.name}</h3>
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
        clinics: state.admin.clinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);

import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import { LANGUAGES } from "../../../utils";
import Footer from "../../HomePage/Footer";
import * as actions from "../../../store/actions";
import { menuDetailClinic } from "../../System/DataValid";
import DoctorList from "../Doctor/DoctorList";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            this.props.fetchClinicById({
                id: id,
                location: "ALL",
            });
        }
    }

    render() {
        let { clinicsById, language } = this.props;

        let html = [
            { key: "introduce", value: clinicsById.descriptionHTMLIntroduce },
            { key: "strengths", value: clinicsById.descriptionHTMLStrengths },
            { key: "equipment", value: clinicsById.descriptionHTMLEquipment },
            { key: "location", value: clinicsById.descriptionHTMLLocation },
            { key: "procedure", value: clinicsById.descriptionHTMLProcedure },
        ];
        return (
            <>
                <div className="detail-clinic-container">
                    <HomeHeader />
                    <div className="detail-clinic-content">
                        {clinicsById && !_.isEmpty(clinicsById) && (
                            <>
                                <div className="detail-clinic-header">
                                    <div className="image">
                                        <div
                                            style={{
                                                backgroundImage: `url(${clinicsById.image})`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="navigation">
                                        <div className="clinic-logo">
                                            <div
                                                className="logo"
                                                style={{
                                                    backgroundImage: `url(${clinicsById.logo})`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="navigation-content">
                                            <div className="clinic-name">
                                                <h1>{clinicsById.name}</h1>
                                            </div>
                                            <div className="clinic-address">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>
                                                    {clinicsById.address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-menu">
                                        <ul>
                                            {menuDetailClinic.map(
                                                (item, index) => (
                                                    <li key={index}>
                                                        <a href={`#` + item.id}>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.titleVi
                                                                : item.titleEn}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="desc-doctor-list">
                                    <DoctorList
                                        idClinic={this.props.match.params.id}
                                        section={"clinic"}
                                    />
                                </div>
                                <div className="desc-clinic">
                                    {menuDetailClinic &&
                                        menuDetailClinic.length > 0 &&
                                        menuDetailClinic.map((item, index) => {
                                            return (
                                                <section
                                                    className="desc-content"
                                                    id={item.id}
                                                    key={index}
                                                >
                                                    <h1 className="desc-title">
                                                        <FormattedMessage
                                                            id={`manage-clinic.${item.id}`}
                                                        />
                                                    </h1>
                                                    {html &&
                                                        html.length > 0 &&
                                                        html.map(
                                                            (html, index) => {
                                                                if (
                                                                    html.key ===
                                                                    item.id
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            className="desc"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: html.value,
                                                                            }}
                                                                            key={
                                                                                index
                                                                            }
                                                                        ></div>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                </section>
                                            );
                                        })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        clinicsById: state.admin.clinicsById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClinicById: (data) => dispatch(actions.fetchClinicById(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);

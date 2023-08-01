import React, { Component } from "react";
import { connect } from "react-redux";

import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import Footer from "../../HomePage/Footer";
import SystemFAQ from "../../../components/SystemFAQ/SystemFAQ";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            currentDoctorId: -1,
        };
    }

    componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id,
            });
            this.props.fetchDetailInforDoctor(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor,
            });
        }
    }

    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;

        let nameVi = "",
            nameEn = "";
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${
                                    detailDoctor && detailDoctor.image
                                        ? detailDoctor.image
                                        : ""
                                })`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="doctor-name">
                                <h1>
                                    {language === LANGUAGES.VI
                                        ? nameVi
                                        : nameEn}
                                </h1>
                            </div>
                            <div className="doctor-intro">
                                {detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description && (
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <DoctorSchedule
                            doctorIdFromParent={this.state.currentDoctorId}
                        />
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor &&
                            detailDoctor.Markdown &&
                            detailDoctor.Markdown.contentHTML && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: detailDoctor.Markdown
                                            .contentHTML,
                                    }}
                                ></div>
                            )}
                    </div>
                    <div className="comment-doctor"></div>
                </div>
                <SystemFAQ />
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetailInforDoctor: (id) =>
            dispatch(actions.fetchDetailInforDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

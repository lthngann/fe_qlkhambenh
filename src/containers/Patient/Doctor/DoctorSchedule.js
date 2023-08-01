import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localizaiton from "moment/locale/vi";
import { FormattedMessage } from "react-intl";

import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import DoctorExtraInfor from "./DoctorExtraInfor";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }

        this.setState({
            allDays: allDays,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.doctorIdFromParent,
                allDays[0].value
            );
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = [];

        for (let i = 0; i < 5; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date())
                        .add(i, "days")
                        .format("dddd - DD/MM");
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }
            object.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();
            allDays.push(object);
        }

        return allDays;
    };

    handleOnChangeSelect = async (event) => {
        if (
            this.props.doctorIdFromParent &&
            this.props.doctorIdFromParent !== -1
        ) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                });
            }
        }
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };

    render() {
        let {
            allDays,
            allAvalableTime,
            isOpenModalBooking,
            dataScheduleTimeModal,
        } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }
                        >
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                <FormattedMessage
                                    id={"patient.detail-doctor.schedule"}
                                />
                            </span>
                        </div>
                        <div className="time-content">
                            <div className="content-left">
                                {allAvalableTime &&
                                allAvalableTime.length > 0 ? (
                                    <>
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={index}
                                                    className={
                                                        language ===
                                                        LANGUAGES.VI
                                                            ? "btn-schedule btn-vi"
                                                            : "btn-schedule btn-en"
                                                    }
                                                    onClick={() =>
                                                        this.handleClickScheduleTime(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}

                                        <div className="book-free">
                                            <span>
                                                <FormattedMessage
                                                    id={
                                                        "patient.detail-doctor.choose"
                                                    }
                                                />
                                                <i className="far fa-hand-point-up"></i>
                                                <FormattedMessage
                                                    id={
                                                        "patient.detail-doctor.and-book"
                                                    }
                                                />
                                                <FormattedMessage
                                                    id={
                                                        "patient.detail-doctor.book-fee"
                                                    }
                                                />
                                                <sup>đ</sup>)
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                    </div>
                                )}
                            </div>
                            <div className="content-right">
                                <DoctorExtraInfor
                                    doctorIdFromParent={
                                        this.props.doctorIdFromParent
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

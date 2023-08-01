import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";

import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import _ from "lodash";
import { saveBulkScheduleDoctorService } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: {},
            currentDate: "",
            rangeTime: [],
        };
    }

    builDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllcodeScheduleTime();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item,
                    isSelected: false,
                }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date !");
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor !");
            return;
        }

        let formatDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(
                (item) => item.isSelected === true
            );
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                });
            } else {
                toast.error("Invalid selected time !");
                return;
            }
        }

        let res = await saveBulkScheduleDoctorService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatDate: formatDate,
        });

        if (res && res.errCode === 0) {
            toast.success("Save infor succeed !");
        } else {
            toast.error("Error saveBulkScheduleDoctorService !");
            console.log("Error saveBulkScheduleDoctorService >>> res: ", res);
        }
    };

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="title">
                        <FormattedMessage id={"manage-schedule.title"} />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <lable>
                                    <FormattedMessage
                                        id={"manage-schedule.choose-doctor"}
                                    />
                                </lable>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.allDoctors}
                                />
                            </div>
                            <div className="col-6">
                                <label>
                                    <FormattedMessage
                                        id={"manage-schedule.choose-date"}
                                    />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={
                                                    item.isSelected === true
                                                        ? "btn-schedule active"
                                                        : "btn-schedule"
                                                }
                                                key={index}
                                                onClick={() =>
                                                    this.handleClickBtnTime(
                                                        item
                                                    )
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage
                                        id={"manage-schedule.save"}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeScheduleTime: () =>
            dispatch(actions.fetchAllcodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

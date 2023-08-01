import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./DoctorList.scss";
import * as actions from "../../../store/actions";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { LANGUAGES } from "../../../utils";

class DoctorList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchAllcodeType("PROVINCE");
        let { idSpecialty, idClinic, section } = this.props;

        switch (section) {
            case "specialty":
                this.props.fetchSpecialtyById({
                    id: idSpecialty,
                    location: "ALL",
                });
                break;
            case "clinic":
                this.props.fetchClinicById({
                    id: idClinic,
                    location: "ALL",
                });
                break;

            default:
                break;
        }
    }

    handleOnChangeSelect = (event) => {
        let { idSpecialty, idClinic, section } = this.props;
        let location = event.target.value;

        switch (section) {
            case "specialty":
                this.props.fetchSpecialtyById({
                    id: idSpecialty,
                    location: location,
                });
                break;
            case "clinic":
                this.props.fetchClinicById({
                    id: idClinic,
                    location: location,
                });
                break;
            default:
                break;
        }
    };

    render() {
        let { allCodeType, language, specialtiesById, clinicsById, section } =
            this.props;

        return (
            <>
                <div className="search-sp-doctor">
                    <select
                        onChange={(event) => this.handleOnChangeSelect(event)}
                        className="select-location"
                    >
                        {allCodeType &&
                            allCodeType.length > 0 &&
                            allCodeType.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI
                                            ? item.valueVi
                                            : item.valueEn}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                {section &&
                    section === "specialty" &&
                    specialtiesById.doctorSpecialty &&
                    specialtiesById.doctorSpecialty.length > 0 &&
                    specialtiesById.doctorSpecialty.map((item, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                                <div className="conten-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorId={item.doctorId}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                </div>
                                <div className="conten-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            doctorIdFromParent={item.doctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {section &&
                    section === "clinic" &&
                    clinicsById.doctorClinic &&
                    clinicsById.doctorClinic.length > 0 &&
                    clinicsById.doctorClinic.map((item, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                                <div className="conten-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            doctorId={item.doctorId}
                                            isShowDescriptionDoctor={true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
                                        />
                                    </div>
                                </div>
                                <div className="conten-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            doctorIdFromParent={item.doctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        specialtiesById: state.admin.specialtiesById,
        clinicsById: state.admin.clinicsById,
        allCodeType: state.admin.allCodeType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSpecialtyById: (data) =>
            dispatch(actions.fetchSpecialtyById(data)),
        fetchClinicById: (data) => dispatch(actions.fetchClinicById(data)),
        fetchAllcodeType: (type) => dispatch(actions.fetchAllcodeType(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);

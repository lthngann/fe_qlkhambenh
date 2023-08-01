import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
    getAllPatentForDoctor,
    postSendRemedy,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatient: [],
            isOpentRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }

    componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllPatentForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            }
        );
    };

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpentRemedyModal: true,
            dataModal: data,
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpentRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Send remedy succeed!");
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error("Send remedy fail!");
            console.error("Send remedy fail!", res);
        }
    };

    render() {
        let { language } = this.props;
        let { dataPatient, isOpentRemedyModal, dataModal } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div className="manage-patient-container">
                        <div className="title">Quản lý bệnh nhân khám bệnh</div>
                        <div className="manage-patient-body row">
                            <div className="col-6 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 table-manage-patient">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Address</th>
                                            <th>Giới tính</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient &&
                                        dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    this.handleConfirm(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <th>No data</th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpentRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

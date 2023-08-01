import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

import "./DoctorExtraInfor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { getExtraDoctorInforById } from "../../../services/userService";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(
                this.props.doctorIdFromParent
            );
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-title">
                        <FormattedMessage
                            id={"patient.extra-infor-doctor.text-address"}
                        />
                    </div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic
                            ? extraInfor.nameClinic
                            : ""}
                    </div>
                    <div className="address-clinic">
                        {extraInfor && extraInfor.addressClinic
                            ? extraInfor.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false ? (
                        <div>
                            <span className="text-price">
                                <FormattedMessage
                                    id={"patient.extra-infor-doctor.price-show"}
                                />
                            </span>
                            {extraInfor &&
                                extraInfor.priceData &&
                                language === LANGUAGES.VI && (
                                    <>
                                        <NumberFormat
                                            value={extraInfor.priceData.valueVi}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={""}
                                        />
                                        <sup>đ</sup>
                                    </>
                                )}
                            {extraInfor &&
                                extraInfor.priceData &&
                                language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={extraInfor.priceData.valueEn}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        suffix={"$"}
                                    />
                                )}
                            <span
                                className="show-detail-btn"
                                onClick={() => this.showHideDetailInfor(true)}
                            >
                                <FormattedMessage
                                    id={
                                        "patient.extra-infor-doctor.view-detail"
                                    }
                                />
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="text-price">
                                <FormattedMessage
                                    id={"patient.extra-infor-doctor.price"}
                                />
                            </div>
                            <div className="detail-price">
                                <div className="detail-price-top">
                                    <div className="detail-price-head">
                                        <span>
                                            <FormattedMessage
                                                id={
                                                    "patient.extra-infor-doctor.price"
                                                }
                                            />
                                        </span>
                                        <span>
                                            {extraInfor &&
                                                extraInfor.priceData &&
                                                language === LANGUAGES.VI && (
                                                    <>
                                                        <NumberFormat
                                                            value={
                                                                extraInfor
                                                                    .priceData
                                                                    .valueVi
                                                            }
                                                            displayType={"text"}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix={""}
                                                        />
                                                        <sup>đ</sup>
                                                    </>
                                                )}
                                            {extraInfor &&
                                                extraInfor.priceData &&
                                                language === LANGUAGES.EN && (
                                                    <NumberFormat
                                                        value={
                                                            extraInfor.priceData
                                                                .valueEn
                                                        }
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={"$"}
                                                    />
                                                )}
                                        </span>
                                    </div>
                                    <p>
                                        {extraInfor && extraInfor.note
                                            ? extraInfor.note
                                            : ""}
                                    </p>
                                </div>
                                <div className="detail-price-down">
                                    <FormattedMessage
                                        id={
                                            "patient.extra-infor-doctor.payment"
                                        }
                                    />
                                    {extraInfor &&
                                    extraInfor.paymentData &&
                                    language === LANGUAGES.VI
                                        ? extraInfor.paymentData.valueVi
                                        : ""}
                                    {extraInfor &&
                                    extraInfor.paymentData &&
                                    language === LANGUAGES.EN
                                        ? extraInfor.paymentData.valueEn
                                        : ""}
                                </div>
                            </div>
                            <div className="hide-price-btn">
                                <span
                                    onClick={() =>
                                        this.showHideDetailInfor(false)
                                    }
                                >
                                    <FormattedMessage
                                        id={
                                            "patient.extra-infor-doctor.hide-detail"
                                        }
                                    />
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

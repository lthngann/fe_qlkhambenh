import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import _ from "lodash";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";
import TableManage from "../../System/Admin/TableManage";
import { titleDoctor } from "../../System/DataValid";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            listDoctor: [],
            hasOldData: false,

            // Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            selectedClinic: "",
            selectedSpecialty: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
            clinicId: "",
            specialtyId: "",
        };
    }

    builDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === "USERS") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "PRICE") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${new Intl.NumberFormat().format(
                        item.valueVi
                    )} VNĐ`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === "SPECIALTY") {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = item.nameVi;
                    let labelEn = item.nameEn;
                    object.label =
                        language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === "CLINIC") {
                data.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }
        return result;
    };

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.builDataInputSelect(
                this.props.listDoctor,
                "USERS"
            );
            this.setState({
                listDoctor: dataSelect,
            });
        }

        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince, resSpecialty } =
                this.props.allRequiredDoctorInfor;
            let dataSelect = this.builDataInputSelect(
                this.props.listDoctor,
                "USERS"
            );
            let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.builDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.builDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            let dataSelectSpecialty = this.builDataInputSelect(
                resSpecialty,
                "SPECIALTY"
            );
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
            });
        }
        if (
            prevProps.allRequiredDoctorInfor !==
            this.props.allRequiredDoctorInfor
        ) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
                this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
            let dataSelectPayment = this.builDataInputSelect(
                resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.builDataInputSelect(
                resProvince,
                "PROVINCE"
            );
            let dataSelectSpecialty = this.builDataInputSelect(
                resSpecialty,
                "SPECIALTY"
            );
            let dataSelectClinic = this.builDataInputSelect(
                resClinic,
                "CLINIC"
            );

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action:
                hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });

        this.setState({
            action: CRUD_ACTIONS.CREATE,
            selectedDoctor: "",
            hasOldData: false,
            contentMarkdown: "",
            contentHTML: "",
            description: "",
            addressClinic: "",
            nameClinic: "",
            note: "",
            selectedProvince: "",
            selectedPayment: "",
            selectedPrice: "",
            selectedSpecialty: "",
            selectedClinic: "",
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let {
            listPayment,
            listPrice,
            listProvince,
            listSpecialty,
            listClinic,
        } = this.state;

        let addressClinic = "",
            nameClinic = "",
            note = "",
            paymentId = "",
            priceId = "",
            provinceId = "",
            specialtyId = "",
            clinicId = "",
            selectedPayment = "",
            selectedPrice = "",
            selectedProvince = "",
            selectedSpecialty = "",
            selectedClinic = "";

        let res = await getDetailInforDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data) {
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                hasOldData: false,
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                addressClinic: "",
                nameClinic: "",
                note: "",
                selectedProvince: "",
                selectedPayment: "",
                selectedPrice: "",
                selectedSpecialty: "",
                selectedClinic: "",
            });
            if (res.data.Markdown && res.data.Doctor_infor) {
                this.setState({
                    hasOldData: true,
                    action: CRUD_ACTIONS.EDIT,
                });
            }
            if (res.data.Markdown) {
                let markdown = res.data.Markdown;
                this.setState({
                    contentMarkdown: markdown.contentMarkdown,
                    contentHTML: markdown.contentHTML,
                    description: markdown.description,
                });
            }
            if (res.data.Doctor_infor) {
                addressClinic = res.data.Doctor_infor.addressClinic;
                nameClinic = res.data.Doctor_infor.nameClinic;
                note = res.data.Doctor_infor.note;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;
                specialtyId = res.data.Doctor_infor.specialtyId;
                clinicId = res.data.Doctor_infor.clinicId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                });
                this.setState({
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    selectedProvince: selectedProvince,
                    selectedSpecialty: selectedSpecialty,
                    selectedClinic: selectedClinic,
                });
            }
        }
    };

    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditFromParent = async (doctor) => {
        let res = await getDetailInforDoctorService(doctor.id);
        let {
            listPayment,
            listPrice,
            listProvince,
            listSpecialty,
            listClinic,
            listDoctor,
        } = this.state;

        let selectedPayment = "",
            selectedPrice = "",
            selectedProvince = "",
            selectedSpecialty = "",
            selectedClinic = "",
            selectedDoctor = "";

        if (res && res.errCode === 0 && res.data) {
            let data = res.data;
            selectedDoctor = listDoctor.find((item) => {
                return item && item.value === data.id;
            });
            this.setState({
                action: CRUD_ACTIONS.CREATE,
                hasOldData: false,
                doctorEditId: doctor.id,
                selectedDoctor: selectedDoctor,
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                addressClinic: "",
                nameClinic: "",
                note: "",
                selectedProvince: "",
                selectedPayment: "",
                selectedPrice: "",
                selectedSpecialty: "",
                selectedClinic: "",
            });
            if (data.Markdown && data.Doctor_infor) {
                this.setState({
                    hasOldData: true,
                    action: CRUD_ACTIONS.EDIT,
                });
            }
            if (data && data.Markdown) {
                this.setState({
                    contentMarkdown: data.Markdown.contentMarkdown,
                    contentHTML: data.Markdown.contentHTML,
                    description: data.Markdown.description,
                });
            }
            if (data && data.Doctor_infor) {
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === data.Doctor_infor.provinceId;
                });
                selectedPayment = listPayment.find((item) => {
                    return item && item.value === data.Doctor_infor.paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === data.Doctor_infor.priceId;
                });
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === data.Doctor_infor.specialtyId;
                });
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === data.Doctor_infor.clinicId;
                });
                this.setState({
                    addressClinic: data.Doctor_infor.addressClinic,
                    nameClinic: data.Doctor_infor.nameClinic,
                    note: data.Doctor_infor.note,
                    selectedProvince: selectedProvince,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    selectedSpecialty: selectedSpecialty,
                    selectedClinic: selectedClinic,
                });
            }
        }
    };

    render() {
        let { hasOldData } = this.state;
        let { listDoctor } = this.props;

        return (
            <div className="manage-doctor-container">
                <div className="title">
                    <FormattedMessage id={"admin.manage-doctor.title"} />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-doctor"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.select-doctor"}
                                />
                            }
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.intro"}
                            />
                        </label>
                        <textarea
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "description")
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.price"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.price"}
                                />
                            }
                            name={"selectedPrice"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.payment"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.payment"}
                                />
                            }
                            name={"selectedPayment"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.province"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.province"}
                                />
                            }
                            name={"selectedProvince"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.name-clinic"}
                            />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "nameClinic")
                            }
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.address-clinic"}
                            />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "addressClinic")
                            }
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id={"admin.manage-doctor.note"} />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnChangeText(event, "note")
                            }
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-specialty"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.select-specialty"}
                                />
                            }
                            name={"selectedSpecialty"}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-doctor.select-clinic"}
                            />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={
                                <FormattedMessage
                                    id={"admin.manage-doctor.select-clinic"}
                                />
                            }
                            name={"selectedClinic"}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className="my-3">
                    <button
                        className={
                            hasOldData === false
                                ? "btn btn-primary"
                                : "btn btn-warning"
                        }
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ? (
                            <span>
                                <FormattedMessage
                                    id={"admin.manage-doctor.save"}
                                />
                            </span>
                        ) : (
                            <span>
                                <FormattedMessage
                                    id={"admin.manage-doctor.add"}
                                />
                            </span>
                        )}
                    </button>
                </div>
                <div className="manage-doctor-table">
                    <TableManage
                        title={titleDoctor}
                        handleEditFromParent={this.handleEditFromParent}
                        action={this.state.action}
                        data={listDoctor}
                        id="doctor"
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        listDoctor: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        detailDoctor: state.admin.detailDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () =>
            dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchDetailInforDoctor: (data) =>
            dispatch(actions.fetchDetailInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

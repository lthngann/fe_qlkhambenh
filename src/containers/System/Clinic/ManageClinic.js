import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";

import "./ManageClinic.scss";
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import {
    clinicTitleData,
    errorData,
    titleClinic,
    descriptionsClinic,
} from "../../System/DataValid";
import TableManage from "../Admin/TableManage";
import ModalDescription from "./ModalDescription";

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            address: "",
            descriptionHTMLIntroduce: "",
            descriptionMarkdownIntroduce: "",
            descriptionHTMLStrengths: "",
            descriptionMarkdownStrengths: "",
            descriptionHTMLEquipment: "",
            descriptionMarkdownEquipment: "",
            descriptionHTMLLocation: "",
            descriptionMarkdownLocation: "",
            descriptionHTMLProcedure: "",
            descriptionMarkdownProcedure: "",
            previewImgUrl: "",
            logo: "",
            previewLogoUrl: "",
            action: CRUD_ACTIONS.CREATE,
            isOpenLogo: false,
            isOpenImg: false,

            isOpentModal: false,
            modalId: "",
            titleModal: "",
        };
    }

    componentDidMount() {
        this.props.fetchAllClinic();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({
                name: "",
                address: "",
                previewImgUrl: "",
                previewLogoUrl: "",
                descriptionHTMLIntroduce: "",
                descriptionMarkdownIntroduce: "",
                descriptionHTMLStrengths: "",
                descriptionMarkdownStrengths: "",
                descriptionHTMLEquipment: "",
                descriptionMarkdownEquipment: "",
                descriptionHTMLLocation: "",
                descriptionMarkdownLocation: "",
                descriptionHTMLProcedure: "",
                descriptionMarkdownProcedure: "",
                action: CRUD_ACTIONS.CREATE,
            });
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeImage = async (event, id) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            if (id && id === "previewImg") {
                this.setState({
                    previewImgUrl: objectUrl,
                    imageBase64: base64,
                });
            }
            if (id && id === "previewLogo") {
                this.setState({
                    previewLogoUrl: objectUrl,
                    logo: base64,
                });
            }
        }
    };

    checkValidateInput = () => {
        let { language } = this.props;
        let isValid = true;
        let arrCheck = clinicTitleData.data;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i].key]) {
                isValid = false;
                if (language === LANGUAGES.VI) {
                    alert(errorData.valueVi + arrCheck[i].valueVi);
                } else {
                    alert(errorData.valueEn + arrCheck[i].valueEn);
                }
                break;
            }
        }
        return isValid;
    };

    handleSaveNewClinic = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        // Fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewClinic({
                name: this.state.name,
                address: this.state.address,
                image: this.state.imageBase64,
                logo: this.state.logo,
                descriptionHTMLIntroduce: this.state.descriptionHTMLIntroduce,
                descriptionMarkdownIntroduce:
                    this.state.descriptionMarkdownIntroduce,
                descriptionHTMLStrengths: this.state.descriptionHTMLStrengths,
                descriptionMarkdownStrengths:
                    this.state.descriptionMarkdownStrengths,
                descriptionHTMLEquipment: this.state.descriptionHTMLEquipment,
                descriptionMarkdownEquipment:
                    this.state.descriptionMarkdownEquipment,
                descriptionHTMLLocation: this.state.descriptionHTMLLocation,
                descriptionMarkdownLocation:
                    this.state.descriptionMarkdownLocation,
                descriptionHTMLProcedure: this.state.descriptionHTMLProcedure,
                descriptionMarkdownProcedure:
                    this.state.descriptionMarkdownProcedure,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAClinic({
                id: this.state.clinicsEditId,
                name: this.state.name,
                address: this.state.address,
                image: this.state.imageBase64,
                logo: this.state.logo,
                descriptionHTMLIntroduce: this.state.descriptionHTMLIntroduce,
                descriptionMarkdownIntroduce:
                    this.state.descriptionMarkdownIntroduce,
                descriptionHTMLStrengths: this.state.descriptionHTMLStrengths,
                descriptionMarkdownStrengths:
                    this.state.descriptionMarkdownStrengths,
                descriptionHTMLEquipment: this.state.descriptionHTMLEquipment,
                descriptionMarkdownEquipment:
                    this.state.descriptionMarkdownEquipment,
                descriptionHTMLLocation: this.state.descriptionHTMLLocation,
                descriptionMarkdownLocation:
                    this.state.descriptionMarkdownLocation,
                descriptionHTMLProcedure: this.state.descriptionHTMLProcedure,
                descriptionMarkdownProcedure:
                    this.state.descriptionMarkdownProcedure,
            });
        }
    };

    openPreviewImage = (id) => {
        if (id === "prevImg") {
            if (!this.state.previewImgUrl) return;
            this.setState({ isOpenImg: true });
        }
        if (id === "prevLogo") {
            if (!this.state.previewLogoUrl) return;
            this.setState({ isOpenLogo: true, isOpenImg: false });
        }
    };

    handleEditFromParent = (clinics) => {
        this.setState({
            name: clinics.name,
            address: clinics.address,
            descriptionHTMLIntroduce: clinics.descriptionHTMLIntroduce,
            descriptionMarkdownIntroduce: clinics.descriptionMarkdownIntroduce,
            descriptionHTMLStrengths: clinics.descriptionHTMLStrengths,
            descriptionMarkdownStrengths: clinics.descriptionMarkdownStrengths,
            descriptionHTMLEquipment: clinics.descriptionHTMLEquipment,
            descriptionMarkdownEquipment: clinics.descriptionMarkdownEquipment,
            descriptionHTMLLocation: clinics.descriptionHTMLLocation,
            descriptionMarkdownLocation: clinics.descriptionMarkdownLocation,
            descriptionHTMLProcedure: clinics.descriptionHTMLProcedure,
            descriptionMarkdownProcedure: clinics.descriptionMarkdownProcedure,
            previewImgUrl: clinics.image,
            previewLogoUrl: clinics.logo,
            action: CRUD_ACTIONS.EDIT,
            clinicsEditId: clinics.id,
        });
    };

    handleDelete = (data) => {
        this.props.deleteAClinic(data.id);
    };

    handleAddDescription = (id) => {
        if (id) {
            for (let i = 0; i < descriptionsClinic.length; i++) {
                if (id === descriptionsClinic[i].id) {
                    this.setState({
                        modalId: id,
                        isOpentModal: true,
                        titleModal: descriptionsClinic[i],
                    });
                }
            }
        }
    };

    closeModal = () => {
        this.setState({
            isOpentModal: false,
            dataModal: {},
        });
    };

    handleSaveDescription = (html, text, id) => {
        switch (id) {
            case "introduce":
                this.setState({
                    descriptionHTMLIntroduce: html,
                    descriptionMarkdownIntroduce: text,
                });
                break;
            case "strengths":
                this.setState({
                    descriptionHTMLStrengths: html,
                    descriptionMarkdownStrengths: text,
                });
                break;
            case "equipment":
                this.setState({
                    descriptionHTMLEquipment: html,
                    descriptionMarkdownEquipment: text,
                });
                break;
            case "location":
                this.setState({
                    descriptionHTMLLocation: html,
                    descriptionMarkdownLocation: text,
                });
                break;
            case "procedure":
                this.setState({
                    descriptionHTMLProcedure: html,
                    descriptionMarkdownProcedure: text,
                });
                break;
        }
    };

    handleCheckBox = () => {};

    render() {
        let { clinics } = this.props;
        let {
            previewImgUrl,
            previewLogoUrl,
            isOpentModal,
            descriptionMarkdownIntroduce,
            descriptionMarkdownStrengths,
            descriptionMarkdownEquipment,
            descriptionMarkdownLocation,
            descriptionMarkdownProcedure,
        } = this.state;

        let values = [
            {
                key: "introduce",
                value: descriptionMarkdownIntroduce,
            },
            {
                key: "strengths",
                value: descriptionMarkdownStrengths,
            },
            {
                key: "equipment",
                value: descriptionMarkdownEquipment,
            },
            {
                key: "location",
                value: descriptionMarkdownLocation,
            },
            {
                key: "procedure",
                value: descriptionMarkdownProcedure,
            },
        ];
        return (
            <div className="manage-clinic-container">
                <div className="title">
                    <FormattedMessage id="admin.manage-clinic.title" />
                </div>
                <div className="add-new-clinic row">
                    <div className="col-6 my-3 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-clinic.name" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        ></input>
                    </div>
                    <div className="col-6 my-3 form-gourp">
                        <label>
                            <FormattedMessage id="admin.manage-clinic.address" />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "address")
                            }
                        ></input>
                    </div>
                    <div className="col-6 my-3 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-clinic.image" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewImg"
                                type="file"
                                hidden
                                onChange={(event) =>
                                    this.handleOnChangeImage(
                                        event,
                                        "previewImg"
                                    )
                                }
                            />
                            <label
                                className="label-upload"
                                htmlFor="previewImg"
                            >
                                <FormattedMessage id="admin.manage-clinic.upload-img" />
                                <i className="fas fa-upload"></i>
                            </label>
                            <div
                                id="prevImg"
                                className="preview-image"
                                style={{
                                    backgroundImage: `url(${previewImgUrl})`,
                                }}
                                onClick={() => this.openPreviewImage("prevImg")}
                            ></div>
                        </div>
                    </div>

                    <div className="col-6 my-3 from-group">
                        <label>
                            <FormattedMessage id="admin.manage-clinic.logo" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewLogo"
                                type="file"
                                hidden
                                onChange={(event) =>
                                    this.handleOnChangeImage(
                                        event,
                                        "previewLogo"
                                    )
                                }
                            />
                            <label
                                className="label-upload"
                                htmlFor="previewLogo"
                            >
                                <FormattedMessage id="admin.manage-clinic.upload-img" />
                                <i className="fas fa-upload"></i>
                            </label>
                            <div
                                id="prevLogo"
                                className="preview-image"
                                style={{
                                    backgroundImage: `url(${previewLogoUrl})`,
                                }}
                                onClick={() =>
                                    this.openPreviewImage("prevLogo")
                                }
                            ></div>
                        </div>
                    </div>
                    {values.map((item, index) => {
                        return (
                            <div className="col-6 my-3 " key={index}>
                                <button
                                    className="btn btn-info"
                                    onClick={() =>
                                        this.handleAddDescription(item.key)
                                    }
                                    htmlFor={item.key}
                                >
                                    <FormattedMessage
                                        id={`admin.manage-clinic.desc-${item.key}`}
                                    />
                                </button>
                                <textarea
                                    className="form-control desc"
                                    id={item.key}
                                    type="text"
                                    value={item.value}
                                    disabled
                                />
                            </div>
                        );
                    })}
                    <div className="col-12 mb-5">
                        <button
                            className={
                                this.state.action === CRUD_ACTIONS.EDIT
                                    ? "btn btn-warning"
                                    : "btn btn-primary"
                            }
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage
                                    id={"admin.manage-clinic.edit"}
                                />
                            ) : (
                                <FormattedMessage
                                    id={"admin.manage-clinic.save"}
                                />
                            )}
                        </button>
                    </div>
                    <div className="col-12 my-3">
                        <TableManage
                            title={titleClinic}
                            handleEditFromParent={this.handleEditFromParent}
                            action={this.state.action}
                            data={clinics}
                            id="clinic"
                            handleDelete={this.handleDelete}
                        />
                    </div>
                    {this.state.isOpenImg === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() =>
                                this.setState({ isOpenImg: false })
                            }
                        />
                    )}
                    {this.state.isOpenLogo === true && (
                        <Lightbox
                            mainSrc={this.state.previewLogoUrl}
                            onCloseRequest={() =>
                                this.setState({ isOpenLogo: false })
                            }
                        />
                    )}
                    {isOpentModal && isOpentModal === true && (
                        <ModalDescription
                            isOpen={this.state.isOpentModal}
                            stateFromParent={this.state}
                            handleSaveDescription={this.handleSaveDescription}
                            closeModal={this.closeModal}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        clinics: state.admin.clinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
        editAClinic: (data) => dispatch(actions.editAClinic(data)),
        fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
        deleteAClinic: (id) => dispatch(actions.deleteAClinic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

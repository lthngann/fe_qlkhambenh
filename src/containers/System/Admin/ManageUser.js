import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./ManageUser.scss";
import LoadingOverlay from "react-loading-overlay";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import TableManage from "../../System/Admin/TableManage";
import { titleUser } from "../../System/DataValid";

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            action: "",
            userEditId: "",
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        this.props.fetchAllUserStart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
            });
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                avatar: "",
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: "",
            });
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({ isOpen: true });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            // Fire redux action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is required: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState,
        });
    };

    handleEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }
        this.setState({
            email: user.email,
            password: "HARDCODE",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    handleEditFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }
        this.setState({
            email: user.email,
            password: "HARDCODE",
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            previewImgUrl: imageBase64,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    handleDelete = (data) => {
        this.props.deleteAUserRedux(data.id);
    };

    render() {
        let { language, isLoadingGender, users } = this.props;
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            genderArr,
            positionArr,
            roleArr,
        } = this.state;
        return (
            <>
                <LoadingOverlay
                    active={isLoadingGender}
                    spinner
                    text="Loading..."
                >
                    <div className="user-redux-container">
                        <div className="title">
                            <FormattedMessage id="manage-user.manage" />
                        </div>
                        <div className="user-redux-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <FormattedMessage id="manage-user.add" />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            value={email}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "email"
                                                );
                                            }}
                                            disabled={
                                                this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            value={password}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "password"
                                                );
                                            }}
                                            disabled={
                                                this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.first-name" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={firstName}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "firstName"
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.last-name" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={lastName}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "lastName"
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.phone-number" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "phoneNumber"
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <label>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={address}
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "address"
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "gender"
                                                );
                                            }}
                                            value={gender}
                                        >
                                            {genderArr &&
                                                genderArr.length > 0 &&
                                                genderArr.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.keyMap}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "position"
                                                );
                                            }}
                                            value={position}
                                        >
                                            {positionArr &&
                                                positionArr.length > 0 &&
                                                positionArr.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item.keyMap
                                                                }
                                                            >
                                                                {language ===
                                                                LANGUAGES.VI
                                                                    ? item.valueVi
                                                                    : item.valueEn}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => {
                                                this.onChangeInput(
                                                    event,
                                                    "role"
                                                );
                                            }}
                                            value={role}
                                        >
                                            {roleArr &&
                                                roleArr.length > 0 &&
                                                roleArr.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.keyMap}
                                                        >
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? item.valueVi
                                                                : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <label>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="preview-img-container">
                                            <input
                                                id="previewImg"
                                                type="file"
                                                hidden
                                                onChange={(event) =>
                                                    this.handleOnChangeImage(
                                                        event
                                                    )
                                                }
                                            />
                                            <label
                                                className="label-upload"
                                                htmlFor="previewImg"
                                            >
                                                Tải ảnh
                                                <i className="fas fa-upload"></i>
                                            </label>
                                            <div
                                                className="preview-image"
                                                style={{
                                                    backgroundImage: `url(${this.state.previewImgUrl})`,
                                                }}
                                                onClick={() =>
                                                    this.openPreviewImage()
                                                }
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            className={
                                                this.state.action ===
                                                CRUD_ACTIONS.EDIT
                                                    ? "btn btn-warning"
                                                    : "btn btn-primary"
                                            }
                                            onClick={() =>
                                                this.handleSaveUser()
                                            }
                                        >
                                            {this.state.action ===
                                            CRUD_ACTIONS.EDIT ? (
                                                <FormattedMessage id="manage-user.edit" />
                                            ) : (
                                                <FormattedMessage id="manage-user.save" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="col-12 my-3">
                                        <TableManage
                                            title={titleUser}
                                            handleEditFromParent={
                                                this.handleEditFromParent
                                            }
                                            action={this.state.action}
                                            data={users}
                                            id="user"
                                            handleDelete={this.handleDelete}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {this.state.isOpen === true && (
                            <Lightbox
                                mainSrc={this.state.previewImgUrl}
                                onCloseRequest={() =>
                                    this.setState({ isOpen: false })
                                }
                            />
                        )}
                    </div>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

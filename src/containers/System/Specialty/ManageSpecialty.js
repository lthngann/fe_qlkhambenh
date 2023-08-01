import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";

import "./ManageSpecialty.scss";
import { CommonUtils, CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import TableManage from "../Admin/TableManage";
import {
    errorData,
    specialtyTitleData,
    titleSpecialty,
} from "../../System/DataValid";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameVi: "",
            nameEn: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            action: "",
            isOpen: false,

            previewImgUrl: "",
            action: CRUD_ACTIONS.CREATE,
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specialties !== this.props.specialties) {
            this.setState({
                nameVi: "",
                nameEn: "",
                previewImgUrl: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
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

    handleEditFromParent = (specialty) => {
        this.setState({
            nameVi: specialty.nameVi,
            nameEn: specialty.nameEn,
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            previewImgUrl: specialty.image,
            action: CRUD_ACTIONS.EDIT,
            specialtyEditId: specialty.id,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };
    handleSaveNewSpecialty = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        // Fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewSpecialty({
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editASpecialty({
                id: this.state.specialtyEditId,
                nameVi: this.state.nameVi,
                nameEn: this.state.nameEn,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            });
        }
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                imageBase64: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({ isOpen: true });
    };

    checkValidateInput = () => {
        let { language } = this.props;
        let isValid = true;
        let arrCheck = specialtyTitleData.data;
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

    handleEditSpecialtyFromParent = (specialty) => {
        this.setState({
            nameVi: specialty.nameVi,
            nameEn: specialty.nameEn,
            descriptionMarkdown: specialty.descriptionMarkdown,
            descriptionHTML: specialty.descriptionHTML,
            previewImgUrl: specialty.image,
            action: CRUD_ACTIONS.EDIT,
            specialtyEditId: specialty.id,
        });
    };

    handleDelete = (data) => {
        this.props.deleteASpecialty(data.id);
    };

    render() {
        let { nameVi, nameEn, descriptionMarkdown, previewImgUrl } = this.state;

        let { specialties } = this.props;

        return (
            <div className="manage-specialty-container">
                <div className="title">
                    <FormattedMessage
                        id={"admin.manage-specialty.specialty-management"}
                    />
                </div>
                <div className="add-new-specialty row">
                    <div className="col-6 my-3 from-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-specialty.name-vi"}
                            />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={nameVi}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "nameVi")
                            }
                        ></input>
                    </div>
                    <div className="col-6 my-3 from-group">
                        <label>
                            <FormattedMessage
                                id={"admin.manage-specialty.name-en"}
                            />
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            value={nameEn}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "nameEn")
                            }
                        ></input>
                    </div>
                    <div className="col-3 my-3">
                        <label>
                            <FormattedMessage id="admin.manage-specialty.specialty-photo" />
                        </label>
                        <div className="preview-img-container">
                            <input
                                id="previewImg"
                                type="file"
                                hidden
                                onChange={(event) =>
                                    this.handleOnChangeImage(event)
                                }
                            />
                            <label
                                className="label-upload"
                                htmlFor="previewImg"
                            >
                                <FormattedMessage id="admin.manage-specialty.upload-img" />
                                <i className="fas fa-upload"></i>
                            </label>
                            <div
                                className="preview-image"
                                style={{
                                    backgroundImage: `url(${previewImgUrl})`,
                                }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div>
                    <div className="col-12 mt-3 desc">
                        <FormattedMessage id={"admin.manage-specialty.desc"} />
                    </div>
                    <div className="col-12 my-3">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12 mb-5">
                        <button
                            className={
                                this.state.action === CRUD_ACTIONS.EDIT
                                    ? "btn btn-warning"
                                    : "btn btn-primary"
                            }
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage
                                    id={"admin.manage-specialty.edit"}
                                />
                            ) : (
                                <FormattedMessage
                                    id={"admin.manage-specialty.save"}
                                />
                            )}
                        </button>
                    </div>
                    <div className="col-12 my-3">
                        <TableManage
                            title={titleSpecialty}
                            handleEditFromParent={this.handleEditFromParent}
                            action={this.state.action}
                            data={specialties}
                            id="specialty"
                            handleDelete={this.handleDelete}
                        />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        specialties: state.admin.specialties,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewSpecialty: (data) =>
            dispatch(actions.createNewSpecialty(data)),
        editASpecialty: (data) => dispatch(actions.editASpecialty(data)),
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
        deleteASpecialty: (id) => dispatch(actions.deleteASpecialty(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

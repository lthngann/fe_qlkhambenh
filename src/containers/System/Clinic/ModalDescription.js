import React, { Component } from "react";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";

import { emitter } from "../../../utils/emitter";
import { LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            //reset state
            this.setState({
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
            });
        });
    }

    handleEditorChange = ({ html, text }) => {
        switch (this.props.stateFromParent.modalId) {
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

    handleAddDescription = () => {
        let {
            descriptionHTMLIntroduce,
            descriptionMarkdownIntroduce,
            descriptionHTMLStrengths,
            descriptionMarkdownStrengths,
            descriptionHTMLEquipment,
            descriptionMarkdownEquipment,
            descriptionHTMLLocation,
            descriptionMarkdownLocation,
            descriptionHTMLProcedure,
            descriptionMarkdownProcedure,
        } = this.state;

        let id = this.props.stateFromParent.modalId;
        switch (id) {
            case "introduce":
                this.props.handleSaveDescription(
                    descriptionHTMLIntroduce,
                    descriptionMarkdownIntroduce,
                    id
                );
                break;
            case "strengths":
                this.props.handleSaveDescription(
                    descriptionHTMLStrengths,
                    descriptionMarkdownStrengths,
                    id
                );
                break;
            case "equipment":
                this.props.handleSaveDescription(
                    descriptionHTMLEquipment,
                    descriptionMarkdownEquipment,
                    id
                );
                break;
            case "location":
                this.props.handleSaveDescription(
                    descriptionHTMLLocation,
                    descriptionMarkdownLocation,
                    id
                );
                break;
            case "procedure":
                this.props.handleSaveDescription(
                    descriptionHTMLProcedure,
                    descriptionMarkdownProcedure,
                    id
                );
                break;
        }

        this.props.closeModal();
    };

    render() {
        let { closeModal, stateFromParent, language } = this.props;

        return (
            <Modal
                isOpen={this.props.isOpen}
                className={"modal-markdown-container"}
                size={"lg"}
                centered={true}
            >
                <ModalHeader toggle={closeModal}>
                    <FormattedMessage id={"admin.manage-clinic.modal.info"} />
                    {language === LANGUAGES.VI
                        ? stateFromParent.titleModal.valueVi
                        : stateFromParent.titleModal.valueEn}
                </ModalHeader>
                <ModalBody>
                    <div className="modal-markdown-body">
                        <div className="col-12 my-3">
                            <MdEditor
                                style={{ height: "500px" }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleAddDescription();
                        }}
                    >
                        <FormattedMessage
                            id={"admin.manage-clinic.modal.add"}
                        />
                    </Button>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={closeModal}
                    >
                        <FormattedMessage
                            id={"admin.manage-clinic.modal.cancel"}
                        />
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDescription);

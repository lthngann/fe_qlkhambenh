import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import SystemFAQ from "../../../components/SystemFAQ/SystemFAQ";
import Footer from "../../HomePage/Footer";
import DoctorList from "../Doctor/DoctorList";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowViewDetail: false,
        };
    }

    componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            this.props.fetchSpecialtyById({
                id: id,
                location: "ALL",
            });
        }
    }

    handleShowViewDetail = () => {
        this.setState({
            isShowViewDetail: !this.state.isShowViewDetail,
        });
    };

    render() {
        let { language, specialtiesById } = this.props;
        let { isShowViewDetail } = this.state;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-content">
                    <div className="desc-specialty">
                        {specialtiesById && !_.isEmpty(specialtiesById) && (
                            <>
                                <div className="desc-title">
                                    <h1>
                                        {language === LANGUAGES.VI
                                            ? specialtiesById.nameVi
                                            : specialtiesById.nameEn}
                                    </h1>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: specialtiesById.descriptionHTML,
                                    }}
                                    className={
                                        isShowViewDetail === true
                                            ? "desc-content"
                                            : "desc-content desc-hide"
                                    }
                                ></div>
                                <div
                                    className="view-detail"
                                    onClick={() => this.handleShowViewDetail()}
                                >
                                    {isShowViewDetail === true ? (
                                        <span>
                                            <FormattedMessage
                                                id={"manage-specialty.hide"}
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <FormattedMessage
                                                id={"manage-specialty.show"}
                                            />
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                        <DoctorList
                            idSpecialty={this.props.match.params.id}
                            section={"specialty"}
                        />
                    </div>
                </div>
                <SystemFAQ />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        specialtiesById: state.admin.specialtiesById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSpecialtyById: (data) =>
            dispatch(actions.fetchSpecialtyById(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

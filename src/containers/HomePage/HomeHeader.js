import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import "./HomeHeader.scss";
import khamChuyenKhoa from "../../assets/icons/khamchuyenkhoa.png";
import khamNhaKhoa from "../../assets/icons/khamnhakhoa.png";
import khamTongQuat from "../../assets/icons/khamtongquat.png";
import khamTuXa from "../../assets/icons/khamtuxa.png";
import sucKhoeTinhThan from "../../assets/icons/suckhoetinhthan.png";
import xetNghiemYHoc from "../../assets/icons/xetnghiemyhoc.png";
import logo from "../../assets/images/logo.png";
import { LANGUAGES, path } from "../../utils";

import { changeLanguageApp } from "../../store/actions";
import CustomScrollbars from "../../components/CustomScrollbars";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpentSidebar: false,
        };
    }

    ChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        // fire redux event: actions
    };

    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleShowSidebar = () => {
        this.setState({
            isOpentSidebar: !this.state.isOpentSidebar,
        });
    };

    render() {
        let { language } = this.props;
        let { isOpentSidebar } = this.state;
        let sidebarData = [
            {
                title: <FormattedMessage id={"home-header.home"} />,
                path: path.HOMEPAGE,
            },
            {
                title: <FormattedMessage id={"home-header.manual"} />,
                path: path.HOMEPAGE,
            },
            {
                title: (
                    <FormattedMessage id={"home-header.partnership-contact"} />
                ),
                path: path.HOMEPAGE,
            },
            {
                title: <FormattedMessage id={"home-header.contact"} />,
                path: path.HOMEPAGE,
            },
            {
                title: <FormattedMessage id={"home-header.faq"} />,
                path: path.HOMEPAGE,
            },
            {
                title: <FormattedMessage id={"home-header.terms-of-use"} />,
                path: path.HOMEPAGE,
            },
        ];
        return (
            <>
                <div
                    className={
                        isOpentSidebar
                            ? "display-cover active"
                            : "display-cover"
                    }
                    onClick={() => this.handleShowSidebar()}
                ></div>
                <div className="home-header-container">
                    <div
                        className={
                            isOpentSidebar
                                ? "sidebar-container active"
                                : "sidebar-container"
                        }
                    >
                        <CustomScrollbars
                            style={{ height: "100%", width: "100%" }}
                        >
                            {sidebarData.map((item, index) => {
                                return (
                                    <div className="sidebar-item" key={index}>
                                        <div className="sidebar-title">
                                            <Link to={item.path}>
                                                {item.title}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="sidebar-footer">
                                <span className="sidebar-icon sidebar-fb">
                                    <Link to="/home">
                                        <i className="fab fa-facebook-square"></i>
                                    </Link>
                                </span>
                                <span className="sidebar-icon sidebar-yt">
                                    <Link to="/home">
                                        <i className="fab fa-youtube"></i>
                                    </Link>
                                </span>
                            </div>
                            <div className="btn-back hide-on-tablet">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleShowSidebar()}
                                >
                                    <FormattedMessage id="home-header.back" />
                                </button>
                            </div>
                        </CustomScrollbars>
                    </div>
                    <div className="home-header-content">
                        <div className="left-content">
                            <div
                                className="header-nav-icon"
                                onClick={() => this.handleShowSidebar()}
                            >
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="header-logo">
                                <img
                                    src={logo}
                                    onClick={() => {
                                        this.returnHome();
                                    }}
                                />
                            </div>
                        </div>
                        <div className="center-content hide-on-mobile-tablet">
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.speciality" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.health-facility" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.doctor" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <b>
                                    <FormattedMessage id="home-header.medical-package" />
                                </b>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.general-examination" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support hide-on-mobile">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() => {
                                        this.ChangeLanguage(LANGUAGES.VI);
                                    }}
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language active"
                                        : "language"
                                }
                            >
                                <span
                                    onClick={() => {
                                        this.ChangeLanguage(LANGUAGES.EN);
                                    }}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title-top">
                                <FormattedMessage id="banner.medical-background" />
                            </div>
                            <div className="title-bottom">
                                <FormattedMessage id="banner.comprehensive-health" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamChuyenKhoa}
                                                alt="Khám chuyên khoa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.specialist-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamTuXa}
                                                alt="Khám từ xa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.remote-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamTongQuat}
                                                alt="Khám tổng quát"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.general-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={xetNghiemYHoc}
                                                alt="Xét nghiệm y học"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.medical-test" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={sucKhoeTinhThan}
                                                alt="Sức khỏe tinh thần"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.mental-health" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="option-icon">
                                        <div className="option-img">
                                            <img
                                                src={khamNhaKhoa}
                                                alt="Khám nha khoa"
                                            />
                                        </div>
                                    </div>
                                    <div className="option-text">
                                        <FormattedMessage id="banner.dental-examination" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

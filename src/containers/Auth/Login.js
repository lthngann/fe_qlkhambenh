import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMessage: "",
        });
        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login success");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    };

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-title">Login</div>
                        <div className="col-12 form-group login-input">
                            <label className="login-label">Username</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnChangeUserName(event)
                                }
                            />
                            <span className="login-focus"></span>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label className="login-label">Password</label>
                            <div className="login-password-custom">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="input"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnChangePassword(event)
                                    }
                                    onKeyDown={(event) =>
                                        this.handleKeyDown(event)
                                    }
                                />
                                <span className="login-focus"></span>
                                <i
                                    className={
                                        this.state.isShowPassword
                                            ? "far fa-eye"
                                            : "far fa-eye-slash"
                                    }
                                    onClick={(event) =>
                                        this.handleShowHidePassword(event)
                                    }
                                ></i>
                            </div>
                        </div>
                        <div className="col-12">
                            <span className="forgot-pass">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="login-btn"
                                onClick={(event) => this.handleLogin(event)}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="login-order">
                                Or Sign Up Using
                            </span>
                        </div>
                        <div className="col-12">
                            <span className="login-social">
                                <div className="login-social-icon facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                                <div className="login-social-icon twitter">
                                    <i className="fab fa-twitter"></i>
                                </div>
                                <div className="login-social-icon google">
                                    <i className="fab fa-google"></i>
                                </div>
                            </span>
                        </div>
                    </div>
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
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

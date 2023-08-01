import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpentModalUser: false,
            isOpentModalEditUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpentModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpentModalUser: !this.state.isOpentModalUser,
        });
    };

    toggleEditUserModal = () => {
        this.setState({
            isOpentModalEditUser: !this.state.isOpentModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpentModalUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA", data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsers();
            } else {
                console.log(response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleEditUser = (user) => {
        this.setState({
            isOpentModalEditUser: true,
            userEdit: user,
        });
    };

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpentModalEditUser: false,
                });
                await this.getAllUsers();
            } else {
                alert("Error: " + response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpentModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpentModalEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpentModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title">Manage users</div>
                <button
                    className="btn btn-primary px-3"
                    onClick={() => this.handleAddNewUser()}
                >
                    Create new user
                </button>
                <div className="table mt-4">
                    <table className="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() => {
                                                        this.handleEditUser(
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn btn-delete"
                                                    onClick={() => {
                                                        this.handleDeleteUser(
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

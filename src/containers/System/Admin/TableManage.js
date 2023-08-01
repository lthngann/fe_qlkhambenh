import { Component } from "react";
import { connect } from "react-redux";

import "./TableManage.scss";
import { LANGUAGES } from "../../../utils";

class TableManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {}
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                data: this.props.data,
            });
        }
    }

    handleEditFromParent = (data) => {
        this.props.handleEditFromParent(data);
    };

    handleDelete = (data) => {
        this.props.handleDelete(data);
    };

    render() {
        let { language, data, title, id } = this.props;
        console.log("Data: ", data);

        return (
            <>
                <table className="table-manage-container">
                    <tbody>
                        <tr>
                            {language === LANGUAGES.VI
                                ? title.valueVi.map((item, index) => {
                                      return <th key={index}>{item}</th>;
                                  })
                                : title.valueEn.map((item, index) => {
                                      return <th key={index}>{item}</th>;
                                  })}
                        </tr>
                        {data &&
                            data.length > 0 &&
                            id === "specialty" &&
                            data.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            this.handleEditFromParent(item);
                                        }}
                                    >
                                        <td className="stt">{index + 1}</td>
                                        <td>{item.nameVi}</td>
                                        <td>{item.nameEn}</td>
                                        <td>
                                            <p className="descSpecialty">
                                                {item.descriptionMarkdown}
                                            </p>
                                        </td>
                                        <td>
                                            <img
                                                className="image"
                                                src={item.image}
                                            ></img>
                                        </td>
                                        <td className="action">
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => {
                                                    this.handleEditFromParent(
                                                        item
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => {
                                                    this.handleDelete(item);
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {data &&
                            data.length > 0 &&
                            id === "clinic" &&
                            data.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            this.handleEditFromParent(item);
                                        }}
                                    >
                                        <td className="stt">{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <p className="descClinic">
                                                {
                                                    item.descriptionMarkdownIntroduce
                                                }
                                            </p>
                                        </td>
                                        <td>
                                            <img
                                                className="image"
                                                src={item.image}
                                            ></img>
                                        </td>
                                        <td>
                                            <img
                                                className="logo"
                                                src={item.logo}
                                            ></img>
                                        </td>
                                        <td className="action">
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => {
                                                    this.handleEditFromParent(
                                                        item
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => {
                                                    this.handleDelete(item);
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {data &&
                            data.length > 0 &&
                            id === "doctor" &&
                            data.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            this.handleEditFromParent(item);
                                        }}
                                    >
                                        <td className="stt">{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{`${item.lastName} ${item.firstName}`}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            {language === LANGUAGES.VI
                                                ? item.genderData.valueVi
                                                : item.genderData.valueEn}
                                        </td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <img
                                                className="avatar"
                                                src={item.image}
                                            ></img>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-edit btn-doctor-action"
                                                onClick={() => {
                                                    this.handleEditFromParent(
                                                        item
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {data &&
                            data.length > 0 &&
                            id === "user" &&
                            data.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        onClick={() => {
                                            this.handleEditFromParent(item);
                                        }}
                                    >
                                        <td className="stt">{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{`${item.lastName} ${item.firstName}`}</td>
                                        <td>{item.address}</td>
                                        <td className="action-user">
                                            <button
                                                className="btn btn-edit btn-user"
                                                onClick={() => {
                                                    this.handleEditFromParent(
                                                        item
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn btn-delete btn-user"
                                                onClick={() => {
                                                    this.handleDelete(item);
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
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);

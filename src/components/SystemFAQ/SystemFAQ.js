import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./SystemFAQ.scss";
import { Link } from "react-router-dom";
import { path } from "../../utils";

class SystemFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <div className="system-faq-container">
                <div className="system-faq-content">
                    <span>
                        <FormattedMessage id={"system-fqa.learn-more"} />
                    </span>
                    <Link to={path.HOMEPAGE}>
                        <p>
                            <FormattedMessage id={"system-fqa.fqa"} />
                        </p>
                    </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SystemFAQ);

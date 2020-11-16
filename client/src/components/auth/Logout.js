import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

//Actions
import { logout } from "../../actions/authactions";

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <NavLink
          onClick={this.props.logout}
          href="#"
          style={{
            letterSpacing: "2px",
          }}
        >
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);

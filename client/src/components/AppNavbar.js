import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//COMPONENTS
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

//ACTIONS

class AppNavbar extends React.Component {
  //Don't need a constructor as not using this.bind for custom function

  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func,
    clearErrors: PropTypes.func,
  };

  // changes isOpen in state
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <NavItem>
          <span className="navbar-text ml-3 spanText">
            {user ? `Welcome ${user.name}` : ""}
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </React.Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand
              href="/"
              style={{
                color: "#ff7e4d",
                letterSpacing: "2px",
                fontWeight: "lighter",
              }}
            >
              TO-DO LIST
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, null)(AppNavbar);

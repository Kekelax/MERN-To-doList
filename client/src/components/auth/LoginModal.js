import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//actions
import { login } from "../../actions/authactions";
import { clearErrors } from "../../actions/erroractions";
import { getItems } from "../../actions/itemactions";

class LoginModal extends React.Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    // if modal is true/open
    if (this.state.modal) {
      //if user is authenticated, close modal
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
    });
    this.props.getItems();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    //attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        {/* Login link on the navbar, this opens the login modal */}
        <NavLink
          onClick={this.toggle}
          href="#"
          style={{
            letterSpacing: "2px",
          }}
        >
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            style={{
              letterSpacing: "2px",
              outline: "none",
            }}
          >
            Login User
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert
                color="warning"
                style={{
                  letterSpacing: "2px",
                }}
              >
                {this.state.msg}
              </Alert>
            ) : null}
            <Form
              onSubmit={this.onSubmit}
              style={{
                letterSpacing: "2px",
              }}
            >
              <FormGroup>
                <Label for="email">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail..."
                  onChange={this.onChange}
                  style={{
                    letterSpacing: "2px",
                    outline: "none",
                  }}
                  className="mb-3"
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password..."
                  onChange={this.onChange}
                  style={{
                    letterSpacing: "2px",
                    outline: "none",
                  }}
                  className="mb-3"
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem", letterSpacing: "2px" }}
                  block
                >
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  item: state.item,
});

export default connect(mapStateToProps, { login, clearErrors, getItems })(
  LoginModal
);

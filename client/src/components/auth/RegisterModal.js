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
import { register } from "../../actions/authactions";
import { clearErrors } from "../../actions/erroractions";

class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
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
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //create user object
    const newUser = {
      name,
      email,
      password,
    };

    //try to register user
    this.props.register(newUser);
    //close modal
    //this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink
          onClick={this.toggle}
          href="#"
          style={{
            letterSpacing: "2px",
          }}
        >
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            style={{
              letterSpacing: "2px",
              outline: "none",
            }}
          >
            Register User
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
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name..."
                  onChange={this.onChange}
                  style={{
                    letterSpacing: "2px",
                    outline: "none",
                  }}
                  className="mb-3"
                />
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
                  Register
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
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);

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
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//actions
import { addItem } from "../actions/itemactions";

class AddItem extends React.Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      user: this.props.auth.user.email,
    };

    //add using addItem action
    this.props.addItem(newItem);

    //close

    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            className="deleteButton"
            style={{
              marginBottom: "2rem",
              letterSpacing: "2px",
              backgroundColor: "#ff7e4d",
              border: "0.5px solid #ff7e4d",
            }}
            onClick={this.toggle}
          >
            Add List Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-3 text-center">Register or log in to manage to-do-list items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
            style={{
              letterSpacing: "2px",
              outline: "none",
            }}
          >
            Add to List
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={this.onSubmit}
              style={{
                letterSpacing: "1px",
                outline: "none",
              }}
            >
              <FormGroup>
                <Label
                  for="item"
                  style={{
                    letterSpacing: "2px",
                    outline: "none",
                  }}
                >
                  Item
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Item ..."
                  onChange={this.onChange}
                  style={{
                    letterSpacing: "2px",
                    outline: "none",
                  }}
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem", letterSpacing: "2px" }}
                  block
                >
                  Add Item
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
  item: state.item,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(AddItem);

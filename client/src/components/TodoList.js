import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //allows to get state from redux to react
import PropTypes from "prop-types";

//actions
import { getItems, deleteItem } from "../actions/itemactions";

class TodoList extends React.Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // get state from reducer
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    const { isAuthenticated } = this.props.auth;
    const item = items.map(({ _id, name }) => (
      <CSSTransition key={_id} timeout={500} classNames="fade">
        <ListGroupItem>
          <Button
            className="remove-btn deleteButton"
            size="sm"
            style={{
              backgroundColor: "#ff7e4d",
              color: "#fff",
              marginRight: "1rem",
              border: "1px solid #ff7e4d",
            }}
            onClick={this.onDeleteClick.bind(this, _id)}
          >
            &times;
          </Button>
          {name}
        </ListGroupItem>
      </CSSTransition>
    ));

    return (
      <div>
        <Container>
          <ListGroup>
            <TransitionGroup className="todo-list">
              {isAuthenticated ? item : null}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(TodoList);

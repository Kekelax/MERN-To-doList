import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux"; //allows to get state from redux to react
import PropTypes from "prop-types";

//actions
import { getItems, deleteItem } from "../actions/itemactions";

class TodoList extends React.Component {
  componentDidMount() {
    // get state from reducer
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Enter item");
            if (name) {
              this.setState((state) => ({
                // use the spread operator to add a new item to items
                items: [
                  ...state.items,
                  { id: uuid(), name: name, user: "Lenny" },
                ],
              }));
            }
          }}
        >
          {" "}
          Add Item
        </Button> */}
        <ListGroup>
          <TransitionGroup className="todo-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    size="sm"
                    style={{
                      backgroundColor: "#ff4700",
                      color: "#fff",
                      marginRight: "1rem",
                      border: "1px solid #ff4700",
                    }}
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

TodoList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(TodoList);

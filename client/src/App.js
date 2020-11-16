import React from "react";
import { Container } from "reactstrap";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authactions";

//components
import AppNavbar from "./components/AppNavbar";
import TodoList from "./components/TodoList";
import AddItem from "./components/additem";

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      //Wrapping everything in <Provider> allows for shared state across components
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <TodoList />
            <AddItem />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

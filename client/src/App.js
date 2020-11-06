import React from "react";
import { Container } from "reactstrap";

//redux
import { Provider } from "react-redux";
import store from "./store";

//components
import AppNavbar from "./components/AppNavbar";
import TodoList from "./components/TodoList";
import AddItem from "./components/additem";

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      //Wrapping everything in <Provider> allows for shared state across components
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <AddItem />
            <TodoList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

import { combineReducers } from "redux";
import itemReducer from "./itemreducer";
import errorReducer from "./errorreducer";
import authReducer from "./authreducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});

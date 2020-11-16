import axios from "axios";
//action types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ITEMS_CLEAR,
} from "./types";
import { returnErrors } from "./erroractions";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //user loading changes isLoading from false to true
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      //gets the msg and status values
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// REGISTER USER

export const register = ({ name, email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/auth/register", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//setup config/headers and token
export const tokenConfig = (getState) => {
  //get token from localStorage - checks the auth reducer for th token value
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //if there is a token, add it to the headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

//LOGIN USER
export const login = ({ email, password }) => (dispatch) => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//LOGOUT USER
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });

  dispatch({
    type: ITEMS_CLEAR,
  });
  // return {
  //   type: LOGOUT_SUCCESS,
  //   type: ITEMS_CLEAR
  // };
};

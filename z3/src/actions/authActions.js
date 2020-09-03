import axios from "axios";

import { returnErrors } from "./errorActions";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNOUT_SUCCESS,
} from "./types";

export const signup = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("http://localhost:4000/auth/signup", body, config)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "SIGNUP_FAIL")
      );
      dispatch({
        type: SIGNUP_FAIL,
      });
    });
};

export const signin = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("http://localhost:4000/auth/signin", body, config)
    .then((res) => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "SIGNIN_FAIL")
      );
      dispatch({
        type: SIGNIN_FAIL,
      });
    });
};

export const signout = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

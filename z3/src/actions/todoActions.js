import axios from "axios";

import { tokenConfig } from "./authActions";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TODOS_LOADING,
  FILTER_TODOS,
} from "./types";
import { returnErrors } from "./errorActions";

export const getTodos = () => (dispatch, getState) => {
  dispatch(setTodosLoading());
  axios
    .get("http://localhost:4000/todos", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const createTodo = (todo) => (dispatch, getState) => {
  axios
    .post("http://localhost:4000/todos", todo, tokenConfig(getState))
    .then((res) => dispatch({ type: CREATE_TODO, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateTodo = (todo) => (dispatch, getState) => {
  console.log(todo);
  axios
    .put(`http://localhost:4000/todos/${todo.id}`, todo, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_TODO,
        payload: todo,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTodo = (id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:4000/todos/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_TODO,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTodosLoading = () => {
  return {
    type: TODOS_LOADING,
  };
};

export const filterTodos = (filter) => {
  return {
    type: FILTER_TODOS,
    payload: filter,
  };
};

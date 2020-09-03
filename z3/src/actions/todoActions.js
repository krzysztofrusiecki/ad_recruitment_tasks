import axios from "axios";

import { tokenConfig } from "./authActions";
import { CREATE_TODO } from "./types";
import { returnErrors } from "./errorActions";

export const createTodo = (todo) => (dispatch) => {
  axios
    .post("http://localhost:4000/todos", todo, tokenConfig)
    .then((res) => dispatch({ type: CREATE_TODO, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

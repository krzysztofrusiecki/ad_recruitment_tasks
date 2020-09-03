import { CREATE_TODO } from "../actions/types";

const initialState = {
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TODOS_LOADING,
  FILTER_TODOS,
} from "../actions/types";

const initialState = {
  todos: [],
  todo: {},
  loading: false,
  filter: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case UPDATE_TODO:
      let updatedTodo = state.todos.filter(
        (todo) => todo.id === action.payload.id
      );
      updatedTodo = {
        id: action.payload.id,
        title: action.payload.title,
        checked: action.payload.checked,
        deadline: action.payload.deadline,
      };
      const restTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state,
        todos: [updatedTodo, ...restTodos],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FILTER_TODOS:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

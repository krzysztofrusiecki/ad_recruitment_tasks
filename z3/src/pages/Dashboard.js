import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Container, List, Form, Button, Header } from "semantic-ui-react";
import { useLastLocation } from "react-router-last-location";

import MainTemplate from "../templates/MainTemplate";
import Todo from "../components/Todo";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../actions/todoActions";

const Dashboard = ({
  isAuthenticated,
  getTodos,
  todos,
  createTodo,
  deleteTodo,
  filter,
  updateTodo,
  error,
  user,
}) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const lastLocation = useLastLocation();

  useEffect(() => {
    getTodos();
  }, [getTodos, lastLocation]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }
  }, [isAuthenticated]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      createTodo({ title, deadline });
      setTitle("");
      setDeadline("");
      setMsg("");
    } else {
      setMsg("Title cannot be empty");
    }
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleUpdate = (todo) => {
    updateTodo(todo);
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().slice(0, 10);
  };

  const filteredTodos = todos.filter(({ checked, deadline }) => {
    const today = new Date().toISOString().slice(0, 10);
    const date = deadline.slice(0, 10);

    if (filter === "") {
      return !checked;
    } else if (filter === "TODAY" && !checked) {
      return date === today;
    } else if (filter === "THIS WEEK" && !checked) {
      return date >= today && date <= addDays(today, 7);
    } else if (filter === "COMPLETED") return checked;
  });

  const sortedTodos = filteredTodos.sort((todoA, todoB) => {
    let comparison = 0;

    if (todoA.deadline > todoB.deadline) comparison = 1;
    else if (todoA.deadline < todoB.deadline) comparison = -1;
    return comparison;
  });

  return (
    <MainTemplate>
      <Container>
        <Header as="h3">{user && `Welcome, ${user}`}</Header>
        {msg ? (
          <Header color="red" as="h5">
            {msg}
          </Header>
        ) : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                height: "50px",
                fontSize: "16px",
              }}
            />
            <Form.Input
              fluid
              type="date"
              value={deadline}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                height: "50px",
                fontSize: "16px",
              }}
            />
            <Button type="sumbit" color="linkedin">
              Add
            </Button>
          </Form.Group>
        </Form>
        <List celled>
          <List.Item
            style={{
              padding: "0 20px",
              height: "50px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              borderTop: "none",
            }}
          >
            <List.Content
              style={{
                padding: "0 222px 0 44px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <List.Header>Title</List.Header>
              <p>
                <b>Date</b>
              </p>
            </List.Content>
          </List.Item>
          {sortedTodos.map(({ id, ...restProps }) => (
            <Todo
              key={id}
              id={id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              {...restProps}
            />
          ))}
        </List>
      </Container>
    </MainTemplate>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  todos: state.todo.todos,
  filter: state.todo.filter,
  error: state.error,
  user: state.auth.user ? state.auth.user.email : null,
});

export default connect(mapStateToProps, {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
})(Dashboard);

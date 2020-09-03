import React from "react";
import { connect } from "react-redux";

import Sidebar from "../components/Sidebar";

const MainTemplate = ({ children, todos }) => {
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().slice(0, 10);
  };

  const count = (todos) => {
    const all = todos.filter(({ checked }) => {
      return !checked;
    }).length;
    const today = todos.filter(
      (todo) =>
        todo.deadline.slice(0, 10) === new Date().toISOString().slice(0, 10) &&
        !todo.checked
    ).length;
    const thisWeek = todos.filter(
      (todo) =>
        todo.deadline.slice(0, 10) >= new Date().toISOString().slice(0, 10) &&
        todo.deadline.slice(0, 10) <=
          addDays(new Date().toISOString().slice(0, 10), 7) &&
        !todo.checked
    ).length;
    const completed = todos.filter((todo) => todo.checked).length;

    return {
      all,
      today,
      thisWeek,
      completed,
    };
  };
  const amount = count(todos);
  return (
    <>
      <Sidebar amount={amount} />
      <div
        style={{
          minHeight: "100vh",
          marginLeft: "300px",
          padding: "40px 40px",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        {children}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

export default connect(mapStateToProps)(MainTemplate);

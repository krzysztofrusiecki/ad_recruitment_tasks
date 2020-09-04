import React, { useState } from "react";
import { List, Button, Input, Header } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";

import Empty from "../../assets/empty.svg";
import Tick from "../../assets/tick.svg";

const Image = styled.div`
  margin-right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: ${({ checked }) =>
    checked ? `url(${Tick})` : `url(${Empty})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  cursor: pointer;

  &:hover {
    background-image: ${({ checked }) =>
      checked ? `url(${Empty})` : `url(${Tick})`};
  }
`;

const Todo = ({ id, title, checked, deadline, handleDelete, handleUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDeadline, setTodoDeadline] = useState(deadline);
  const [msg, setMsg] = useState(null);

  const handleSave = () => {
    if (todoTitle) {
      setEditMode(false);
      handleUpdate({
        id,
        title: todoTitle,
        checked,
        deadline: todoDeadline,
      });
      setMsg("");
    } else {
      setMsg("Title cannot be empty");
    }
  };

  return (
    <>
      <List.Item
        style={{
          padding: "0 20px",
          height: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          checked={checked}
          onClick={() =>
            handleUpdate({ id, title, checked: !checked, deadline })
          }
        />
        <List.Content
          style={{
            paddingRight: "20px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {editMode ? (
            <List.Header>
              <Input
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
            </List.Header>
          ) : (
            <List.Header>{todoTitle}</List.Header>
          )}
          {msg && editMode ? (
            <Header color="red" as="h5">
              {msg}
            </Header>
          ) : null}
          {editMode ? (
            <Input
              type="date"
              value={todoDeadline}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setTodoDeadline(e.target.value)}
            />
          ) : (
            <p>
              <b>{todoDeadline && todoDeadline.slice(0, 10)}</b>
            </p>
          )}
        </List.Content>
        {editMode ? (
          <Button color="linkedin" onClick={() => handleSave()}>
            Save
          </Button>
        ) : (
          <Button color="linkedin" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
        <Button onClick={() => handleDelete(id)} color="red">
          Delete
        </Button>
      </List.Item>
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(Todo);

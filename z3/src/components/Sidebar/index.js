import React, { useState } from "react";
import { Menu, Container, Button, Image, Label } from "semantic-ui-react";
import { connect } from "react-redux";

import Logo from "../../assets/logo2.svg";
import { signout } from "../../actions/authActions";
import { filterTodos } from "../../actions/todoActions";

const Sidebar = ({ signout, filterTodos, amount }) => {
  const [activeItem, setActiveItem] = useState("ALL TODOS");

  const handleItemClick = (e) => {
    const name = e.target.innerText.split("\n")[1].toUpperCase();
    let filter = "";
    if (name === "ALL TODOS") filter = "";
    else if (name === "TODAY") filter = "TODAY";
    else if (name === "THIS WEEK") filter = "THIS WEEK";
    else if (name === "COMPLETED") filter = "COMPLETED";
    console.log(filter);
    filterTodos(filter);
    setActiveItem(name);
  };

  return (
    <Container
      style={{
        padding: "40px 0",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "300px",
        backgroundColor: "#1f88be",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={Logo} size="tiny" />
        <Menu
          vertical
          style={{
            marginTop: "40px",
            width: "80%",
          }}
        >
          <Menu.Item
            name="All todos"
            active={activeItem === "ALL TODOS"}
            onClick={(e) => handleItemClick(e)}
          >
            <Label>{amount.all}</Label>
            All Todos
          </Menu.Item>
          <Menu.Item
            name="Today"
            active={activeItem === "TODAY"}
            onClick={(e) => handleItemClick(e)}
          >
            <Label>{amount.today}</Label>
            Today
          </Menu.Item>
          <Menu.Item
            name="This week"
            active={activeItem === "THIS WEEK"}
            onClick={(e) => handleItemClick(e)}
          >
            <Label>{amount.thisWeek}</Label>
            This Week
          </Menu.Item>
          <Menu.Item
            name="Completed"
            active={activeItem === "COMPLETED"}
            onClick={(e) => handleItemClick(e)}
          >
            <Label>{amount.completed}</Label>
            Completed
          </Menu.Item>
        </Menu>
      </Container>
      <Button style={{ width: "80%" }} onClick={signout}>
        Sign Out
      </Button>
    </Container>
  );
};

export default connect(null, { signout, filterTodos })(Sidebar);

import React, { useState } from "react";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { connect } from "react-redux";

import Logo from "../../assets/logo2.svg";
import { signout } from "../../actions/authActions";

const Sidebar = ({ signout }) => {
  const [activeItem, setActiveItem] = useState("ALL TODOS");

  const handleItemClick = (e) => {
    setActiveItem(e.target.innerText.toUpperCase());
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
          />
          <Menu.Item
            name="Today"
            active={activeItem === "TODAY"}
            onClick={(e) => handleItemClick(e)}
          />
          <Menu.Item
            name="This week"
            active={activeItem === "THIS WEEK"}
            onClick={(e) => handleItemClick(e)}
          />
          <Menu.Item
            name="Completed"
            active={activeItem === "COMPLETED"}
            onClick={(e) => handleItemClick(e)}
          />
        </Menu>
      </Container>
      <Button style={{ width: "80%" }} onClick={signout}>
        Sign Out
      </Button>
    </Container>
  );
};

export default connect(null, { signout })(Sidebar);

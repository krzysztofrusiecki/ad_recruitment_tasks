import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Header,
  Image,
  Grid,
  Divider,
  Segment,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Logo from "../assets/logo1.svg";
import { signup } from "../actions/authActions";

const SignUp = ({ isAuthenticated, error, signup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      signup({ email, password });
      setMsg(null);
    }
  };

  useEffect(() => {
    if (error.id === "SIGNUP_FAIL") {
      setMsg(error.msg.error);
    } else {
      setMsg(null);
    }
    if (isAuthenticated) {
      history.push("/todos");
    }
    console.log("I AM IN SIGNUP", msg);
  }, [error, isAuthenticated]);

  return (
    <Container
      style={{
        height: "100vh",
        width: "700px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Segment style={{ width: "700px" }}>
        <Grid columns={2} style={{ width: "700px" }}>
          <Grid.Column
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={Logo} size="small" />
          </Grid.Column>
          <Grid.Column
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form
              onSubmit={handleSubmit}
              style={{
                width: "300px",
              }}
            >
              <Header as="h1">Sign Up</Header>
              <Form.Field>
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Field>
              <Button
                color="linkedin"
                type="submit"
                style={{
                  width: "100%",
                }}
              >
                Sign Up
              </Button>
              <p style={{ marginTop: "15px" }}>
                You already have an account?{" "}
                <Link exact to="/signin">
                  Sign In!
                </Link>
              </p>
              {msg ? (
                <Header color="red" as="h5">
                  {msg}
                </Header>
              ) : null}
            </Form>
          </Grid.Column>
        </Grid>
        <Divider vertical fitted />
      </Segment>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { signup })(SignUp);

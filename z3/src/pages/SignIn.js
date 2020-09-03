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
import { signin } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

const SignIn = ({ isAuthenticated, error, signin }) => {
  const [email, setEmail] = useState("rusioful@gmail.com");
  const [password, setPassword] = useState("rwasr997");
  const [msg, setMsg] = useState(null);
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email && password) {
      signin({ email, password });
    }
  };

  useEffect(() => {
    if (error.id === "SIGNIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if (isAuthenticated) {
      history.push("/todos");
    }
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
              <Header as="h1">Sign In</Header>
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
                Sign In
              </Button>
              <p style={{ marginTop: "15px" }}>
                You don't have account yet?{" "}
                <Link exact to="/signup">
                  Sign Up!
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

export default connect(mapStateToProps, { signin, clearErrors })(SignIn);

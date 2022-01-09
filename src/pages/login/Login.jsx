import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutation/user";
import { Link, useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const [input, setInput] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [login] = useMutation(LOGIN);

  const navigate = useNavigate();

  useEffect(() => {
    if (input.password && input.email) {
      if (
        input.password.trim().length !== 1 &&
        input.email.trim().length !== 1
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [input.email, input.username, input.password, isValid]);

  const onChangeHandler = (e) => {
    setInput((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    login({
      variables: {
        input: input,
      },
      onCompleted(data) {
        if (data.login) {
          localStorage.setItem("access_token", data.login);
          navigate("/");
          window.location.reload();
        }
        setLoading(false);
        setErrors({});
        setInput({});
      },
      onError(error) {
        setErrors(error.graphQLErrors[0].extensions.errors);
        setLoading(false);
      },
    });
  };

  return (
    <div className="login">
      <Container>
        <Row>
          <Col lg={5} className="mx-auto">
            <Form className="login-form" onSubmit={onSubmitHandler}>
              <h1>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={onChangeHandler}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  disabled={loading}
                  isInvalid={errors.email}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={onChangeHandler}
                  type="password"
                  placeholder="Password"
                  name="password"
                  disabled={loading}
                  isInvalid={errors.password}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid || loading}
                >
                  {!loading && "Login"}
                  {loading && (
                    <div>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Checking...
                    </div>
                  )}
                </Button>
                <div className="text-center">
                  <Link to="/register">
                    Don't have an account? Register here.
                  </Link>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

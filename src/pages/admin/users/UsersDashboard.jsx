import React, { useState } from "react";
import { Fragment } from "react";
import { GET_USERS } from "../../../graphql/query/role";
import { useQuery, useSubscription } from "@apollo/client";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import UpdateUserDashboard from "./UpdateUserDashboard";
import Permission from "../../../components/permission/Permission";
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/user";
import Loading from "../../../components/loading/Loading";
import Toast from "../../../utils/Toast";
import { REGISTED } from "../../../graphql/subscription/user";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const user = useRecoilValue(userState);
  const [role, setRole] = useState("");
  const [options, setOptions] = useState({
    keyword: "",
    filter: {},
    pagination: {
      page: 1,
      perpage: 4,
    },
  });

  const { data, loading } = useQuery(GET_USERS, {
    variables: {
      options: options,
    },
  });

  useEffect(() => {
    if (data) {
      setUsers([...data.users.users]);
      setCount(data.users.count);
    }
  }, [data]);

  useSubscription(REGISTED, {
    onSubscriptionData({
      subscriptionData: {
        data: { registed },
      },
    }) {
      const usersCopy = [...users];
      usersCopy.unshift({ ...registed });
      setUsers([...usersCopy]);
      Toast.info("New user registed on blog");
    },
  });

  const loadUsersTable = (users) => {
    if (users.length > 0) {
      return users.map((profile, key) => {
        return (
          <Fragment>
            <tr key={key}>
              <td>{profile._id}</td>
              <td>{profile.username}</td>
              <td>{profile.passportId ? "social" : profile.email}</td>
              <td>{profile.isActive ? "active" : "disabled"}</td>
              <td>{profile.role}</td>
              <td className="text-center">
                <Button
                  variant="warning"
                  onClick={() => displayUpdateUser(profile._id)}
                >
                  <i className="fas fa-pen-square"></i>
                </Button>
              </td>
              <Permission userRole={user.role} roles={["manager"]}>
                <td className="text-center">
                  <Button variant="danger">
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </Permission>
            </tr>
          </Fragment>
        );
      });
    }
  };

  const displayUsers = () => {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg={12} className="mx-auto mt-5">
              <Form className="form-filter-user">
                <Permission userRole={user.role} roles={["manager"]}>
                  <Form.Group className="form-filter-user-group">
                    <Form.Label htmlFor="role">
                      <h6>Role</h6>
                    </Form.Label>
                    <Form.Select id="role" value={role} onChange={onFilterRole}>
                      <option value="all">All</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </Form.Select>
                  </Form.Group>
                </Permission>
                <Form.Group className="form-filter-user-group">
                  <Form.Label>
                    <h6>Search</h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    onChange={onSearchHandler}
                  />
                </Form.Group>
              </Form>
              {!loading && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>email</th>
                      <th>Active</th>
                      <th>Role</th>
                      <th className="text-center">Update</th>
                      <Permission userRole={user.role} roles={["manager"]}>
                        <th className="text-center">Delete</th>
                      </Permission>
                    </tr>
                  </thead>
                  <tbody>{loadUsersTable(users)}</tbody>
                </Table>
              )}
              {loading && <Spinner animation="border" variant="info" />}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  };

  const displayUpdateUser = (_id) => {
    const user = users.find((user) => user._id === _id);
    if (user) {
      setIsUpdate(true);
      setUserProfile(user);
    }
  };

  const onCancelUpdateHandler = (e) => {
    e.preventDefault();
    setIsUpdate(false);
    setUserProfile(null);
  };

  const onUpdateSuccessHandler = (userOutput) => {
    setIsUpdate(false);
    setUserProfile(null);
    Toast.success("Update user sucessfully!");
  };

  const onChangePagination = (e, value) => {
    setOptions((pre) => {
      return {
        ...pre,
        pagination: {
          perpage: 4,
          page: value,
        },
      };
    });
  };

  const onFilterRole = (e) => {
    if (e.target.value !== "all") {
      setRole(e.target.value);
      setOptions((pre) => {
        return {
          ...pre,
          filter: {
            role: e.target.value,
          },
        };
      });
    } else {
      setRole("");
      setOptions((pre) => {
        delete pre.filter.role;
        return {
          ...pre,
        };
      });
    }
  };

  const onSearchHandler = (e) => {
    setOptions((pre) => {
      return {
        ...pre,
        keyword: e.target.value,
      };
    });
  };

  return (
    <Fragment>
      {Toast.container()}
      <Fragment>
        {!isUpdate && displayUsers()}
        {isUpdate && (
          <UpdateUserDashboard
            userProfile={userProfile}
            onCancelUpdate={onCancelUpdateHandler}
            onUpdateSuccess={onUpdateSuccessHandler}
            Toast={Toast}
          />
        )}
      </Fragment>
      {!loading && (
        <div className="pagination-bar">
          <Pagination
            count={count}
            page={options.pagination.page}
            onChange={onChangePagination}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
      <Stack spacing={2}></Stack>
    </Fragment>
  );
};

export default UsersDashboard;

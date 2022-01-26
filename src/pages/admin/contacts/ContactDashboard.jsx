import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { GET_CONTACTS } from "../../../graphql/query/role";
import moment from "moment";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";

const ContactDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    keyword: "",
    filter: {
      role: "all",
    },
    pagination: {
      page: 1,
      perpage: 5,
    },
  });

  const { data, loading } = useQuery(GET_CONTACTS, {
    variables: {
      options: options,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log();
      setContacts(data.contacts.contacts);
      setCount(data.contacts.count);
    }
  }, [data]);

  const loadContactsTable = (contacts) => {
    if (contacts.length > 0) {
      return contacts.map((contact, key) => {
        const createdAt = moment(
          new Date(parseInt(contact.createdAt.toString()))
        ).format("MMM Do YY");
        return (
          <Fragment key={key}>
            <tr className="tr-user-dashboard">
              <td>{key + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.content}</td>
              <td>{contact.replied}</td>
              <td>{createdAt}</td>
              <td className="text-center">
                <Button
                  variant="success"
                  // onClick={() => displayUpdateUser(profile._id)}
                >
                  <i class="fas fa-eye"></i>
                </Button>
              </td>
              <td className="text-center">
                <Button variant="info">
                  <i class="fas fa-comment-dots"></i>
                </Button>
              </td>
              <td className="text-center">
                <Button variant="danger">
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          </Fragment>
        );
      });
    }
  };

  const displayContacts = () => {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col lg={12} className="mx-auto mt-3">
              <Form className="form-filter-user">
                <Form.Group className="form-filter-user-group">
                  <Form.Label>
                    <h6>Search</h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or name"
                    // onChange={onSearchHandler}
                  />
                </Form.Group>
              </Form>
              {!loading && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Content</th>
                      <th>Replied</th>
                      <th>Day</th>
                      <th className="text-center">Detail</th>
                      <th className="text-center">Reply</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>{loadContactsTable(contacts)}</tbody>
                </Table>
              )}
              {loading && <Spinner animation="border" variant="info" />}
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Fragment>
        {displayContacts()}
        {/* {isUpdate && (
          <UpdateUserDashboard
            userProfile={userProfile}
            onCancelUpdate={onCancelUpdateHandler}
            onUpdateSuccess={onUpdateSuccessHandler}
            Toast={Toast}
          />
        )} */}
      </Fragment>
      {!loading && (
        <div className="pagination-bar">
          <Pagination
            count={count}
            page={options.pagination.page}
            // onChange={onChangePagination}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
      <Stack spacing={2}></Stack>
    </Fragment>
  );
};

export default ContactDashboard;

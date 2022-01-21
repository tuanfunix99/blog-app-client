import { useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import AccessComponent from "../../components/access/AccessComponent";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Posts from "../../components/posts/Posts";
import TopBar from "../../components/topbar/TopBar";
import { GET_MY_POST } from "../../graphql/query/post";
import { myPostState } from "../../state/post";

import "./MyPost.scss";

const MyPost = () => {
  const [myPost, setMyPost] = useRecoilState(myPostState);
  const [isUser, setIsUser] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useQuery(GET_MY_POST, {
    variables: {
      input: id,
    },
    onCompleted(data) {
      if (data.myPost.length === 0) {
        setIsSuccess(true);
      } else if (myPost.length === 0) {
        setMyPost(data.myPost);
      }
      setIsUser(true);
    },
    onError() {
      navigate("/not-found");
    },
  });

  return (
    <Fragment>
      <TopBar />
      <div className="main">
        <AccessComponent isLogin={true}>
          {myPost.length > 0 && (
            <div>
              <Posts posts={myPost} isUser={isUser} />
            </div>
          )}
          {myPost.length === 0 && !isSuccess && <Loading />}
          {isSuccess && (
            <Container>
              <Row>
                <Col lg={12}>
                  <Alert variant="info">
                    <Alert.Heading>My Post Empty</Alert.Heading>
                    <p>
                      Create a new post <Link to="/write">here</Link>
                    </p>
                  </Alert>
                </Col>
              </Row>
            </Container>
          )}
        </AccessComponent>
        <AccessComponent isLogin={false}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto px-2">
                <Alert.Heading>Access denied</Alert.Heading>
                <Alert variant={"danger"}>
                  Please <Link to="/login">Login</Link> to access page.
                </Alert>
              </Col>
            </Row>
          </Container>
        </AccessComponent>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MyPost;

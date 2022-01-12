import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import { GET_POSTS } from "../../graphql/query/post";
import { postsState } from "../../state/post";

import "./Home.scss";

const Home = () => {
  const [posts, setPosts] = useRecoilState(postsState);

  useQuery(GET_POSTS, {
    onCompleted(data) {
      setPosts(data.posts);
    },
  });

  return (
    <Fragment>
      <Header />
      <div className="home">
        <Container fluid>
          <Row>
            <Col lg={8}>
              {posts.length > 0 && <Posts posts={posts} />}
              {posts.length === 0 && <Loading />}
            </Col>
            <Col lg={4}>
              <SideBar />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Home;

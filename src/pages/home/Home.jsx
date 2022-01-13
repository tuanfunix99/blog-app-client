import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import { GET_POSTS_PAGE } from "../../graphql/query/post";
import { postsState } from "../../state/post";

import "./Home.scss";

const Home = () => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [page, setPage] = useState(1);
  const [loadPage, setLoadPage] = useState(false);

  const {data} = useQuery(GET_POSTS_PAGE, {
    variables: {
      input: page,
    },
  });

  useEffect(() => {
    if (data) {
      setLoadPage(false);
      if(data.postsPage.length === 0){
        setPage(page - 1);
      }
      else{
        setPosts(data.postsPage);
      }
    }
  }, [data]);

  const onNextPageHandler = () => {
    setLoadPage(true);
    setPage(page + 1);
  };

  const onPrePageHandler = () => {
    if(page > 1){
      setLoadPage(true);
      setPage(page - 1);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="home">
        <Container fluid>
          <Row>
            <Col lg={8} md={12} className="position-relative">
              {posts.length > 0 && !loadPage && <Posts posts={posts} />}
              {posts.length === 0 && <Loading />}
              {loadPage && <Loading color={"#36D7B7"} loading={true} size={40} />}
              <div className="navigate-page">
                <Button className="btn-nav-left" onClick={onPrePageHandler}>
                  <i class="fas fa-caret-left"></i>
                </Button>
                <Button className="btn-nav-right" onClick={onNextPageHandler}>
                  <i class="fas fa-caret-right"></i>
                </Button>
              </div>
            </Col>
            <Col lg={4}>
              <SideBar />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;

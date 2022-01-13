import { useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/singlePost/SinglePost";
import TopBar from "../../components/topbar/TopBar";
import { GET_POST } from "../../graphql/query/post";
import parse from "html-react-parser";
import { Col, Container, Row } from "react-bootstrap";
import EdjsParser from "../../utils/parse/parse-editor-to-html";
import Loading from "../../components/loading/Loading";
import Footer from "../../components/footer/Footer";

const Single = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useQuery(GET_POST, {
    variables: { input: id },
    onCompleted(data) {
      console.log(data);
      setPost(data.post);
    },
    onError() {
      navigate("/not-found");
    },
  });

  const displayPost = () => {
    if (post) {
      const parseHtml = new EdjsParser();
      const htmlParser = parseHtml.parse(JSON.parse(post.content));
      return (
        <Fragment>
          <Row className="mt-5">
            <Col lg={9} className="mx-auto text-center">
              <img
                className="writeImg"
                src={post.backgroundPic}
                alt="background post"
              />
              <h2 className="writeInput">{post.title}</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              {parse(htmlParser)}
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <TopBar />
      <div className="single">
        {!post && <Loading /> }
        <Container>{displayPost()}</Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Single;

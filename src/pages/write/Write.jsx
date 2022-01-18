import React, { Fragment, useState } from "react";
import Resizer from "react-image-file-resizer";
import TopBar from "../../components/topbar/TopBar";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import AccessComponent from "../../components/access/AccessComponent";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../../utils/parse/constants";
import EdjsParser from "../../utils/parse/parse-editor-to-html";
import parse from "html-react-parser";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../state/category";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutation/post";
import { userState } from "../../state/user";

import "./Write.scss";
import Footer from "../../components/footer/Footer";
import CardUser from "../../components/card-user/CardUser";

const Write = () => {
  const categories = useRecoilValue(categoriesState);
  const [backgroundPic, setBackgroundPic] = useState("./background-post.jpg");
  const [checkCategory, setCheckCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Your title...");
  const [publishing, setPublishing] = useState(false);
  const [content, setContent] = useState({});
  const [html, setHtml] = useState("");
  const ReactEditorJS = createReactEditorJS();
  const [createPost] = useMutation(CREATE_POST);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const editorCore = React.useRef(null);
  const handleReady = (editor) => {
    new Undo({ editor });
    new DragDrop({ editor });
  };

  const blocks = [
    {
      type: "header",
      data: {
        text: "What is Lorem Ipsum?",
        level: 4,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    },
  ];

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const toastWarning = (message) => {
    toast.warning(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        855,
        400,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const displayCategories = () => {
    if (categories.length > 0) {
      return categories.map((category, key) => {
        return (
          <Form.Check
            key={key}
            inline
            label={category.name}
            value={category._id}
            name="group1"
            type="checkbox"
            id={key}
            onClick={onCheckHandler}
          />
        );
      });
    }
  };

  const onChangeBackgroundHandler = async (e) => {
    const file = e.target.files[0];
    const types = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (file.size > 3000000) {
        toastError("File size is bigger than 3MB");
        return;
      } else if (!types.includes(file.type)) {
        toastError("File not image");
        return;
      }
      try {
        const image = await resizeFile(file);
        setBackgroundPic(image);
      } catch (error) {
        toastError("Can't upload image");
      }
    }
  };

  const onCheckHandler = (e) => {
    let checkCategoryClone = [...checkCategory];
    if (checkCategoryClone.includes(e.target.value)) {
      const index = checkCategoryClone.indexOf(e.target.value);
      checkCategoryClone.splice(index, 1);
      setCheckCategory(checkCategoryClone);
    } else {
      checkCategoryClone.push(e.target.value);
      setCheckCategory(checkCategoryClone);
    }
  };

  const onPublisPostHandler = async (e) => {
    e.preventDefault();
    setPublishing(true);
    if (checkCategory.length === 0) {
      toastWarning("Please choose at leat 1 category");
      setPublishing(false);
      return;
    } else if (checkCategory.length > 5) {
      toastWarning("Each post max 5 categories");
      setPublishing(false);
      return;
    }
    const savedData = await editorCore.current.save();
    createPost({
      variables: {
        input: {
          title: title,
          content: savedData,
          categories: checkCategory,
          backgroundPic: backgroundPic,
          userId: user._id,
        },
      },
      onCompleted(data) {
        navigate(`/post/${data.createPost}`);
        setPublishing(false);
      },
      onError(err) {
        toastError("Error System. Can't publish post");
        setPublishing(false);
      },
    });
  };

  const onShowHandler = async () => {
    setShow(true);
    const savedData = await editorCore.current.save();
    const parseHtml = new EdjsParser();
    const htmlParser = parseHtml.parse(savedData);
    setContent(savedData);
    setHtml(htmlParser);
  };

  const displayViewDemo = () => {
    return (
      <Modal
        className="view-demo"
        show={show}
        fullscreen={true}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Demo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg={9} className="mx-auto text-center">
                <img
                  className="writeImg"
                  src={backgroundPic}
                  alt="background post"
                />
                <CardUser user={user} createdAt={new Date().getTime()} />
                <h2 className="writeInput">{title}</h2>
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="mx-auto">
                {parse(html)}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Fragment>
      <ToastContainer />
      <TopBar />
      {displayViewDemo()}
      <div className="write">
        <AccessComponent isLogin={true}>
          <Container className="px-4">
            <Row>
              <Col lg={9} className="mx-auto px-0 mt-5 position-relative">
                <img
                  className="writeImg"
                  src={backgroundPic}
                  alt="background post"
                />
                <CardUser user={user} createdAt={new Date().getTime()} />
                <form className="form-upload-background">
                  <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onChangeBackgroundHandler}
                  />
                </form>
              </Col>
            </Row>
            <Row>
              <Col lg={9} className="mx-auto px-0">
                <div className="write">
                  <form className="writeForm">
                    <div className="writeFormGroup">
                      <input
                        className="writeInput text-center"
                        placeholder="Title"
                        value={title}
                        type="text"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="mx-auto px-0">
                <ReactEditorJS
                  holder="editorjs"
                  onReady={handleReady}
                  onInitialize={handleInitialize}
                  tools={EDITOR_JS_TOOLS}
                  defaultValue={{
                    blocks: blocks,
                  }}
                >
                  <div id="editorjs"></div>
                </ReactEditorJS>
                <Form className="py-5 form-publish">
                  <Form.Group className="form-publish-checkbox">
                    {displayCategories()}
                  </Form.Group>
                  <Form.Group className="form-publish-button mt-3">
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
                      onClick={onShowHandler}
                      disabled={publishing}
                    >
                      View Demo
                    </button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={onPublisPostHandler}
                      disabled={publishing}
                    >
                      {!publishing && "Publish"}
                      {publishing && (
                        <div>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Publishing...
                        </div>
                      )}
                    </button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </AccessComponent>
        <AccessComponent isLogin={false}>
          <Container>
            <Row>
              <Col lg={8} className="mx-auto px-2">
                <Alert variant={"danger"}>
                  <Alert.Heading>Access denied</Alert.Heading>
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

export default Write;

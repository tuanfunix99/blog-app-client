import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../graphql/mutation/post";
import { myPostState } from "../../state/post";
import { useRecoilState } from "recoil";

import "./Post.scss";

const Post = ({ index, post, isUser }) => {
  let { _id, title, backgroundPic, createdAt, categories, createdBy } = post;
  const tags = ["tag-blue", "tag-yellow", "tag-red", "tag-green", "tag-teal"];
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletePost] = useMutation(DELETE_POST);
  const [myPost, setMyPost] = useRecoilState(myPostState);
  const navigate = useNavigate();

  createdAt = moment(new Date(parseInt(createdAt.toString()))).fromNow();

  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const toastSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const displayCat = () => {
    if (categories.length > 0) {
      return categories.map((cat, key) => {
        return (
          <Link to={"/posts/?cat=" + cat.name} key={key}>
            <span className={"tag " + tags[key]}>{cat.name}</span>
          </Link>
        );
      });
    }
  };

  if (title.length > 80) {
    title = title.slice(0, 80) + "...";
  }

  const displayDeleteModal = () => {
    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            disabled={deleting}
          >
            Close
          </Button>
          <Button variant="danger" onClick={ondeleteHandler} disabled={deleting}>
            {!deleting && "Delete"}
            {deleting && (
              <div>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Deleting...
              </div>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ondeleteHandler = () => {
    setDeleting(true);
    deletePost({
      variables: {
        input: _id,
      },
      onCompleted() {
        toastSuccess("Delete post successfully");
        let clone = [...myPost];
        clone = clone.filter((c) => c._id !== _id);
        setMyPost(clone);
        setDeleting(false);
        setShow(false);
      },
      onError() {
        toastError("Can't delete post");
        setDeleting(false);
      },
    });
  };

  const onNavigateUpdatePage = () => {
    navigate(`/update-my-post/${_id}`);
  }

  return (
    <div className="card">
      <ToastContainer />
      {displayDeleteModal()}
      <div className="card__header">
        <Link to={"/post/" + _id}>
          <img src={backgroundPic} alt="card__image" className="card__image" />
        </Link>
      </div>
      <div className="card__body">
        <div className="tag__container">{displayCat()}</div>
        <h5>{title}</h5>
      </div>
      <div className="card__footer">
        <div className="user">
          <div className="user__detail">
            <img
              src={createdBy.profilePic}
              alt="user__image"
              className="user__image"
            />
            <div className="user__info">
              <h6 className="my-0">{createdBy.username}</h6>
              <small>{createdAt}</small>
            </div>
          </div>
          {isUser && (
            <div className="user__controller">
              <Button className="btn-update-post" onClick={onNavigateUpdatePage}>
                <i className="fas fa-pen-square"></i>
              </Button>
              <Button className="btn-delete-post" onClick={() => setShow(true)}>
                <i className="fas fa-trash"></i>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

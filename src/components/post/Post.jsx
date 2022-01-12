import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../graphql/mutation/post";
import { myPostState } from "../../state/post";
import { useRecoilState } from "recoil";

import "./Post.scss";

const Post = ({ post, isUser }) => {
  let { _id, title, backgroundPic, createdAt, categories, createdBy } = post;
  const tags = ["tag-blue", "tag-yellow", "tag-red", "tag-green", "tag-teal"];
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletePost] = useMutation(DELETE_POST);
  const [myPost, setMyPost] = useRecoilState(myPostState);

  createdAt = moment(new Date(createdAt)).fromNow();

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
          <Link to={"/posts/?cat=" + cat.name}>
            <span class={"tag " + tags[key]}>{cat.name}</span>
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

  return (
    <div class="card">
      <ToastContainer />
      {displayDeleteModal()}
      <div class="card__header">
        <Link to={"/post/" + _id}>
          <img src={backgroundPic} alt="card__image" class="card__image" />
        </Link>
      </div>
      <div class="card__body">
        <div className="tag__container">{displayCat()}</div>
        <h5>{title}</h5>
      </div>
      <div class="card__footer">
        <div class="user">
          <div className="user__detail">
            <img
              src={createdBy.profilePic}
              alt="user__image"
              class="user__image"
            />
            <div class="user__info">
              <h6 className="my-0">{createdBy.username}</h6>
              <small>{createdAt} ago</small>
            </div>
          </div>
          {isUser && (
            <div className="user__controller">
              <Button className="btn-update-post">
                <i class="fas fa-pen-square"></i>
              </Button>
              <Button className="btn-delete-post" onClick={() => setShow(true)}>
                <i class="fas fa-trash"></i>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

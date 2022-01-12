import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./Post.scss";

const Post = ({ post }) => {
  let { _id, title, backgroundPic, createdAt, categories, createdBy } = post;
  const tags = ["tag-blue", "tag-brown", "tag-red", "tag-green"];

  console.log();
  createdAt = moment(new Date(createdAt)).fromNow();

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

  if(title.length > 100){
    title = title.slice(0, 100) + "...";
  }

  return (
    <div class="card">
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
      </div>
    </div>
  );
};

export default Post;

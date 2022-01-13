import React from "react";
import Post from "../post/Post";

import "./Posts.scss";

const Posts = ({ posts, isUser }) => {
  const displayPost = () => {
    if (posts && posts.length > 0) {
      return posts.map((post, key) => {
        return (
            <li key={key}>
              <Post index={key} post={post} isUser={isUser} />
            </li>
        );
      });
    }
  };
  return <div className="posts">{displayPost()}</div>;
};

export default Posts;

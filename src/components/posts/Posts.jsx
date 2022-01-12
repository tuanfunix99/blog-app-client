import React from "react";
import Post from "../post/Post";

import './Posts.scss';

const Posts = ({ posts }) => {

  const displayPost = () => {
    if(posts && posts.length > 0){
      return posts.map((post, key) => {
        return <Post key={key} post={post}  />
      })
    }
  }
  return (
    <div className="posts">
      { displayPost() }
    </div>
  );
};

export default Posts;

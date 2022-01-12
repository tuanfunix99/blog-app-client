import { useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import { GET_POSTS } from "../../graphql/query/post";
import { postsState } from "../../state/post";

import "./Home.scss";

const Home = () => {

  const [posts, setPosts] = useRecoilState(postsState);

  useQuery(GET_POSTS, {
    onCompleted(data){
      setPosts(data.posts);
    }
  });

  return (
    <Fragment>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </Fragment>
  );
};

export default Home;

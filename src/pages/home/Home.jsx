import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";

import "./Home.scss";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div className="home">
        <Posts />
        <SideBar />
      </div>
    </Fragment>
  );
};

export default Home;

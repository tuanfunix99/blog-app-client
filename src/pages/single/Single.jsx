import React, { Fragment } from "react";
import SideBar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/singlePost/SinglePost";
import TopBar from "../../components/topbar/TopBar";

const Single = () => {
  return (
    <Fragment>
        <TopBar />
      <div className="single">
        <SinglePost />
        <SideBar />
      </div>
    </Fragment>
  );
};

export default Single;

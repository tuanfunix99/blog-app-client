import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import AccessPage from "../../components/access/AccessPage";
import Navbar from "../../components/navbar/Navbar";
import UsersDashboard from "./users/UsersDashboard";

import './Admin.scss';

const AdminDashboard = () => {
  const [option, setOption] = useState("users");

  const onOptionsHandler = (e, option) => {
    e.preventDefault();
    setOption(option.toLowerCase());
  };

  return (
    <Fragment>
      <AccessPage roles={["admin", "manager"]}>
        <Navbar onOptions={onOptionsHandler} />
        {option === "users" && <UsersDashboard />}
        {option === "posts" && "Posts"}
        {option === "contacts" && "Contacts"}
      </AccessPage>
    </Fragment>
  );
};

export default AdminDashboard;

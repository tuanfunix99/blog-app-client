import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import MyPost from "./pages/my-post/MyPost";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/query/user";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "./state/user";
import NotFound from "./pages/not-found/NotFound";
import { categoriesState } from "./state/category";
import { GET_CATEGORIES } from "./graphql/query/category";
import UpdatePost from "./pages/update-post/UpdatePost";
import Search from "./pages/search/Search";
import SearchCategory from "./pages/search/SearchCategory";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Contact from "./pages/contact/Contact";

import "./App.scss";
import { Fragment } from "react";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const setCategories = useSetRecoilState(categoriesState);
  const [completed, setCompleted] = useState(false);
  const login_passport = localStorage.getItem("login_passport");

  useQuery(GET_USER, {
    onCompleted(data) {
      setUser(data.user);
      setCompleted(true);
    },
    onError(err) {
      setCompleted(true);
    },
  });

  useQuery(GET_CATEGORIES, {
    onCompleted(data) {
      setCategories(data.categories);
    },
  });

  useEffect(() => {
    if (!user && login_passport) {
      axios
        .get(`${process.env.REACT_APP_HTTP_API_LINK_URL}/api/passport/success`)
        .then((res) => {
          console.log(res);
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", res.data.token);
          localStorage.removeItem("login_passport");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
          localStorage.removeItem("login_passport");
        });
    }
  }, [user, login_passport]);

  const onOpenHandler = () => {
    document.body.classList.add("modal-open");
  };

  const onCloseHandler = () => {
    document.body.classList.remove("modal-open");
  };

  console.log(user);
  
  return (
    <Fragment>
      {!completed && (
        <div className="loading">
          {onOpenHandler()}
          <PacmanLoader color={"#35B5BF"} loading={!completed} size={40} />
        </div>
      )}
      {completed && (
        <Fragment>
          {onCloseHandler()}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route path="/my-post" element={<MyPost />} />
            <Route path="/posts-category" element={<SearchCategory />} />
            <Route path="/posts" element={<Search />} />
            <Route path="/update-my-post/:id" element={<UpdatePost />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;

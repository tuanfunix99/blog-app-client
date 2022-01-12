import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import MyPost from "./pages/my-post/MyPost";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER } from "./graphql/query/user";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, completeLoadUserState } from "./state/user";
import NotFound from "./pages/not-found/NotFound";

import './App.scss';
import { categoriesState } from "./state/category";
import { GET_CATEGORIES } from "./graphql/query/category";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const setCategories = useSetRecoilState(categoriesState);
  const setCompleted = useSetRecoilState(completeLoadUserState);

  useQuery(GET_USER, {
    onCompleted(data) {
      setUser(data.user);
      setCompleted(true);
    },
    onError() {
      setCompleted(true);
    },
  });

  useQuery(GET_CATEGORIES, {
    onCompleted(data){
      setCategories(data.categories);
    }
  })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Single />} />
      <Route path="/write" element={<Write />} />
      <Route path="/my-post/:id" element={<MyPost />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

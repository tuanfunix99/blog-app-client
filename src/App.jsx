import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_USER } from "./graphql/query/user";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, completeLoadUserState } from "./state/user";
import NotFound from "./pages/not-found/NotFound";

import './App.scss';

function App() {
  const [user, setUser] = useRecoilState(userState);
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

  // useSubscription(UPLOADED_PROFILEPIC, {
  //   onSubscriptionData({
  //     subscriptionData: {
  //       data: {
  //         uplodedProfilePic: { user_id, image },
  //       },
  //     },
  //   }) {
  //     if (user._id === user_id){
  //       setUser((...pre) => {
  //         return {...pre, profilePic: image };
  //       });
  //       console.log(user);
  //     }
  //   },
  // });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Single />} />
      <Route path="/write" element={<Write />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

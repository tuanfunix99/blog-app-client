import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/query/user";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { userState } from "./state/user";

function App() {
  const { data } = useQuery(GET_USER);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data, setUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Single />} />
      <Route path="/write" element={<Write />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

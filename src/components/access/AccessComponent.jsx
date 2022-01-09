import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";

const AccessComponent = ({ children, isLogin }) => {
  const user = useRecoilValue(userState);
  return (
    <Fragment>
      {user && isLogin && children} 
      {!user && !isLogin && children}
    </Fragment>
  );
};

export default AccessComponent;

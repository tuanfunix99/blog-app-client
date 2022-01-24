import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";

import "./Access.scss";

const AccessComponent = ({ children, type }) => {
  const user = useRecoilValue(userState);
  const { isLogin, passportId } = type;
  const displayComponent = () => {
    if (isLogin !== undefined) {
      return (
        <Fragment>
          {user && isLogin && children}
          {!user && !isLogin && children}
        </Fragment>
      );
    } else if(passportId !== undefined) {
      return <Fragment>{user && !user.passportId && children}</Fragment>;
    }
  };
  return <Fragment>{displayComponent()}</Fragment>;
};

export default AccessComponent;

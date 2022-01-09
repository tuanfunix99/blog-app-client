import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState, completeLoadUserState } from "../../state/user";

const AccessComponent = ({ children, isLogin }) => {
  const user = useRecoilValue(userState);
  const completed = useRecoilValue(completeLoadUserState);
  return (
    <Fragment>
      {completed && (
        <Fragment>
          {user && isLogin && children}
          {!user && !isLogin && children}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AccessComponent;

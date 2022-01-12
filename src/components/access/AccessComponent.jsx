import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState, completeLoadUserState } from "../../state/user";
import PacmanLoader from "react-spinners/PacmanLoader";

import "./Access.scss";

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
      {!completed && (
        <div className="loading">
          <PacmanLoader color={"#35B5BF"} loading={!completed} size={40} />
        </div>
      )}
    </Fragment>
  );
};

export default AccessComponent;

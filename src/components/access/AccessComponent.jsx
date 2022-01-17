import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState, completeLoadUserState } from "../../state/user";
import PacmanLoader from "react-spinners/PacmanLoader";

import "./Access.scss";

const AccessComponent = ({ children, isLogin }) => {
  const user = useRecoilValue(userState);
  const completed = useRecoilValue(completeLoadUserState);

  const onOpenHandler = () => {
    document.body.classList.add('modal-open');

  }

  const onCloseHandler = () => {
    document.body.classList.remove('modal-open');
  }
  
  return (
    <Fragment>
      {completed && (
        <Fragment>
          { onCloseHandler() }
          {user && isLogin && children}
          {!user && !isLogin && children}
        </Fragment>
      )}
      {!completed && (
        <div className="loading">
          { onOpenHandler() }
          <PacmanLoader color={"#35B5BF"} loading={!completed} size={40} />
        </div>
      )}
    </Fragment>
  );
};

export default AccessComponent;

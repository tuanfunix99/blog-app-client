import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/user";

import "./Access.scss";

const AccessPage = ({ children }) => {
  const user = useRecoilValue(userState);

  const templateAlert = (title, message) => {
    return (
      <div className="container-fluid access-denided-page my-0 py-0">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="alert-access-denied">
              <img src="/access-denied.png" alt="access denided" />
              <h1>{title}</h1>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Fragment>
        {user && children}
        {!user &&
          templateAlert("ACCESS DENIDED", "Please login to access pages.")}
      </Fragment>
    </Fragment>
  );
};

export default AccessPage;

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);

  var url = window.location.href;
  url = url.replace(/(^\w+:|^)\/\//, '');
  url = url.replace(/localhost:3000/i, '');

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect  to={{
            pathname: "/login",
            url: url,
          }} />
        )
        }
    />
  );
};


export default PrivateRoute
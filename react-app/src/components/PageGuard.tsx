import { useContext } from "react";
import { Navigate } from "react-router";

import AuthContext from "../context/AuthContext";

const PageGuard = (Component: any) => {
  const AuthRoute = (props: any) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
      return <Navigate to={"/registration"} />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default PageGuard;

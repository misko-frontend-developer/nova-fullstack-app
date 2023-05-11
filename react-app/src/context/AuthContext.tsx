import { createContext, PropsWithChildren, useState } from "react";
import Cookies from "universal-cookie";
import { IFUser } from "../interfaces/Auth";

interface IFAuthInterface {
  isAuthenticated: boolean;
  setAuth: (user: IFUser) => void;
  handleLogout: () => void;
}

const AuthContext = createContext({} as IFAuthInterface);
export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const cookies = new Cookies();

  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.get("token"));
  const handleLogout = () => {
    cookies.remove("token");
    sessionStorage.removeItem("full-name");
    setIsAuthenticated(false);
  };
  const setAuth = (user: IFUser) => {
    setIsAuthenticated(!!user);
  };
  return <AuthContext.Provider value={{ isAuthenticated, setAuth, handleLogout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

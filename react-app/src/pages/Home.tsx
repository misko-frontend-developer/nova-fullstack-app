import { useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
export const Home = () => {
  const { handleLogout } = useContext(AuthContext);
  const fullName: string | null = sessionStorage.getItem("full-name");
  const navigate = useNavigate();

  const parsed = useMemo(() => fullName && JSON.parse(fullName), [fullName]);

  const logout = () => {
    handleLogout();
    navigate("/registration");
  };

  return (
    <div className='home'>
      Welcome{" "}
      <b>
        {parsed?.firstName} {parsed?.lastName}
      </b>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

import { FormEvent, ChangeEvent, useState, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";
import { IFUser } from "../interfaces/Auth";

const FormComponent = () => {
  const cookies = new Cookies();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      const tokenData: IFUser = jwt_decode(response.data.token);

      cookies.set("token", tokenData);
      setAuth(tokenData);

      const userData = {
        firstName: tokenData?.firstName,
        lastName: tokenData?.lastName,
      };
      sessionStorage.setItem("full-name", JSON.stringify(userData));
      navigate("/home");
    } catch (error: any) {
      setError(error?.response?.data?.error);
      console.error(error?.response?.data?.error);
    }
  };

  return (
    <div>
      {error && <div className='error'>{error}</div>}
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' required />
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' required />
        <input type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' required />
        <input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;

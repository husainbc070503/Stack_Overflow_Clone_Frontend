import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import Img from "../../assets/icon.png";
import InputField from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/AppContext";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { loginUser } = useGlobalContext();
  const navigate = useNavigate();
  const [authDetails, setAuthDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await loginUser(authDetails);
      if (data.success) {
        toast.success("Successfully LoggedIn 👍", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("stack-overflow-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Box>
        <div className="img">
          <img src={Img} alt="img" />
        </div>
        <Typography textAlign="center" my={3} color="primary" fontSize={30}>
          Sign In
        </Typography>
        <Box className="Box login-form">
          <InputField
            title="Email"
            type="email"
            others="email"
            value={authDetails.email}
            onChange={handleChange}
            autoFocus={true}
          />
          <PasswordField
            isFromLogin={true}
            value={authDetails.password}
            onChange={handleChange}
            title="Password"
            others="password"
          />
          <Button
            className="w-100"
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
        <Typography textAlign="center" mt={5} fontSize={16}>
          Don't have an account?
          <Link className="link mx-2" to="../register">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;

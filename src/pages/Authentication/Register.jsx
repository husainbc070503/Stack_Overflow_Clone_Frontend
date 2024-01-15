import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import QM from "../../assets/question_mark.png";
import Triangle from "../../assets/triangles.png";
import Pin from "../../assets/pin.png";
import Award from "../../assets/award.png";
import InputField from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/AppContext";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profile: "",
};

const data = [
  {
    img: QM,
    heading: "Get unstuck — ask a question",
  },
  {
    img: Triangle,
    heading: "Unlock new privileges like voting and commenting",
  },
  {
    img: Pin,
    heading: "Save your favorite questions, answers, watch tags, and more",
  },
  {
    img: Award,
    heading: "Earn reputation and badges",
  },
];

const Register = () => {
  const { registerUser } = useGlobalContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [authDetails, setAuthDetails] = useState(initialState);
  const handleChange = (e) =>
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    if (authDetails.password !== authDetails.cpassword) {
      toast.error("Mismatch between passwords!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(authDetails);
      if (data.success) {
        toast.success("Successfully Registered 👍Please Login", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("../login");
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

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "stack-overflow-clone");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setAuthDetails({ ...authDetails, profile: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
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
    <Container maxWidth="md" className="auth-container">
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
      >
        <Grid item md={6} xs={12}>
          {window.innerWidth < 820 ? (
            <Typography textAlign="center" fontSize={20}>
              Create your Stack Overflow account. It's free and only takes a
              minute.
            </Typography>
          ) : (
            <>
              <Typography fontSize={22} mb={3} fontWeight="bold">
                Join the Stack Overflow Community
              </Typography>
              {data.map((item, ind) => {
                return (
                  <Grid
                    container
                    key={ind}
                    justifyContent="space-between"
                    my={1.5}
                  >
                    <Grid item md={1.2} xs={2}>
                      <img src={item?.img} className="me-2" alt="qm" />
                    </Grid>
                    <Grid item md={10.8} xs={10}>
                      <Typography key={ind} mb={2}>
                        {item?.heading}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography textAlign="center" my={3} color="primary" fontSize={30}>
            Sign Up
          </Typography>
          <Box className="Box reg-form">
            <InputField
              title="Display Name"
              type="name"
              others="name"
              value={authDetails.name}
              onChange={handleChange}
              autoFocus={true}
            />
            <InputField
              title="Email"
              type="email"
              others="email"
              value={authDetails.email}
              onChange={handleChange}
              autoFocus={true}
            />
            <PasswordField
              others="password"
              value={authDetails.password}
              onChange={handleChange}
              title="Password"
            />
            <PasswordField
              others="cpassword"
              value={authDetails.cpassword}
              onChange={handleChange}
              title="Retype Password"
            />
            <InputField
              title="Profile Picture"
              type="file"
              others="profile"
              onChange={(e) => handleUpload(e.target.files[0])}
              autoFocus={true}
            />
            <Button
              className="w-100"
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Box>
          <Typography textAlign="center" mt={5} fontSize={16}>
            Already have an account?
            <Link className="link mx-2" to="../login">
              Sign In
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

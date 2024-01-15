import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import { AppContext } from "./contexts/AppContext";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import AllQuestions from "./components/Questions/AllQuestions";
import Question from "./components/Questions/Question";
import TagsHome from "./pages/Tags/TagsHome";
import UsersHome from "./pages/Users/UsersHome";
import SingleUser from "./pages/Users/SingleUser";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1b75d0",
      },
      secondary: {
        main: "#636b74",
      },
    },
    typography: {
      fontFamily: "Noto Sans",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/askQuestion" element={<AskQuestion />} />
            <Route path="/questions" element={<AllQuestions />} />
            <Route path="/questions/:id" element={<Question />} />
            <Route path="/tags" element={<TagsHome />} />
            <Route path="/users" element={<UsersHome />} />
            <Route path="/users/:id" element={<SingleUser />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
}

export default App;

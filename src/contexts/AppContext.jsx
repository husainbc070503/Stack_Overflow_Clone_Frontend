import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../constants/Api";

const Context = createContext();
const initialState = {
  user: {},
  questions: [],
  answers: [],
  users: [],
  search: "",
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  /* SEARCH */
  const handleSearch = (e) =>
    dispatch({ type: "SET_SEARCH", payload: e.target.value.toLowerCase() });

  /* USER */
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${api}/api/user/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_USERS", payload: data.users });
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
    }
  };

  const registerUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
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
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      return data;
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
    }
  };

  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("stack-overflow-user");
    navigate("../login");
    toast.info("You have been logged out!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const updateProfile = async (
    editDetails,
    tags,
    setEdit,
    setEditDetails,
    setLoading
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ ...editDetails, tags }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEdit(false);
        setEditDetails({});
        localStorage.setItem(
          "stack-overflow-user",
          JSON.stringify({ token: state?.user?.token, user: data.user })
        );
        navigate("../users");
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

  /* QUESTIONS */
  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${api}/api/question/questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_QUESTIONS", payload: data.questions });
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
    }
  };

  const postQuestion = async (
    details,
    tags,
    setLoading,
    setDetails,
    initialState
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/question/postQuestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          ...details,
          tags,
          postedOn: new Date().toString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Question Posted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_QUESTION", payload: data.question });
        setDetails(initialState);
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

  const deleteQuestion = async (id) => {
    try {
      const res = await fetch(`${api}/api/question/deleteQuestion/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Question Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_QUESTION", payload: id });
        navigate("../questions");
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
    }
  };

  const voteQuestion = async (value, id) => {
    try {
      const res = await fetch(`${api}/api/question/voteQuestion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ value }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Question Voted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "VOTE_QUESTION",
          payload: { q: data.updatedQuestion, id },
        });
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
    }
  };

  /* ANSWERS */
  const fetchAnswers = async () => {
    try {
      const res = await fetch(`${api}/api/answer/answers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_ANSWERS", payload: data.answers });
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
    }
  };

  const postAnswer = async (body, setLoading, qid, setBody) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/answer/postAnswer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          body,
          question: qid,
          answeredOn: new Date().toString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Answer Posted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_ANSWER", payload: data.ans });
        setBody("");
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

  const deleteAnswer = async (id) => {
    try {
      const res = await fetch(`${api}/api/answer/deleteAnswer/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Answer Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_ANSWER", payload: id });
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
    }
  };

  const voteAnswer = async (value, id) => {
    try {
      const res = await fetch(`${api}/api/answer/voteAnswer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ value }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Answer Voted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "VOTE_ANSWER",
          payload: { ans: data.updatedAnswer, ansId: id },
        });
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
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("stack-overflow-user")
    );
    if (loggedInUser) dispatch({ type: "SET_USER", payload: loggedInUser });
  }, [navigate]);

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
    fetchUsers();
  }, [state?.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        handleLogout,
        postAnswer,
        postQuestion,
        deleteAnswer,
        deleteQuestion,
        voteQuestion,
        voteAnswer,
        updateProfile,
        handleSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };

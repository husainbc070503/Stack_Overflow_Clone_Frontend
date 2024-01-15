import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import InputField from "../../components/InputField";

const initialState = {
  title: "",
  body: "",
  tags: "",
};

const AskQuestion = () => {
  const { user, postQuestion } = useGlobalContext();
  const navigate = useNavigate();
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const arr = details.tags.split(", ");
    postQuestion(details, arr, setLoading, setDetails, initialState);
  };

  useEffect(() => {
    if (!localStorage.getItem("stack-overflow-user")) navigate("../login");
  }, []);

  return (
    <Container maxWidth="lg" className="auth-container">
      <Box>
        <Typography fontSize={26} mb={2} fontWeight="bold">
          Ask a Public Question
        </Typography>
        <div className="bg-light p-4 mb-3 rounded-2">
          <InputField
            title="Title"
            text="Be specific and imagine you're asking a question to another person"
            type="text"
            others="title"
            value={details.title}
            onChange={handleChange}
            autoFocus={true}
            fromAskQuestion={true}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          />
          <InputField
            title="Body"
            text="Include all the information someone would need to answer your question"
            type="text"
            others="body"
            value={details.body}
            onChange={handleChange}
            multiline={true}
            fromAskQuestion={true}
            rows={4}
          />
          <InputField
            title="Tags"
            text="Add up to 5 tags to describe what your question is about"
            type="text"
            others="tags"
            value={details.tags}
            onChange={handleChange}
            fromAskQuestion={true}
            placeholder="e.g. (XML, Typescript, Wordpress)"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          Reviewed & Post
        </Button>
      </Box>
    </Container>
  );
};

export default AskQuestion;

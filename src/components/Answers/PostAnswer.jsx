import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputField from "../InputField";
import { useGlobalContext } from "../../contexts/AppContext";

const PostAnswer = ({ question }) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { postAnswer } = useGlobalContext();

  return (
    <div className="ans-form mt-5">
      <Typography fontSize={24} fontWeight="bold" mb={3}>
        Your Answer
      </Typography>
      <InputField
        type="text"
        multiline={true}
        rows={10}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fromAskQuestion={true}
        placeholder="Start typing here.."
      />
      <Button
        color="primary"
        variant="contained"
        className="mt-3"
        disabled={loading}
        onClick={() => postAnswer(body, setLoading, question, setBody)}
      >
        Post Answer
      </Button>
    </div>
  );
};

export default PostAnswer;

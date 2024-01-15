import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftSidebar from "../Left-Sidebar/LeftSidebar";
import RightSidebar from "../Right-Sidebar/RightSidebar";
import { useGlobalContext } from "../../contexts/AppContext";
import SingleQuestion from "./SingleQuestion";

const Question = () => {
  const { questions, answers } = useGlobalContext();
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [questionAns, setQuestionAns] = useState([]);

  useEffect(() => {
    setQuestion(questions?.filter((item) => item?._id === id)[0]);
    setQuestionAns(answers?.filter((item) => item?.question?._id === id));
  });

  return (
    <Container maxWidth="xl" className="Container container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <LeftSidebar />
          </Grid>
          <Grid item md={7} xs={12}>
            <SingleQuestion question={question} questionAns={questionAns} />
          </Grid>
          <Grid item md={3} xs={12}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Question;

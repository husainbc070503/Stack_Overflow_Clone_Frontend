import React from "react";
import "./Questions.css";
import { Button, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../contexts/AppContext";
import QuestionsLists from "./QuestionsLists";

const Questions = ({ fromAllQuestions }) => {
  const { questions, search } = useGlobalContext();

  return (
    <div className="questions-container">
      <div className="top-heading">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item md={6} xs={12}>
            <Typography fontSize={36}>
              {fromAllQuestions ? "All" : "Top"} Questions
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <NavLink to="../askQuestion" className="ask-link">
              <Button variant="contained" color="primary">
                Ask Question
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </div>
      <Typography fontWeight="normal" fontSize={22}>
        {questions?.length} questions.{" "}
        {questions?.length === 0 && "Please login to view them"}
      </Typography>
      <QuestionsLists
        questions={questions?.filter((item) =>
          item?.title?.toLowerCase().includes(search)
        )}
      />
    </div>
  );
};

export default Questions;

import { Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGlobalContext } from "../../contexts/AppContext";
import moment from "moment";
import { Link } from "react-router-dom";

const AnswerCard = ({ answer }) => {
  const { voteAnswer, user, deleteAnswer } = useGlobalContext();

  return (
    <Grid
      container
      columnSpacing={2}
      my={2}
      p={2}
      className="Grid ans-card rounded-2"
    >
      <Grid item md={1}>
        <Tooltip title="This answer is useful" placement="right">
          <ArrowDropUpIcon
            className="rounded-circle border border-2 border-primary icon"
            onClick={() => voteAnswer("upvote", answer?._id)}
          />
        </Tooltip>
        <Typography textAlign="start" className="ms-1" my={1} fontSize={30}>
          {answer?.upVotes?.length - answer?.downVotes?.length}
        </Typography>
        <Tooltip title="This answer is not useful" placement="right">
          <ArrowDropDownIcon
            className="rounded-circle border border-2 border-primary icon"
            onClick={() => voteAnswer("downvote", answer?._id)}
          />
        </Tooltip>
      </Grid>
      <Grid item md={11}>
        <Typography fontSize={15} textAlign="justify">
          {answer?.body}
        </Typography>
        <div className="mt-2">
          {user?.user?._id === answer?.user?._id && (
            <Button color="secondary" onClick={() => deleteAnswer(answer?._id)}>
              Delete
            </Button>
          )}
        </div>
        <div className="text-end">
          <Typography color="secondary" fontSize={14}>
            <Link
              to={`../users/${answer?.user?._id}`}
              className="q-link user-link"
            >
              {answer?.user?.name}
            </Link>{" "}
            answered{" "}
            {moment(new Date(answer?.answeredOn).toLocaleString()).fromNow()}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default AnswerCard;

import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGlobalContext } from "../../contexts/AppContext";
import moment from "moment";
import { Link } from "react-router-dom";
import AnswersList from "../Answers/AnswersList";
import PostAnswer from "../Answers/PostAnswer";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const SingleQuestion = ({ question, questionAns }) => {
  const { user, voteQuestion, deleteQuestion } = useGlobalContext();
  const [sortValue, setSortValue] = useState(0);

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied", {
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

  return (
    <div className="questions-container">
      <Typography color="primary" fontSize={25} fontWeight="bold" mb={3}>
        {question?.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={1}>
          <div className="icons">
            <Tooltip
              title="This question shows research effort; it is useful and clear"
              placement="right"
            >
              <ArrowDropUpIcon
                className="rounded-circle border border-2 border-info icon"
                onClick={() => voteQuestion("upvote", question?._id)}
              />
            </Tooltip>
            <Typography textAlign="start" className="ms-1" my={1} fontSize={30}>
              {question?.upVotes?.length - question?.downVotes?.length}
            </Typography>
            <Tooltip
              title="This question does not show any research effort; it is unclear or not useful"
              placement="right"
            >
              <ArrowDropDownIcon
                className="rounded-circle border border-2 border-info icon"
                onClick={() => voteQuestion("downvote", question?._id)}
              />
            </Tooltip>
          </div>
        </Grid>
        <Grid item md={11}>
          <Typography fontSize={15} textAlign="justify">
            {question?.body}
          </Typography>
          <div className="tags">
            {question?.tags?.map((e, ind) => (
              <Chip
                className="m-1"
                label={e}
                key={ind}
                variant="outlined"
                color="primary"
              />
            ))}
          </div>
          <Button color="secondary" onClick={handleShare}>
            Share
          </Button>
          {question?.user?._id === user?.user?._id && (
            <Button
              color="secondary"
              onClick={() => deleteQuestion(question?._id)}
            >
              Delete
            </Button>
          )}
          <div className="text-end mt-2 ">
            <Typography color="secondary" fontSize={14}>
              <Link
                to={`../users/${question?.user?._id}`}
                className="q-link user-link"
              >
                {question?.user?.name}
              </Link>{" "}
              asked{" "}
              {moment(new Date(question?.postedOn).toLocaleString()).fromNow()}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div className="answers mt-4 border-1 border-top border-warning">
        <div className="my-3">
          {questionAns?.length === 0 ? (
            <Typography fontWeight="bold" fontSize={18}>
              No Answers. Be the first to add
            </Typography>
          ) : (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Grid item md={6}>
                  <Typography fontSize={20} fontWeight="bold">
                    {questionAns?.length} answers
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sort">Sort</InputLabel>
                    <Select
                      labelId="sort"
                      id="sort"
                      value={sortValue}
                      label="Sort"
                      onChange={(e) => setSortValue(e.target.value)}
                    >
                      <MenuItem value={0}>Highest Votes</MenuItem>
                      <MenuItem value={1}>Lowest Votes</MenuItem>
                      <MenuItem value={2}>Created (Newest First)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <AnswersList
                questionAnswers={questionAns}
                sortValue={sortValue}
              />
            </>
          )}
        </div>
        <PostAnswer question={question?._id} />
      </div>
    </div>
  );
};

export default SingleQuestion;

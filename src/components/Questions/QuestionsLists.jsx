import React from "react";
import { useGlobalContext } from "../../contexts/AppContext";
import { Chip, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const QuestionsLists = ({ questions }) => {
  const { answers } = useGlobalContext();

  return (
    <div className="questions-list">
      {questions?.map((item) => {
        const { _id, title, body, tags, upVotes, downVotes, postedOn, user } =
          item;
        const questionAnswers = answers?.filter(
          (item) => item?.question?._id == _id
        );

        return (
          <div className="question-card rounded-2" key={_id}>
            <Grid
              container
              columnSpacing={3}
              rowSpacing={2}
              alignItems="center"
            >
              <Grid item md={2} xs={12} textAlign="end" className="Grid votes">
                <Typography fontSize={15} mb={1} className="Typography">
                  {upVotes?.length + downVotes?.length} votes
                </Typography>
                <Typography
                  fontSize={15}
                  color="secondary"
                  mb={1}
                  className="Typography"
                >
                  {questionAnswers?.length} answers
                </Typography>
              </Grid>
              <Grid item md={10} xs={12}>
                <Link to={`../questions/${_id}`} className="q-link">
                  <Typography color="primary" fontSize={20}>
                    {title}
                  </Typography>
                </Link>
                <Typography color="secondary" mt={1}>
                  {body.substring(0, 40)}...
                </Typography>
                <div className="tags">
                  {tags?.map((e, ind) => (
                    <Chip
                      className="m-1"
                      label={e}
                      key={ind}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </div>
                <div className="askedon">
                  <Typography
                    className="d-inline-block me-1"
                    color="secondary"
                    fontSize={15}
                  >
                    -by
                  </Typography>
                  <Link
                    to={`../users/${user?._id}`}
                    className="q-link user-link"
                  >
                    {user?.name}
                  </Link>
                  <Typography
                    className="d-inline-block ms-1"
                    color="secondary"
                    fontSize={15}
                  >
                    asked {moment(new Date(postedOn).toString()).fromNow()}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsLists;

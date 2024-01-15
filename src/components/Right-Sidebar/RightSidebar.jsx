import { Grid, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import "./RightSidebar.css";
import WidgetTags from "./WidgetTags";

const data = [
  {
    heading: "The Overflow Blog",
    value: [
      {
        icon: <EditIcon className="fs-5 me-2" />,
        title:
          "Observability is key to the future of software (and your DevOps career)",
      },
      {
        icon: <EditIcon className="fs-5 me-2" />,
        title: "Podcast 374: How valuable is your screen name?",
      },
    ],
  },
  {
    heading: "Featured on Meta",
    value: [
      {
        icon: <ModeCommentIcon className="fs-5 me-2" />,
        title: "Review queue workflows - Final release....",
      },
      {
        icon: <ModeCommentIcon className="fs-5 me-2" />,
        title:
          "Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG",
      },
      {
        icon: <ModeCommentIcon className="fs-5 me-2" />,
        title:
          "Outdated Answers: accepted answer is now unpinned on Stack Overflow",
      },
    ],
  },
  {
    heading: "Hot Meta Posts",
    value: [
      {
        icon: <span className="fw-bold">38</span>,
        title:
          "Why was this spam flag declined, yet the question marked as spam?",
      },
      {
        icon: <span className="fw-bold">20</span>,
        title:
          "What is the best course of action when a user has high enough rep to...",
      },
      {
        icon: <span className="fw-bold">14</span>,
        title: `Is a link to the "How to ask" help page a useful comment?`,
      },
    ],
  },
];

const RightSidebar = () => {
  return (
    <div className="right-side-nav">
      {data?.map((item, ind) => (
        <div className="right-side-card shadow-sm" key={ind}>
          <div className="heading">
            <Typography fontWeight="bold" padding={2} fontSize={20}>
              {item.heading}
            </Typography>
          </div>
          <div className="body">
            {item.value.map((e, ind) => (
              <Grid container spacing={3} mb={1} key={ind}>
                <Grid item md={1} xs={2}>
                  {e.icon}
                </Grid>
                <Grid item md={11} xs={10}>
                  <Typography>{e.title}</Typography>
                </Grid>
              </Grid>
            ))}
          </div>
        </div>
      ))}

      <WidgetTags />
    </div>
  );
};

export default RightSidebar;

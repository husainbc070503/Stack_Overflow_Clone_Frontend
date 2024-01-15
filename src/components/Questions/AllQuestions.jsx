import React from "react";
import Questions from "./Questions";
import { Box, Container, Grid } from "@mui/material";
import LeftSidebar from "../Left-Sidebar/LeftSidebar";
import RightSidebar from "../Right-Sidebar/RightSidebar";

const AllQuestions = () => {
  return (
    <Container maxWidth="xl" className="Container container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <LeftSidebar />
          </Grid>
          <Grid item md={7} xs={12}>
            <Questions fromAllQuestions={true} />
          </Grid>
          <Grid item md={3} xs={12}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AllQuestions;

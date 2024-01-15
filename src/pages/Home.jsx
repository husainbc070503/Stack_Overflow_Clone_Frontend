import { Box, Container, Grid } from "@mui/material";
import React from "react";
import LeftSidebar from "../components/Left-Sidebar/LeftSidebar";
import RightSidebar from "../components/Right-Sidebar/RightSidebar";
import Questions from "../components/Questions/Questions";

const Home = () => {
  return (
    <Container maxWidth="xl" className="Container container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <LeftSidebar />
          </Grid>
          <Grid item md={7} xs={12}>
            <Questions />
          </Grid>
          <Grid item md={3} xs={12}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

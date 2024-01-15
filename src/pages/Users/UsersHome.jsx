import { Box, Container, Grid } from "@mui/material";
import React from "react";
import LeftSidebar from "../../components/Left-Sidebar/LeftSidebar";
import Users from "./Users";
import "./Users.css";

const UsersHome = () => {
  return (
    <Container maxWidth="xl" className="Container container">
      <Box>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <LeftSidebar />
          </Grid>
          <Grid item md={10} xs={12}>
            <Users />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UsersHome;

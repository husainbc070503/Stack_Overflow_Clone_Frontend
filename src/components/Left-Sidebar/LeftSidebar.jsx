import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import StyleIcon from "@mui/icons-material/Style";
import GroupIcon from "@mui/icons-material/Group";
import "./LeftSidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const LeftSidebar = () => {
  const [openLeftNav, setOpenLeftNav] = useState(false);

  return (
    <Box>
      <MenuIcon
        className="nav-icon bar-icon"
        onClick={() => setOpenLeftNav(!openLeftNav)}
      />
      <div className={`left-side-nav ${openLeftNav && "open"}`}>
        <div className="top-links">
          <CloseIcon
            className="nav-icon close-icon d-none"
            onClick={() => setOpenLeftNav(!openLeftNav)}
          />
          <NavLink to="/" className="l-nav-link home">
            Home
          </NavLink>
          <Typography fontSize={20} fontWeight="bold" display="block" my={2}>
            PUBLIC
          </Typography>
        </div>
        <div className="bottom-links">
          {[
            {
              title: "Questions",
              icon: <PublicIcon className="fs-5 me-2" />,
              link: "../questions",
            },
            {
              title: "Tags",
              icon: <StyleIcon className="fs-5 me-2" />,
              link: "../tags",
            },
            {
              title: "Users",
              icon: <GroupIcon className="fs-5 me-2" />,
              link: "../users",
            },
          ].map((item, ind) => (
            <NavLink
              to={item.link}
              key={ind}
              className="l-nav-link bottom-links"
            >
              <span>{item?.icon}</span>
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default LeftSidebar;

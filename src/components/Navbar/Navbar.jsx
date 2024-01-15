import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../../assets/logo.png";
import SearchBox from "../SearchBox";
import "./Navbar.css";
import { useGlobalContext } from "../../contexts/AppContext";
import ProfileButton from "../ProfileButton";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { user, handleLogout, search, handleSearch } = useGlobalContext();
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <AppBar position="fixed" className="AppBar navbar">
      <Toolbar className="Toolbar navbar-tool">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="icon">
          {!openNav ? (
            <MenuIcon
              className="nav-icon"
              onClick={() => setOpenNav(!openNav)}
            />
          ) : (
            <CloseIcon
              className="nav-icon"
              onClick={() => setOpenNav(!openNav)}
            />
          )}
        </div>
        <Box className={`links ${openNav && "open-link"}`}>
          <Link to="/" className="nav-link">
            About
          </Link>
          <Link to="/" className="nav-link">
            Products
          </Link>
          <Link to="/" className="nav-link">
            For Teams
          </Link>
          <SearchBox
            search={search}
            handleChange={handleSearch}
            title="Search question by tag"
          />
        </Box>
        {user?.user ? (
          <ProfileButton user={user} handleLogout={handleLogout} />
        ) : (
          <Link to="/login" className="nav-link">
            <Button color="primary" variant="contained" className="Button login mx-4">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

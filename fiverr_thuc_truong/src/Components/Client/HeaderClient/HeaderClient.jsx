import { Close, Search as SearchIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getListJobByName } from "../../../API/jobAPI";
import { useAuth } from "../../../Contexts/useContext/useContext";
import { PATH } from "../../../Routes/path";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useHeaderStore } from "../../../store/useHeaderStore";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../SearchBar/SearchBar";

const HeaderClient = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { sticky, setSticky, setUnSticky, setSearchQuery } = useHeaderStore();

  const media = useMediaQuery("(min-width: 768px)");
  const mobile = useMediaQuery("(max-width: 650px)");

  const { isLoading, data: jobs = [] } = useQuery({
    queryKey: ["jobs", search],
    queryFn: () => getListJobByName(search),
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAfterSearch = () => {
    setSearchQuery(search);
    setSearch("");
  };

  const { currentUser, handleLogOut } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const scrollTop = window.scrollY;
    scrollTop >= 100 ? setSticky() : setUnSticky();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      role="presentation"
      sx={{
        p: "1rem",
        maxWidth: "100%",
        minWidth: 300,
      }}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/sign-in">
            <Button variant="contained" color="success">
              Sign In
            </Button>
          </Link>

          <IconButton onClick={() => setOpen(!open)}>
            <Close />
          </IconButton>
        </ListItem>

        {["Fiverr Pro", "Explore", "Messages", "List", "Order"].map((text) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText
                  sx={{
                    color: "#62646a",
                    fontSize: "32px",
                    fontWeight: "600",
                    marginBottom: "16px",
                  }}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      className={`header-section header-container ${sticky ? "is-sticky" : ""}`}
      sx={{ flexGrow: 1 }}
    >
      <Toolbar className="header-toolbar">
        {!media && (
          <IconButton
            onClick={() => setOpen(!open)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 1, color: sticky ? "#333" : "white" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
          onClick={() => {
            navigate(PATH.HOME);
          }}
        >
          <img
            src={sticky ? "/Image/logoFiverr.jpg" : "/Image/logo.svg"}
            alt=""
            style={{ width: 100, cursor: "pointer" }}
          />
        </Typography>
        <Search sx={{ bgcolor: !sticky && "white" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={search || ""}
            onChange={handleSearch}
            inputProps={{ "aria-label": "search" }}
          />

          <Box position={"absolute"} minWidth={400} bgcolor={"white"}>
            {isLoading ? (
              <ListItem alignItems="flex-start">
                <p>Loading ....</p>
              </ListItem>
            ) : (
              jobs.map((job) => (
                <Link
                  key={job.id}
                  to={"jobs/" + job.id}
                  onClick={handleAfterSearch}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={job.congViec.hinhAnh} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {job.congViec.tenCongViec}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            )}
          </Box>
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        {currentUser ? (
          <Stack
            spacing={2}
            direction={"row"}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Typography>{currentUser.user.name}</Typography>
            <Button
              size="large"
              variant="text"
              onClick={() => {
                handleLogOut();
                // navigate(PATH.SIGNIN);
              }}
            >
              LOG OUT
            </Button>
          </Stack>
        ) : (
          <Stack spacing={1} direction={"row"}>
            {!mobile && (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: media ? "16px" : "14px",
                    textTransform: "capitalize",
                    borderColor: !sticky ? "white" : "black",
                    color: !sticky ? "white" : "black",
                  }}
                  onClick={() => {
                    navigate(PATH.SIGNUP);
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    fontSize: media ? "16px" : "14px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    navigate(PATH.SIGNIN);
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Stack>
        )}
      </Toolbar>
    </Box>
  );
};

export default HeaderClient;

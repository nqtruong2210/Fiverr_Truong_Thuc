import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import style from "./adminHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { PATH } from "../../../Routes/path";
import { UserAction } from "../../../store/LoginAdminSlice/slice";
import { getUserByIdAPI } from "../../../API/AdminTechnique";

const drawerWidth = 240;
const HeaderAdmin = () => {
  const { user } = useSelector((state) => state.User);
  const ID = user?.user?.id;
  const { data: currentUser = {} } = useQuery({
    queryKey: ["USER", ID],
    queryFn: () => getUserByIdAPI(ID),
    enabled: !!ID,
  });

  const listManage = [
    "ManageUser",
    "ManageJob",
    "ManageJobStyle",
    "ManageServices",
    "ManageJobDetails",
    "ManageComment",
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(UserAction.setLogout());
    navigate("/admin/manage-user");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "rgb(99, 9, 99)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 90,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            transform: "rotate(45deg)",
            boxShadow:
              "rgba(240, 46, 170, 0.4)0px 0px 0px 2px inset, rgba(240, 46, 170, 0.3) 10px -10px 0px -3px, rgba(240, 46, 170, 0.2) 10px -10px, rgba(240, 46, 170, 0.1) 20px -20px 0px -3px, rgba(240, 46, 170, 0.05) 20px -20px",
          }}
        >
          <Link to={"/admin/manage-user"}>
            <Typography
              fontSize={27}
              fontWeight={900}
              sx={{ transform: "rotate(-45deg)" }}
            >
              Fi
            </Typography>
          </Link>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {listManage.map((item) => {
          return (
            <ListItem key={item}>
              <Link
                to={
                  item === "ManageUser"
                    ? PATH.MANAGE_USER
                    : item === "ManageJob"
                    ? PATH.MANAGE_JOB
                    : item === "ManageJobStyle"
                    ? PATH.MANAGE_JOBSTYLE
                    : item === "ManageJobDetails"
                    ? PATH.MANAGE_JOBDETAILS
                    : item === "ManageComment"
                    ? PATH.MANAGE_COMMENT
                    : PATH.MANAGE_SERVICES
                }
              >
                {item}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  return (
    <Box className={style.header}>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          background: "transparent",
        }}
      >
        <Toolbar
          sx={{
            position: "fixed",
            zIndex: 99,
            background: "white",
            width: { lg: `calc(100% - ${drawerWidth}px)`, xs: "100%" },

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { lg: "none" },
                background: "rgb(99, 9, 99)",
                borderRadius: "3px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box className={style.waviy}>
              <span style={{ "--i": 1 }}>F</span>
              <span style={{ "--i": 2 }}>I</span>
              <span style={{ "--i": 3 }}>V</span>
              <span style={{ "--i": 4 }}>E</span>
              <span style={{ "--i": 5 }}>R</span>
              <span style={{ "--i": 6 }}>R</span>{" "}
              <span style={{ "--i": 7 }}>A</span>
              <span style={{ "--i": 8 }}>D</span>
              <span style={{ "--i": 9 }}>M</span>
              <span style={{ "--i": 10 }}>I</span>
              <span style={{ "--i": 11 }}>N</span>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Button onClick={() => navigate("/admin-login")}>
                Đăng nhập
              </Button>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={currentUser.avatar} />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={handleLogout}>Logout</Button>
                <Button>
                  <Link to={PATH.PROFILE}>Profile</Link>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default HeaderAdmin;

import { Box } from "@mui/material";
import React from "react";

import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../Components/Admin/Header/HeaderAdmin";

const drawerWidth = 240;
const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <HeaderAdmin />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box paddingTop={6}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;

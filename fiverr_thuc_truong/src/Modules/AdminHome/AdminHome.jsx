import { Box, Button } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import Animation from "../../Constants/Animation.json";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Routes/path";
const AdminHome = () => {
    const navigate = useNavigate()
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Lottie
        animationData={Animation}
        style={{
          position: "absolute",
          top: "-150px",
        }}
        
      >
        <Button
          sx={{
            position: "absolute",
            zIndex: 18,
            fontSize: "1.5rem",
            fontWeight:600,
            padding:3,
            top: "75%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={() => navigate(PATH.MANAGE_USER)}
        >
          GET STARTED
        </Button>
      </Lottie>
    </Box>
  );
};

export default AdminHome;

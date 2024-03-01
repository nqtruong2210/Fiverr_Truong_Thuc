import { Box, Button } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import Animation from "../../Constants/Animation.json";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../Routes/path";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const AdminHome = () => {
  const { user } = useSelector((state) => state.User);
  const navigate = useNavigate();
  const started = () => {
    user
      ? navigate(PATH.MANAGE_USER)
      : Swal.fire("Vui Lòng Đăng Nhập Tài Khoản Admin");
  };
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Lottie
        animationData={Animation}
        style={{
          position: "absolute",
          top: "-45%",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            zIndex: 18,
            fontSize: { xs: "1rem", sm: "1.5rem" },
            fontWeight: 600,
            padding: 3,
            top: "75%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          onClick={started}
        >
          GET STARTED
        </Button>
      </Lottie>
    </Box>
  );
};

export default AdminHome;

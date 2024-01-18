import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const JobStyleInfo = ({ data }) => {
  return (
    <Box>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "600",
          fontSize: "1.5rem",
          display: "inline-block",
        }}
      >
        Name: {""}
        <Typography
          sx={{
            fontSize: "1.5rem",
            display: "inline-block",
          }}
        >
          {data.tenLoaiCongViec}
        </Typography>
      </Typography>
    </Box>
  );
};

export default JobStyleInfo;

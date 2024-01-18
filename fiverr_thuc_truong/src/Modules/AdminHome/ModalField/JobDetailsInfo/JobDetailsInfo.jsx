import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";

const JobDetailsInfo = ({ data }) => {
  console.log("data", data);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "3 auto" }}>
          <Typography sx={{ fontWeight: 600 }}>
            Group Name:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft:1 }}>
              {data.tenNhom}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Type Job ID:{" "}
            <Typography sx={{ display: "inline-block",  paddingLeft:1 }}>
              {data.maLoaiCongviec}
            </Typography>
          </Typography>
          <Typography
            sx={{ fontWeight: 600 }}
          >
            List Type Details:{" "}
            <Typography>
              {data.dsChiTietLoai?.map((type) => {
                return (
                  <Typography sx={{display:"block", paddingLeft:1}}>*{type.tenChiTiet}</Typography>
                );
              })}
            </Typography>
          </Typography>
        </CardContent>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <CardMedia
        component="img"
        sx={{ width: 180, height:180, padding:1 }}
        image={data.hinhAnh}
        alt="..."
      />
    </Card>
  );
};

export default JobDetailsInfo;

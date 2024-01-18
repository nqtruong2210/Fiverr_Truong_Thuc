import { Grid, Rating, Typography } from "@mui/material";
import React from "react";

const JobInfo = ({data}) => {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        width={"30%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={data.hinhAnh} alt="" width={"100%"} height={"90%"} />
      </Grid>
      <Grid item width={"70%"}>
        <Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Name:
          </Typography>
          {data.tenCongViec}
        </Typography>
        <Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Price:
          </Typography>{" "}
          {data.giaTien}
        </Typography>
        <Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            FeedBack:
          </Typography>{" "}
          {data.danhGia}
        </Typography>
        <Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Created:
          </Typography>{" "}
          {data.nguoiTao}
        </Typography>
        <Typography noWrap>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Description:
          </Typography>{" "}
          {data.moTa}
        </Typography>
        <Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.2rem",
              display: "inline-block",
            }}
          >
            Rating:
          </Typography>{" "}
          <Rating value={data.saoCongViec} readOnly />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default JobInfo;

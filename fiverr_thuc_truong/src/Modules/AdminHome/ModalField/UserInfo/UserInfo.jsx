import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const UserInfo = ({ data }) => {
  return (
    <Grid>
      <Card sx={{ display: "flex", alignItems: "center", padding: 9 }}>
        <Avatar sx={{ width: "39%", height: "39%" }} src={data.avatar} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.role}
          </Typography>
          <Typography>Name:{data.name}</Typography>
          <Typography>Day of Birth:{dayjs(data.birthday).format("DD/MM/YYYY")}</Typography>
          <Typography>Email:{data.email}</Typography>
          <Typography>Phone:{data.phone}</Typography>
          <Typography>Gender:{data.Gender ? "Male" : "Female"}</Typography>

          {data.role === "ADMIN" ? null : (
            <Box>
              <Typography>BookingJob:{data.bookingJob}</Typography>
              <Typography>Certificate:{data.certificate}</Typography>
              <Typography>Skill:{data.skill}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserInfo;

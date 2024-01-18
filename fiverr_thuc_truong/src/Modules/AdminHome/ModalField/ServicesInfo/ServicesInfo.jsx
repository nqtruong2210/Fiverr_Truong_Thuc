import { Box, Card, CardContent, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const ServicesInfo = ({ data }) => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography sx={{ fontWeight: 600 }}>
            ID:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.id}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Job Code:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.maCongViec}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Renter Code:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.maNguoiThue}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Day of hire:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {dayjs(data.ngayThue).format("DD/MM/YYYY")}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Status:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.hoanThanh ? "Finish" : "Unfinish"}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServicesInfo;

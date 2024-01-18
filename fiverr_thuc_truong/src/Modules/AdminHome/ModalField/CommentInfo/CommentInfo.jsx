import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const CommentInfo = ({ data }) => {
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
            Code Job:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.maCongViec}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Commenter Code:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.maNguoiBinhLuan}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Date:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {dayjs(data.ngayBinhLuan).format("DD/MM/YYYY")}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Content:{" "}
            <Typography sx={{ display: "inline-block", paddingLeft: 1 }}>
              {data.noiDung}
            </Typography>
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>
            Date: <Rating value={data.saoBinhLuan} readOnly />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CommentInfo;

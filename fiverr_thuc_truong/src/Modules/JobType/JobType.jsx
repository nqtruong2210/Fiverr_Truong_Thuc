import React from "react";
import JobTypeMenu from "../Home/JobTypeMenu";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import { useHeaderStore } from "../../store/useHeaderStore";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { layChiTietLoaiCongViec } from "../../API/jobAPI";

const JobType = () => {
  const { sticky, setSticky } = useHeaderStore();
  if (!sticky) {
    setSticky();
  }
  const media = useMediaQuery("(min-width: 768px)");
  let { id } = useParams();

  const { data: jobType } = useQuery({
    queryKey: ["job-type", id],
    queryFn: () => layChiTietLoaiCongViec(id),
  });
  return (
    <div>
      {media && <JobTypeMenu fixed={false} />}
      <img src="./Image/bg-typejob.jpg" alt="" />
      <Typography
        sx={{
          marginTop: 10,
          fontWeight: 700,
          fontSize: 24,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Graphics & Design
      </Typography>
      <Typography
        sx={{
          marginTop: 1,
          marginBottom: 1,
          fontSize: 18,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Design to make you stand out.
      </Typography>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "40px",
          margin: "auto",
        }}
      >
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "5px" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
            fill="#1C274C"
          />
        </svg>
        <span>How Fiverr Works</span>
      </Button>
      {jobType && jobType.length > 0 && (
        <Typography
          variant="subtitle1"
          my={5}
          sx={{ padding: "0 80px", fontWeight: 700, fontSize: 26 }}
        >
          Explore {jobType[0]?.tenLoaiCongViec}
        </Typography>
      )}
      <Grid container spacing={3} sx={{ padding: "0 80px" }}>
        {jobType &&
          jobType.length > 0 &&
          jobType.map(
            (item) =>
              item.dsNhomChiTietLoai &&
              item.dsNhomChiTietLoai.map((nhomChiTiet) => (
                <Grid item key={nhomChiTiet.id} xs={12} md={6} lg={3}>
                  <Box>
                    {nhomChiTiet.hinhAnh && (
                      <img
                        style={{ width: "250px", height: "250px" }}
                        src={nhomChiTiet.hinhAnh}
                        alt={nhomChiTiet.tenNhom}
                      />
                    )}
                    {nhomChiTiet.tenNhom && (
                      <Typography variant="h5" fontWeight={700}>
                        {nhomChiTiet.tenNhom}
                      </Typography>
                    )}
                    {nhomChiTiet.dsChiTietLoai &&
                      nhomChiTiet.dsChiTietLoai.map((chiTiet) => (
                        <Link to={"/jobs/" + chiTiet.id}>
                          <MenuItem
                            key={chiTiet.id}
                            sx={{ color: "#62646a", fontSize: 18 }}
                          >
                            {chiTiet.tenChiTiet}
                          </MenuItem>
                        </Link>
                      ))}
                  </Box>
                </Grid>
              ))
          )}
      </Grid>
      {jobType && jobType.length > 0 && (
        <Typography
          variant="subtitle1"
          my={5}
          sx={{
            padding: "0 80px",
            fontWeight: 700,
            fontSize: 26,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Services Related To {jobType[0]?.tenLoaiCongViec}
        </Typography>
      )}
      <Box sx={{ mt: 15, mx: 5 }}>
        <Box width={"100%"} my={10} display={"flex"} justifyContent={"center"}>
          <Pagination count={10} />
        </Box>
      </Box>
    </div>
  );
};

export default JobType;

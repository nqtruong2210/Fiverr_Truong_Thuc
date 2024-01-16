import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Await, Link, useParams } from "react-router-dom";
import { getJobByTypeDetails } from "../../API/jobAPI";
import Spinning from "../../Components/Client/Spinning/Spinning";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useHeaderStore } from "../../store/useHeaderStore";
import JobTypeMenu from "../Home/JobTypeMenu/JobTypeMenu";
import FilterBar from "./Filter/FilterBar";
import JobCard from "./JobCard/JobCard";
// import { useEffect, useState } from 'react';
// import fetcher from '../../API/fetcher';
// import { useNavigate } from 'react-router-dom';

function ListJob() {
  const media = useMediaQuery("(min-width: 768px)");
  // const nav = useNavigate();
  const { sticky, setSticky, searchQuery } = useHeaderStore();
  if (!sticky) {
    setSticky();
  }
  let { id } = useParams();
  // const [pageApi, setPageApi] = useState(1);
  // const [jobItems, setJobItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   getData();
  // }, [])
  // const getData = async () => {
  //   await fetcher.get(`/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`).then(res => {
  //     if (res.status == 200) {
  //       setJobItems(res.data.content)
  //       setIsLoading(isLoading)
  //     } else {
  //       setIsLoading(!isLoading)
  //     }
  //   })
  // }
  const { isLoading, data: jobItems = [] } = useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobByTypeDetails(id),
  });
  // console.log(jobItems);
  if (isLoading) {
    return <Spinning />;
  }

  return (
    <>
      {media && <JobTypeMenu fixed={false} />}

      <Box sx={{ mt: 15, mx: 5 }}>
        {searchQuery && (
          <Typography variant="h4" my={5}>
            Results for "{searchQuery}"
          </Typography>
        )}
        <FilterBar />
        <Typography variant="subtitle1" my={5}>
          {jobItems.length} services available
        </Typography>
        <Grid container spacing={3}>
          {!isLoading &&
            jobItems.map((item) => (
              <Grid key={item.id} item xs={12} md={3}>
                <Link
                  to={`/job-detail/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <JobCard congViec={item.congViec} />
                </Link>
              </Grid>
            ))}
        </Grid>
        <Box width={"100%"} my={10} display={"flex"} justifyContent={"center"}>
          <Pagination count={10} />
        </Box>
      </Box>
    </>
  );
}

export default ListJob;

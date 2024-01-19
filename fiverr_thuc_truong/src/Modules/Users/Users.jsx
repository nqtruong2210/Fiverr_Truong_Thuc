import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserById } from "../../API/userAPI";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useHeaderStore } from "../../store/useHeaderStore";
import JobTypeMenu from "../Home/JobTypeMenu";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Users = () => {
  const { sticky, setSticky } = useHeaderStore();
  if (!sticky) {
    setSticky();
  }
  const { id } = useParams();

  const { data: users = [] } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
  });
  const media = useMediaQuery("(min-width: 768px)");
  return (
    <Box sx={{ flexGrow: 1 }}>
      {media && <JobTypeMenu fixed={false} />}
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Box>
            {users && users.length > 0 && (
              <Typography
                variant="subtitle1"
                my={2}
                sx={{ padding: "0 80px", fontWeight: 700, fontSize: 26 }}
              >
                Explore {user[3104]?.name}
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Box>
  );
};

export default Users;

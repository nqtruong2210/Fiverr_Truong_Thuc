import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHiredJob, getUserById } from "../../API/userAPI";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useHeaderStore } from "../../store/useHeaderStore";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { PATH } from "../../Routes/path";
import { CURRENT_USER } from "../../Constants";
const Users = () => {
  const { sticky, setSticky } = useHeaderStore();
  if (!sticky) {
    setSticky();
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const parseID = parseInt(id, 10);
  const { data: users } = useQuery({
    queryKey: ["users", parseID],
    queryFn: () => getUserById(parseInt(parseID, 10)),
  });

  const { data: hiredJob } = useQuery({
    queryKey: ["hired-job"],
    queryFn: () => getHiredJob(),
  });
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (!user) {
    return navigate(PATH.HOME);
  }
  return (
    <Box sx={{ flexGrow: 1, marginTop: "80px", padding: "0 80px" }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginTop: 2,
              borderBottom: "1px solid #ccc",
              paddingBottom: 2,
            }}
          />
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Avatar
              src={users?.avatar}
              alt={users?.name}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              {users?.name}
            </Typography>
            <Button>
              <EditIcon />
            </Button>
            <Typography
              sx={{
                marginTop: 2,
                borderBottom: "1px solid #ccc",
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon sx={{ fontSize: 16 }} /> Form
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>Viet Nam</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  textAlign: "left",
                  alignItems: "center",
                }}
              >
                <PersonIcon sx={{ fontSize: 16 }} /> Member since
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>Oct 2024</Typography>
            </Box>
          </Paper>
          <Typography
            sx={{
              marginTop: 2,
              borderBottom: "1px solid #ccc",
              paddingBottom: 2,
            }}
          />

          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
                INFORMATION
              </Typography>
              <Button>Add information</Button>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, textAlign: "left" }}>
                Skill
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "14px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                Add your skill
              </Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ fontWeight: 700, textAlign: "left" }}>
                Education
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "14px",
                  color: "gray",
                  fontStyle: "italic",
                }}
                className="css-text"
              >
                Add your education
              </Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography sx={{ fontWeight: 700, textAlign: "left" }}>
                Certlfication
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "14px",
                  color: "gray",
                  fontStyle: "italic",
                }}
                className="css-text"
              >
                Add your certlfication
              </Typography>
            </Box>
            {/* Spacing */}
            <Typography
              sx={{
                marginTop: 2,
                borderBottom: "1px solid #ccc",
                paddingBottom: 2,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
                Language
              </Typography>
              <Button>Add language</Button>
            </Box>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "14px",
                color: "gray",
                fontStyle: "italic",
              }}
            >
              English - Basic
            </Typography>
            <Typography
              sx={{
                marginTop: 2,
                borderBottom: "1px solid #ccc",
                paddingBottom: 2,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
                Linked Account
              </Typography>
              <Button>Add language</Button>
            </Box>
            <Typography sx={{ textAlign: "left" }}>
              <Button
                style={{
                  textTransform: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <FacebookIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                Facebook
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <InstagramIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                Instagram
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <TwitterIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                Twitter
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <GoogleIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                Google
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <GitHubIcon
                  style={{
                    marginRight: "5px",
                  }}
                />
                Github
              </Button>
            </Typography>
          </Paper>
        </Grid>

        {/* Phần 2 */}
        <Grid item xs={10}>
          <Typography
            sx={{
              marginTop: 2,
              borderBottom: "1px solid #ccc",
              paddingBottom: 2,
            }}
          />
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 5 }}>
            {users && (
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    color: "gray",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  It seems that you don't have active Gigs. Get selling
                </Typography>
                <Button>Create a new Gigs</Button>
              </Box>
            )}
          </Paper>
          <Typography
            sx={{
              marginTop: 2,
              borderBottom: "1px solid #ccc",
              paddingBottom: 2,
            }}
          />
          <Paper elevation={3} sx={{ padding: 2 }}>
            {hiredJob.map((item, index) => (
              <Paper key={index}>
                <Grid container>
                  <Grid item xs={4}>
                    <img
                      src={item.congViec.hinhAnh}
                      alt={`Hình ảnh ${index + 1}`}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Typography
                    sx={{
                      marginTop: 2,
                      borderBottom: "1px solid #ccc",
                      paddingBottom: 2,
                    }}
                  />
                  <Grid item xs={8}>
                    <Stack spacing={2} direction={"column"} mx={3}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {item.congViec.tenCongViec}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "gray",
                          fontStyle: "italic",
                        }}
                      >
                        {item.congViec.moTa}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;

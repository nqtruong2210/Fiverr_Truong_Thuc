import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInAPI } from "../../../API/userAPI";
import { useAuth } from "../../../Contexts/useContext/useContext";
import { PATH } from "../../../Routes/path";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { CURRENT_USER } from "../../../Constants";
import { message } from "antd";
const SignIn = () => {
  const { handleSignIn: handleSignInContext, currentUser } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const { mutate: handleSignin } = useMutation({
    mutationFn: (values) => signInAPI(values),
    onSuccess: (values) => {
      handleSignInContext(values);
      if (values.user.role === "USER") return navigate(PATH.HOME);

      if (values.user.role === "ADMIN") return navigate(PATH.ADMIN);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Tài khoản hoặc mật khẩu sai",
      });
    },
  });

  // if (currentUser) {
  //   return <Navigate to={PATH.HOME} />;
  // }

  const onSubmit = (formValue) => {
    handleSignin(formValue);
  };
  const media = useMediaQuery("(min-width: 768px)");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: media ? "100vh" : "500px",
      }}
    >
      {contextHolder}
      <Box>
        <Typography variant="h5" textAlign={"center"} mb={2}>
          Login
        </Typography>
      </Box>

      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField label="Email" fullWidth mb={3} {...register("email")}>
                Email
              </TextField>
              <TextField
                mb={3}
                label="Password"
                fullWidth
                type="password"
                {...register("password")}
              >
                Password
              </TextField>
              <Button type="submit" variant="contained">
                Đăng nhập
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;

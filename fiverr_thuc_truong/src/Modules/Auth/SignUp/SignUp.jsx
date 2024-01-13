import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signUpAPI } from "../../../API/userAPI";
import { useAuth } from "../../../Contexts/useContext/useContext";
import { PATH } from "../../../Routes/path";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
// Error
const schemaSignUp = yup.object({
  name: yup
    .string()
    .required("You cannot leave this field blank")
    .matches(
      /^[\p{L}\s]+$/u,
      "The name cannot contain numbers or special characters"
    ),
  email: yup
    .string()
    .required("You cannot leave this field blank")
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Please enter the correct email format"
    ),
  password: yup
    .string()
    .required("You cannot leave this field blank")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must contain at least 8 characters, including at least one numeric character, one uppercase character and one special character"
    ),
  phone: yup
    .string()
    .required("You cannot leave this field blank")
    .matches(/^[0-9\-\+]{9,12}$/, "Phone number is incorrect"),
  birthday: yup
    .string()
    .required("You cannot leave this field blank")
    .matches(),
  skill: yup.string().required("You cannot leave this field blank"),
  certification: yup.string().required("You cannot leave this field blank"),
});
const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: undefined,
      role: "USER",
      skill: [""],
      certification: [""],
    },
    mode: "all",
    resolver: yupResolver(schemaSignUp),
  });

  const { mutate: handleSignUp } = useMutation({
    mutationFn: (data) => signUpAPI(data),
    onSuccess: () => {
      return navigate(PATH.SIGNIN);
    },
    onError: (err) => {
      console.log("err: ", err);
    },
  });

  const onSubmit = (values) => {
    const transformedData = {
      ...values,
      id: values.id,
      role: values.role,
      gender: values.gender === "male",
      skill: values.skill
        ? values.skill.split(",").map((skill) => skill.trim())
        : [],
      certification: values.certification
        ? values.certification
            .split(",")
            .map((certification) => certification.trim())
        : [],
    };

    console.log("Data:", transformedData);
    handleSignUp(transformedData);
  };

  if (currentUser) {
    return <Navigate to={PATH.HOME} />;
  }

  const media = useMediaQuery("(min-width: 768px)");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: media ? "130vh" : "900px",
      }}
    >
      <Typography variant="h5" textAlign={"center"} mb={2}>
        Create your Cinema Account
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={Boolean(errors.name) && errors.name.message}
              />
              <TextField
                label="Email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email.message}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) && errors.password.message}
              />
              <TextField
                label="Phone"
                {...register("phone")}
                error={Boolean(errors.phone)}
                helperText={Boolean(errors.phone) && errors.phone.message}
              />
              <Controller
                control={control}
                name="birthday"
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birth Day"
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        const value = dayjs(date).format("DD/MM/YYYY");
                        setValue("birthday", value);
                        console.log("Birthday", value);
                      }}
                      {...field}
                    />
                  );
                }}
              />
              <FormControl>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  label="Gender"
                  {...register("gender", { required: true })}
                  defaultValue="male"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Skill"
                {...register("skill")}
                error={Boolean(errors.skill)}
                helperText={Boolean(errors.skill) && errors.skill.message}
              />
              <TextField
                label="Certification"
                {...register("certification")}
                error={Boolean(errors.certification)}
                helperText={
                  Boolean(errors.certification) && errors.certification.message
                }
              />
              <Button variant="contained" type="submit" size="large">
                SIGN UP
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;

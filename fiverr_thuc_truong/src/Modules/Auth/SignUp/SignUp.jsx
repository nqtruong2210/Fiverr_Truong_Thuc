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
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUpAPI } from "../../../API/userAPI";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const SignUp = () => {
  const { register, handleSubmit, control, setValue } = useForm({
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
  });

  const { mutate: handleSignUp } = useMutation({
    mutationFn: (data) => signUpAPI(data),
    onSuccess: () => {
      console.log("Sign up successful:", data);
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

    console.log("Transformed Data:", transformedData);
    handleSignUp(transformedData);
  };
  return (
    <Container maxWidth="sm">
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
              <TextField label="Name" {...register("name")} />
              <TextField label="Email" {...register("email")} />
              <TextField label="Password" {...register("password")} />
              <TextField label="Phone" {...register("phone")} />
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
              <TextField label="Skill" {...register("skill")} />
              <TextField label="Certification" {...register("certification")} />
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

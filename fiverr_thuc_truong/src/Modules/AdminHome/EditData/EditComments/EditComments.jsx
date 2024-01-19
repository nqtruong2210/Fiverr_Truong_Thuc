import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateCommentAPI } from "../../../../API/AdminTechnique";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { EditDataActions } from "../../../../store/EditdataSlice/slice";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maNguoiBinhLuan: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  noiDung: yup.string().required("Vui Lòng Nhập Thông Tin"),
});

const EditComments = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      maCongViec: data.maCongViec,
      maNguoiBinhLuan: data.maNguoiBinhLuan,
      ngayBinhLuan: data.ngayBinhLuan,
      noiDung: data.noiDung,
      saoBinhLuan: data.saoBinhLuan,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleUpdateComment, isPending } = useMutation({
    mutationKey: ["comments"],
    mutationFn: (values) => updateCommentAPI(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-comment");
    },
  });
  const onSubmit = (values) => {
    handleUpdateComment(values);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Update Comment
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="id"
                    label="ID"
                    {...field}
                    disabled
                    error={Boolean(errors.id)}
                    helperText={Boolean(errors.id) && errors.id.message}
                  />
                )}
              />
              <Controller
                name="maCongViec"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="maCongViec"
                    label="Code Job"
                    {...field}
                    error={Boolean(errors.maCongViec)}
                    helperText={
                      Boolean(errors.maCongViec) && errors.maCongViec.message
                    }
                  />
                )}
              />
              <Controller
                name="maNguoiBinhLuan"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="maNguoiBinhLuan"
                    label="Commenter Code"
                    {...field}
                    error={Boolean(errors.maNguoiBinhLuan)}
                    helperText={
                      Boolean(errors.maNguoiBinhLuan) &&
                      errors.maNguoiBinhLuan.message
                    }
                  />
                )}
              />
              <Controller
                name="noiDung"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="noiDung"
                    label="Content"
                    {...field}
                    error={Boolean(errors.noiDung)}
                    helperText={
                      Boolean(errors.noiDung) && errors.noiDung.message
                    }
                  />
                )}
              />

              <Controller
                name="ngayBinhLuan"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="Date"
                      format="DD/MM/YYYY"
                      name="ngayBinhLuan"
                      views={["day", "month", "year"]}
                      onChange={(date) => {
                        setValue("ngayBinhLuan", date);
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <Controller
                name="saoBinhLuan"
                control={control}
                render={({ field }) => (
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend" fontWeight={600}>
                      Rating:
                    </Typography>
                    <Rating
                      name="saoBinhLuan"
                      value={field.value}
                      onChange={(event, newValue) =>
                        setValue("saoBinhLuan", newValue)
                      }
                    />
                  </Box>
                )}
              />
              <LoadingButton
                variant="contained"
                fullWidth
                color="warning"
                size="large"
                type="submit"
                loading={isPending}
              >
                Update
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default EditComments;

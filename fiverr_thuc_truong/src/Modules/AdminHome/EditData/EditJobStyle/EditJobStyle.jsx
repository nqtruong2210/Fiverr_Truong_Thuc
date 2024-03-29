import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EditDataActions } from "../../../../store/EditdataSlice/slice";
import { updateJobStyle } from "../../../../API/AdminTechnique";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  tenLoaiCongViec: yup.string().required("Vui Lòng Nhập Thông Tin"),
});

const EditJobStyle = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //tanstack
  const { mutate: handleUpdateJobStyle } = useMutation({
    mutationFn: (values) => updateJobStyle(values),
    onSuccess: () => {
      queryClient.invalidateQueries("GET_LIST_JOBSTYLE");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-jobstyle");
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      tenLoaiCongViec: data.tenLoaiCongViec,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });
  const onSubmit = (values) => {
    handleUpdateJobStyle(values);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="ID"
                {...field}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Typography sx={{ fontWeight: 600, paddingRight: 3 }}>
                        ID:
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="tenLoaiCongViec"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Name Job Style"
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Typography sx={{ fontWeight: 600, paddingRight: 3 }}>
                        Name:
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.tenLoaiCongViec)}
                helperText={
                  Boolean(errors.tenLoaiCongViec) &&
                  errors.tenLoaiCongViec.message
                }
              />
            )}
          />
          <LoadingButton
            sx={{ width: "180px" }}
            variant="contained"
            color="warning"
            size="large"
            type="submit"
          >
            Update
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default EditJobStyle;

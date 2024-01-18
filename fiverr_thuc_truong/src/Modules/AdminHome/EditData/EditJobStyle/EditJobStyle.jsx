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

import Swal from "sweetalert2";
import { EditDataActions } from "../../../../store/EditdataSlice/slice";
import { updateJobStyle } from "../../../../API/AdminTechnique";
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
        navigate("/admin/manage-jobstyle"),
        dispatch(EditDataActions.setEditClose());
    },
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      id: data.id,
      tenLoaiCongViec: data.tenLoaiCongViec,
    },
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
              />
            )}
          />
          <LoadingButton type="submit">Update</LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default EditJobStyle;

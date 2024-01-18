import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PATH } from "../../../Routes/path";
import ModalField from "../ModalField/ModalField";
import Search from "../Search/Search";
import { AddDataActions } from "../../../store/AddDataSlice/slice";

import { EditDataActions } from "../../../store/EditdataSlice/slice";
import { deleteJobStyle, getListJobStyle } from "../../../API/AdminTechnique";
import Swal from "sweetalert2";
import { ShowDataActions } from "../../../Store/ShowDataSlice/slice";


const ManageJobStyle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = ["id", "Name Job Style", ""];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");

  // tanstack
  const { data: listJobStyle = {} } = useQuery({
    queryKey: ["GET_LIST_JOBSTYLE", keyword, pageIndex, pageSize],
    queryFn: () => getListJobStyle(keyword, pageIndex, pageSize),
  });

  const { mutate: handleDeleteJobStyle } = useMutation({
    mutationKey: "DELETE_JOBSTYLE",
    mutationFn: (id) => deleteJobStyle(id),
    onSuccess: () => {
      queryClient.invalidateQueries("GET_LIST_JOBSTYLE");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  //
  const jobStylePagination = listJobStyle?.data;
  const count = Math.ceil(listJobStyle?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };
  //Action
  const handleAddJob = () => {
    dispatch(AddDataActions.setOpenAddJobStyle());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleShowInfo = (data) => {
    dispatch(ShowDataActions.setShowJobStyle(data));
  };
  const handleOpenEdit = (data) => {
    dispatch(EditDataActions.setEditJobStyle(data));
    navigate("/admin/edit-data");
  };
  return (
    <Box>
      <ModalField />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button onClick={handleAddJob}>Add Job Style</Button>
        <Search setKeyword={setKeyword}/>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                  >
                    {column}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobStylePagination?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.tenLoaiCongViec}</TableCell>

                  <TableCell sx={{ width: "21%" }}>
                    <Button
                      sx={{ minWidth: 0, padding: 1 }}
                      onClick={() => handleOpenEdit(item)}
                    >
                      <EditNoteIcon />
                    </Button>
                    <Button
                      sx={{ minWidth: 0, padding: 1 }}
                      onClick={() => handleDeleteJobStyle(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </Button>
                    <Button
                      sx={{ minWidth: 0, padding: 1 }}
                      onClick={() => handleShowInfo(item)}
                    >
                      <AccountCircleIcon color="success" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <Pagination
          count={count}
          page={pageIndex}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default ManageJobStyle;

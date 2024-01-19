import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PATH } from "../../../Routes/path";
import ModalField from "../ModalField/ModalField";
import { AddDataActions } from "../../../store/AddDataSlice/slice";
import Swal from "sweetalert2";
import { EditDataActions } from "../../../store/EditdataSlice/slice";
import {
  deleteJobDetails,
  getListJobStyleDetails,
} from "../../../API/AdminTechnique";
import { ShowDataActions } from "../../../store/ShowDataSlice/slice";
import "../../../Sass/admin/btnStyle.scss";

const ManageJobDetails = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();
  const [selectedValue, setSelectedValue] = useState();
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //
  const columns = ["id", "Group Name", "Image", "Group ID", "List Details", ""];
  //tanstack
  const { data: getListJobDetails = {} } = useQuery({
    queryKey: ["GET_LIST_JOB_STYLE_DETAILS", keyword, pageIndex, pageSize],
    queryFn: () => getListJobStyleDetails(keyword, pageIndex, pageSize),
  });
  const jobDetailsPagination = getListJobDetails?.data;
  const count = Math.ceil(getListJobDetails?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const { mutate: handleDeleteJobDetails } = useMutation({
    mutationKey: ["DELETE_JOB_STYLE_DETAILS"],
    mutationFn: (id) => deleteJobDetails(id),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Xóa Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        queryClient.invalidateQueries("GET_LIST_JOB_STYLE_DETAILS");
    },
  });
  //
  const handleSelectOnChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAddJobDetails = () => {
    dispatch(AddDataActions.setOpenAddJobDetails());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleOpenShowInfoJob = (data) => {
    dispatch(ShowDataActions.setShowJobDetails(data));
  };
  const handleOpenEdit = (data) => {
    dispatch(EditDataActions.setEditJobDetails(data));
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
        <button
          className="style-Btn"
          role="button"
          onClick={handleAddJobDetails}
        >
          <Box className="style-Btn-top text">Add Job Details</Box>
          <Box className="style-Btn-bottom" />
          <Box className="style-Btn-base" />
        </button>
        <Search setKeyword={setKeyword} />
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            marginY: 3,
          }}
        >
          <Table>
            <TableHead sx={{ background: "#ff6347" }}>
              <TableRow>
                {columns.map((column, index) => {
                  return <TableCell key={index}>{column}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {jobDetailsPagination?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell width={"15%"}>{item.tenNhom}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      <img
                        src={item.hinhAnh}
                        alt=""
                        style={{ width: 150, height: 150 }}
                      />
                    </TableCell>
                    <TableCell>{item.maLoaiCongviec}</TableCell>
                    <TableCell>
                      <TextField
                        onChange={handleSelectOnChange}
                        select
                        defaultValue={
                          item.dsChiTietLoai.length > 0
                            ? item.dsChiTietLoai[0].tenChiTiet
                            : ""
                        }
                      >
                        {item?.dsChiTietLoai?.map((option) => {
                          return (
                            <MenuItem value={option.tenChiTiet} key={option.id}>
                              {option.tenChiTiet}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="btn-Action btn-Action1"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <EditNoteIcon />
                      </Button>
                      <Button
                        className="btn-Action btn-Action2"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleDeleteJobDetails(item.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                      <Button
                        className="btn-Action btn-Action3"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenShowInfoJob(item)}
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
    </Box>
  );
};

export default ManageJobDetails;

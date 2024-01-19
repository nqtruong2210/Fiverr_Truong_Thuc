import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

import Search from "../Search/Search";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalField from "../ModalField/ModalField";
import { PATH } from "../../../Routes/path";
import dayjs from "dayjs";
import { AddDataActions } from "../../../store/AddDataSlice/slice";
import Swal from "sweetalert2";
import { EditDataActions } from "../../../store/EditdataSlice/slice";
import { deleteServices, getListService } from "../../../API/AdminTechnique";
import { ShowDataActions } from "../../../store/ShowDataSlice/slice";
import "../../../Sass/admin/btnStyle.scss";
import "../../../Sass/admin/tableStyle.scss";

const ManageServices = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    "id",
    "Code Job",
    "Code Renter",
    "Date of Hire",
    "status",
    "",
  ];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState();
  //tanstack
  const { data: listServices } = useQuery({
    queryKey: ["GET_LIST_SERVICES", keyword, pageIndex, pageSize],
    queryFn: () => getListService(keyword, pageIndex, pageSize),
  });

  const { mutate: handleDeleteService } = useMutation({
    mutationKey: ["DELETE_SERVICES"],
    mutationFn: (id) => deleteServices(id),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Xóa Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries("GET_LIST_SERVICES");
    },
  });
  //
  const servicesPagination = listServices?.data;
  const count = Math.ceil(listServices?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };
  //Action
  const handleAddServices = () => {
    dispatch(AddDataActions.setOpenAddServices());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleShowInfo = (data) => {
    dispatch(ShowDataActions.setShowServices(data));
  };
  const handleOpenEdit = (data) => {
    dispatch(EditDataActions.setEditJobServices(data));
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
        <button className="style-Btn" role="button" onClick={handleAddServices}>
          <Box className="style-Btn-top text">Add Services</Box>
          <Box className="style-Btn-bottom" />
          <Box className="style-Btn-base" />
        </button>
        <Search setKeyword={setKeyword} />
      </Box>
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
            {servicesPagination?.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.maCongViec}</TableCell>
                  <TableCell>{item.maNguoiThue}</TableCell>
                  <TableCell>
                    {dayjs(item.ngayThue).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {item.hoanThanh ? "Finish" : "Unfinish"}
                  </TableCell>
                  <TableCell sx={{ width: "21%" }}>
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
                      onClick={() => handleDeleteService(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </Button>
                    <Button
                      className="btn-Action btn-Action3"
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

export default ManageServices;

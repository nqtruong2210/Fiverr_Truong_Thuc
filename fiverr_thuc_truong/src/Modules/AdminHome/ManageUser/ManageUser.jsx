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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PATH } from "../../../Routes/path";
import ModalField from "../ModalField/ModalField";
import {
  deleteUserAPI,
  getListUserPagination,
} from "../../../API/AdminTechnique";
import Search from "../Search/Search";
import { AddDataActions } from "../../../store/AddDataSlice/slice";
import { EditDataActions } from "../../../store/EditdataSlice/slice";

import "../../../Sass/admin/btnStyle.scss";
import "../../../Sass/admin/tableStyle.scss";
import { ShowDataActions } from "../../../store/ShowDataSlice/slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "54%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
const ManageUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    "Name",
    "Email",
    "Gender",
    "Birthday",
    "Phone",
    "Role",
    "Action",
  ];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  //tanstack
  const queryClient = useQueryClient();
  const { data: getListPagination = {} } = useQuery({
    queryKey: ["LIST_USER_PAGINATION", keyword, pageIndex, pageSize],
    queryFn: () => getListUserPagination(keyword, pageIndex, pageSize),
  });
  console.log('getListPagination', getListPagination)
  const { mutate: handleDeleteUser } = useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: (userId) => deleteUserAPI(userId),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Xóa Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["LIST_USER_PAGINATION"]);
    },
  });

  //
  const userPagination = getListPagination?.data;
  const count = Math.ceil(getListPagination?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };
  //Action
  const handleAddAdmin = () => {
    dispatch(AddDataActions.setOpenAddUser());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleOpenEdit = (data) => {
    dispatch(EditDataActions.setEditUser(data));
    navigate("/admin/edit-data");
  };
  const handleShowInfo = (data) => {
    dispatch(ShowDataActions.setShowUser(data));
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 3,
        }}
      >
        <button className="style-Btn" role="button" onClick={handleAddAdmin}>
          <Box className="style-Btn-top text">Add Admin</Box>
          <Box className="style-Btn-bottom" />
          <Box className="style-Btn-base" />
        </button>

        <Search setKeyword={setKeyword} />
      </Box>
      <ModalField />
      <Box>
        <TableContainer
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
              {userPagination?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.gender ? "Nam" : "Nữ"}</TableCell>
                    <TableCell>
                      {dayjs(item.birthday).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.role}</TableCell>
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
                        onClick={() => handleDeleteUser(item.id)}
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
    </Box>
  );
};

export default ManageUser;

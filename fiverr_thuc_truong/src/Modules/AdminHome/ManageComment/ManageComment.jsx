import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalField from "../ModalField/ModalField";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Search from "../Search/Search";
import dayjs from "dayjs";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { PATH } from "../../../Routes/path";
import { AddDataActions } from "../../../store/AddDataSlice/slice";

import { EditDataActions } from "../../../store/EditdataSlice/slice";
import { deleteCommentAPI, getListCommentAPI } from "../../../API/AdminTechnique";
import { ShowDataActions } from "../../../Store/ShowDataSlice/slice";



const ManageComment = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");
  const queryClient = useQueryClient();
  const [selectedValue, setSelectedValue] = useState();
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //
  const columns = [
    "id",
    "Code Job",
    "commenter code ",
    "Date Of Comment",
    "Content",
    "Rating Comment",
    "",
  ];
  //tanstack
  const { data: getListComment = [] } = useQuery({
    queryKey: ["GET_LIST_COMMENT"],
    queryFn: getListCommentAPI,
  });

  const { mutate: handleDeleteComment } = useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: (id) => deleteCommentAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries("GET_LIST_COMMENT");
    },
  });

  // Action
  const handleAddComment = () => {
    dispatch(AddDataActions.setOpenAddComments());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleOpenShowInfoComment = (data) => {
    dispatch(ShowDataActions.setShowComment(data));
  };
  const handleOpenEdit = (data) => {
    dispatch(EditDataActions.setEditJobComment(data));
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
        <Button onClick={handleAddComment}>Add Comment</Button>
        <Search setKeyword={setKeyword} />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return <TableCell key={index}>{column}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {getListComment?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.maCongViec}</TableCell>
                    <TableCell>{item.maNguoiBinhLuan}</TableCell>
                    <TableCell>
                      {dayjs(item.ngayBinhLuan).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{item.noiDung}</TableCell>
                    <TableCell>
                      <Rating value={item.saoBinhLuan} readOnly />
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <EditNoteIcon />
                      </Button>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleDeleteComment(item.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                      <Button
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenShowInfoComment(item)}
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
      </Box>
    </Box>
  );
};

export default ManageComment;

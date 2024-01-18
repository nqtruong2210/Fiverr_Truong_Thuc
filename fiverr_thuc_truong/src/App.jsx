import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./Contexts/useContext/useContext";
import AuthLayout from "./Layouts/AuthLayout.jsx/AuthLayout";
import ClientLayout from "./Layouts/ClientLayout";
import SignIn from "./Modules/Auth/SignIn/SignIn";
import SignUp from "./Modules/Auth/SignUp/SignUp";
import Home from "./Modules/Home";
import ListJob from "./Modules/Jobs/ListJob";
import NotFound from "./Modules/NotFound";
import { PATH } from "./Routes/path";
import JobDetail from "./Modules/Job-Detail/Job-Detail";
import JobType from "./Modules/JobType";
import AdminLayout from "./Layouts/AdminLayout";
import ManageUser from "./Modules/AdminHome/ManageUser/ManageUser";
import ManaJob from "./Modules/AdminHome/ManageJob/ManaJob";
import Profile from "./Modules/AdminHome/Profile/Profile";
import EditData from "./Modules/AdminHome/EditData/EditData";
import ManageJobStyle from "./Modules/AdminHome/ManageJobStyle/ManageJobStyle";
import AddData from "./Modules/AdminHome/AddData/AddData";
import ManageJobDetails from "./Modules/AdminHome/ManageJobDetails/ManageJobDetails";
import ManageServices from "./Modules/AdminHome/ManageServices/ManageServices";
import ManageComment from "./Modules/AdminHome/ManageComment/ManageComment";
import AdminLogin from "./Modules/Auth/Admin/Login/AdminLogin";


function App() {
  return (
    <UserProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.HOME} element={<ClientLayout />}>
              <Route index element={<Home />} />
              <Route path={PATH.JOBS} element={<ListJob />} />
              <Route path={PATH.JOBDETAIL} element={<JobDetail />} />
              <Route path={PATH.JOBTYPE} element={<JobType />} />
            </Route>
            <Route path={PATH.HOME} element={<AuthLayout />}>
              <Route path={PATH.SIGNUP} element={<SignUp />} />
              <Route path={PATH.SIGNIN} element={<SignIn />} />
            </Route>
            <Route path={PATH.ADMIN} element={<AdminLayout />}>
              <Route path={PATH.MANAGE_USER} index element={<ManageUser />} />
              <Route path={PATH.MANAGE_JOB} element={<ManaJob />} />
              <Route path={PATH.PROFILE} element={<Profile />} />
              <Route path={PATH.EDIT_DATA} element={<EditData />} />
              <Route path={PATH.MANAGE_JOBSTYLE} element={<ManageJobStyle />} />
              <Route path={PATH.ADD_DATA} element={<AddData />} />
              <Route
                path={PATH.MANAGE_JOBDETAILS}
                element={<ManageJobDetails />}
              />
              <Route path={PATH.MANAGE_SERVICES} element={<ManageServices />} />
              <Route path={PATH.MANAGE_COMMENT} element={<ManageComment />} />
            </Route>
            <Route path={PATH.ADMIN_LOGIN} element={<AdminLogin />} />
            <Route path={PATH.NOTFOUND} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </UserProvider>
  );
}

export default App;

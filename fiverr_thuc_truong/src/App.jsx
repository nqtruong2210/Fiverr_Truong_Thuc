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

            <Route path={PATH.NOTFOUND} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </UserProvider>
  );
}

export default App;

import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, } from 'react-query'
import LogIn from './components/LogIn';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Forgotpass from './components/Forgotpass';
import ResetPass from './components/ResetPass';
import { ToastContainer } from 'react-toastify'
import AdminHomepage from './components/Admin/Adminhomepage';
import ManageUser from './components/Admin/ManageUser';
import ManageBlacklistVendor from './components/Admin/ManageBlacklistVendor';
import ManageBlacklistReq from './components/Admin/ManageBlacklistReq';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import { useJwt } from "react-jwt";

// import { useDispatch, useSelector } from 'react-redux';
// import { LoginAction } from './redux/reducersSlice/Loginslice';
import UserHomepage from './components/User/UserHomepage/Index';
import BlacklistedDetails from './components/User/UserHomepage/BlacklistedDetails/BlacklistedDetails';
// import axiosInstance from './config';

const queryClient = new QueryClient()



function App() {

  const [Role, setrole] = useState("");
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
  const location = useLocation();





  useEffect(() => {
    // console.log(decodedToken);
    setrole(decodedToken?.user?.Role)
  }, [decodedToken])

  return (

    <div className="App">
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>

          <Routes>

            <Route path="/" element={
              <Navigate to={"/login"} />
            }>
            </Route>

            <Route path="/login" element={<LogIn setrole={setrole} role={Role} location={location} />}></Route>
            <Route path="/forgotpass" element={<Forgotpass></Forgotpass>}></Route>
            <Route path="/resetpass" element={<ResetPass></ResetPass>}></Route>


            {Role === "Admin" && <Route Route path="/admin" element={<AdminHomepage ></AdminHomepage>}>

              <Route index element={<ManageUser />} />
              <Route path="blacklistvendor" element={<ManageBlacklistVendor />} />
              <Route path="blacklistreq" element={<ManageBlacklistReq />} />

            </Route>}

            {Role === "User" && <Route path="/user" element={<UserHomepage ></UserHomepage>}>
            </Route>}

            <Route path='/country/:code' element={<BlacklistedDetails />} />
            <Route path='*' element={<Navigate to={"/login"} />} />

          </Routes>
        </QueryClientProvider>
        <ToastContainer />
      </StyledEngineProvider>
    </div>


  );
}

export default App;

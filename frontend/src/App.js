import React, { useEffect, useState } from 'react';
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
import UserHomepage from './components/User/UserHomepage/Index';
import BlacklistedDetails from './components/User/UserHomepage/BlacklistedDetails/BlacklistedDetails';
import { useSelector } from 'react-redux';
import Reset from './components/Forgotpass/Reset';


let currentpatharr = []
const queryClient = new QueryClient()


function App() {

  const [Role, setrole] = useState("");
  const { decodedToken } = useJwt(localStorage.getItem("token"));
  const { pathname } = useLocation();
  const userlist = useSelector(state => state.Login.blacklistedvendorlist)

  if (currentpatharr.length < 1) {
    currentpatharr.push(pathname)
  }

  useEffect(() => {
    setrole(decodedToken?.role?._id)
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

            <Route path="/login" element={<LogIn setrole={setrole} role={Role} path={currentpatharr[0]} />}></Route>
            <Route path="/forgotpass" element={<Forgotpass></Forgotpass>}></Route>
            <Route path="/forgotpassword/:code" element={<Reset></Reset>}></Route>
            <Route path="/resetpass" element={<ResetPass></ResetPass>}></Route>


            {
              Role === 1 &&
              <Route path="/admin" element={<AdminHomepage ></AdminHomepage>}>

                <Route index element={<ManageUser />} />
                <Route path="blacklistvendor" element={<ManageBlacklistVendor />} />
                <Route path="blacklistreq" element={<ManageBlacklistReq />} />

              </Route>
            }

            {Role === 2 && <Route path="/user" element={<UserHomepage ></UserHomepage>}>
            </Route>}

            <Route path='/blacklist/:code' element={userlist?.length >= 1 ? <BlacklistedDetails /> : <Navigate to={"/login"}></Navigate>} />
            <Route path='*' element={<Navigate to={"/login"} />} />

          </Routes>
        </QueryClientProvider>
        <ToastContainer />
      </StyledEngineProvider>
    </div>


  );
}

export default App;

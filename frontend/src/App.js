
import './App.css';
import { QueryClient, QueryClientProvider, } from 'react-query'
import LogIn from './components/LogIn';
import { Routes, Route, Navigate } from "react-router-dom";
import Forgotpass from './components/Forgotpass';
import ResetPass from './components/ResetPass';
import { ToastContainer } from 'react-toastify'
import AdminHomepage from './components/Admin/Adminhomepage';
import ManageUser from './components/Admin/ManageUser';
import ManageBlacklistVendor from './components/Admin/ManageBlacklistVendor';
import ManageBlacklistReq from './components/Admin/ManageBlacklistReq';

const queryClient = new QueryClient()


function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>

          <Route path="/" element={<Navigate to={"/login"}></Navigate>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          <Route path="/forgotpass" element={<Forgotpass></Forgotpass>}></Route>
          <Route path="/resetpass" element={<ResetPass></ResetPass>}></Route>
          <Route path="/adminhomepage" element={<AdminHomepage></AdminHomepage>}>

            <Route index element={<ManageUser />} />
            <Route path="manageblacklistvendor" element={<ManageBlacklistVendor />} />
            <Route path="manageblacklistreq" element={<ManageBlacklistReq />} />


          </Route>

        </Routes>
      </QueryClientProvider>
      <ToastContainer />
    </div>

  );
}

export default App;

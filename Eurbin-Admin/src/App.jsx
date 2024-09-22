import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ManageReward from "./components/ManageReward";
import RewardRecord from "./components/RewardRecord";
import RequestReward from "./components/RewardRequest";
import AddReward from "./components/AddReward";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../Dashboard";
import Analytics from "../Analytics";
import './App.css';
import Transaction from "./components/Transaction";
import RecycleableData from "./components/RecycleableMaterialsData";
import EditRewards from "./components/EditReward";
import Instruction from "./components/Instruction";
import DashboardLayout from "./components/DashboardLayout";
import Activity from "./components/Activity";
import Analytics2 from "./components/Analytics2";
import VerifyEmail from "../verify";
import UserManagement from "./components/UserManagement";
import Layout2 from "../Layout2";
import BinStatus from "../BinStatus";
import About from "./components/About";
import ContentManagement from "./components/ContentManagement";

function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists in localStorage
  return isAuthenticated ? Component : <Navigate to="/Login" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected Routes */}
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Dashboard2" element={<PrivateRoute element={<DashboardLayout />} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Analytics2" element={<PrivateRoute element={<Analytics2 />} />} />

          <Route path="/" element={<PrivateRoute element={<Layout />} />}>
            <Route path="/home" element={<Home />} />
            <Route path="Record" element={<RewardRecord />} />
            <Route path="Manage" element={<ManageReward />} />
            <Route path="Add" element={<AddReward />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/Request" element={<RequestReward />} />
            <Route path="/Transaction" element={<Transaction />} />
            <Route path="/Recycleables" element={<RecycleableData />} />
            <Route path="/Edit" element={<EditRewards />} />
            <Route path="/ManageUser" element={<UserManagement />} />
            <Route path="/ContentManagement" element={<ContentManagement />} />
            
            <Route path="/Instruction" element={<Instruction />} />
            <Route path="/Activity" element={<Activity />} />

          </Route>

          <Route path="/" element={<PrivateRoute element={<Layout2 />} />}>
            <Route path="/BinStatus" element={<BinStatus />} />
            <Route path="/About" element={<About />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

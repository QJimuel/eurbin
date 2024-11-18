import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ManageReward from "./components/ManageReward";
import RewardRecord from "./components/RewardRecord";
import RequestReward from "./components/RewardRequest";
import AddReward from "./components/AddReward";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import './App.css';
import Transaction from "./components/Transaction";
import RecycleableData from "./components/RecycleableMaterialsData";
import EditRewards from "./components/EditReward";
import Instruction from "./components/Instruction";
import DashboardLayout from "./components/DashboardLayout";
import Activity from "./components/Activity";
import Analytics2 from "./components/Analytics2";
import VerifyEmail from "./components/verify";
import UserManagement from "./components/UserManagement";
import Layout2 from "./components/Layout2";
import BinStatus from "./components/BinStatus";
import About from "./components/About";
import ContentManagement from "./components/ContentManagement";
import DeactivatedUser from "./components/DeactivatedUser";
import About2 from "./components/About2";
import Activity2 from "./components/Activity2";
import ForgotPassword from "./components/ForgotPassword";
import { useState, useEffect } from 'react';

function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists in localStorage
  return isAuthenticated ? Component : <Navigate to="/Login" />;
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Check if token exists and is valid
    if (token) {
      // Decode the token to check expiration (if using JWT)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() >= payload.exp * 1000;

      if (isExpired) {
        localStorage.removeItem('token'); // Clear expired token
        window.location.href = '/Login'; // Redirect to login
      }
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


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
            <Route path="/DeactivatedUser" element={<DeactivatedUser />} />
            <Route path="/ContentManagement" element={<ContentManagement />} />
            
            <Route path="/Instruction" element={<Instruction />} />
            <Route path="/Activity" element={<Activity />} />

          </Route>

          <Route path="/" element={<PrivateRoute element={<Layout2 />} />}>
            <Route path="/BinStatus" element={<BinStatus />} />
            <Route path="/Activity2" element={<Activity2 />} />

           
          </Route>
          <Route path="/About2" element={<About2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

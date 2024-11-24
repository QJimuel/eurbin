import React, { useEffect, useState } from 'react';
import {useLocation, Link, Outlet } from "react-router-dom";
import logo from '../Images/EURBinLogo.png'
import dashboard from '../Images/speedometer1.png'
import analytics from '../Images/analysis1.png'
import userManagement from '../Images/people1.png'
import rewardManagement from '../Images/reward1.png'
import editProfile from '../Images/edit1.png'
import changePass from '../Images/padlock1.png'
import about from '../Images/information1.png'
import logOut from '../Images/exit1.png'
import content from '../Images/content1.png'

import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";

import ModalConfirmation from './ModalConfirmation';


function Layout() {
 
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [greetingName, setGreetingName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem('username');
    if (email) {
      setGreetingName(email);
    }
  }, []);
  
  const handleOpenEPModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEPModal = () => {
    setIsEditProfileModalOpen(false);
  };

  
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

  const handleOpenCPModal = () => {
    setIsChangePassModalOpen(true);
  };

  const handleCloseCPModal = () => {
    setIsChangePassModalOpen(false);
  };


const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);
  const handleLogout = () => setIsLogoutConfirmationOpen(true);
  const confirmLogout = () => {
    window.localStorage.clear();
    console.log("Token cleared");
    window.location.href = "./";  // Redirect to login page
  };
  const cancelLogout = () => setIsLogoutConfirmationOpen(false);



  return (
    <>
      <header className="header">
        <p className="header-title"></p>
        <p style={{  color: 'white', fontFamily: 'Poppins', fontSize: 20, fontWeight: 600 }}>Hello, {greetingName}!</p>
    
       
      </header>

      <div className="container">
      <aside style={styles.sidebar}>
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul style={styles.sidebarList}>
        <li style={styles.sidebarItem}>
          <Link 
            to="/Dashboard2" 
            className={location.pathname === "/Dashboard2" ? "active-page" : "inactive-page"} 
            style={{ display: "inline-flex", gap: "20px" }}>
            <img className="dashboardIcon" src={dashboard} alt="Dashboard Icon" />
            <span className="sidebarText">Dashboard</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
              to="/Analytics2" 
              className={location.pathname === "/Analytics2" ? "active-page" : "inactive-page"} 
              style={{ display: "inline-flex", gap: "20px" }}>
              <img className="analyticsIcon" src={analytics} alt="Analytics Icon" />
              <span className="sidebarText">Analytics</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
            to="/ManageUser" 
            className={location.pathname === "/ManageUser" || location.pathname === "/DeactivatedUser" ? "active-page" : "inactive-page"}
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="userMIcon" src={userManagement} alt="User Management Icon" />
            <span className="sidebarText">User Management</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
            to="/Manage" 
            className={location.pathname === "/Manage" || location.pathname === "/Request" || location.pathname === "/Transaction" || location.pathname === "/Activity" || location.pathname === "/Recycleables" || location.pathname === "/Edit" ? "active-page" : "inactive-page"}
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="rewardMIcon" src={rewardManagement} alt="Reward Management Icon" />
            <span className="sidebarText">Reward Management</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
            to="/ContentManagement" 
            className={location.pathname === "/ContentManagement" ? "active-page" : "inactive-page"} 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="contentMIcon" src={content} alt="Content Management Icon" />
            <span className="sidebarText">Content Management</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <a 
            onClick={handleOpenEPModal} 
            className="inactive-page" 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="editPIcon" src={editProfile} alt="Edit Profile Icon" />
            <span className="sidebarText">Edit Profile</span>
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <a 
            onClick={handleOpenCPModal} 
            className="inactive-page" 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="changePIcon" src={changePass} alt="Change Password Icon" />
            <span className="sidebarText">Change Password</span>
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
            to="/About" 
            className={location.pathname === "/About" ? "active-page" : "inactive-page"} 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="aboutIcon" src={about} alt="About Icon" />
            <span className="sidebarText">About</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <a 
            onClick={handleLogout} 
            className="inactive-page" 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="logoutIcon" src={logOut} alt="Logout Icon" />
            <span className="sidebarText">Logout</span>
          </a>
        </li>
        </ul>
      </aside> 
        <main className="main-content">
          <h2 className="main-title"></h2>
          <main style={styles.main}>
            <Outlet />
          </main>
        </main>
      </div>

    {/* EDIT PROFILE MODAL */}
    <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEPModal}
      
      />

      {/* CHANGE PASS MODAL */}
      <ChangePassModal
        isOpen={isChangePassModalOpen}
        onClose={handleCloseCPModal}
      />

      {/* LOGOUT CONFIRMATION MODAL */}
      <ModalConfirmation
        isOpen={isLogoutConfirmationOpen}
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}  // Confirm logout
        onCancel={cancelLogout}    // Cancel logout
      />
    </>
  );
}

const styles = {
  header: {
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginTop: "15%",
  },
  sidebar: {
    width: '213px',       // Fixed width
    minWidth: '213px',    // Ensures it cannot shrink below 230px
    maxWidth: '213px',    // Ensures it cannot grow beyond 230px
    height: '100vh',
    backgroundColor: '#800000',
    color: 'white',
    padding: '20px',
    paddingTop: '6vh',
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
  },
  sidebarItem: {
    paddingBottom: 10
  },
  sidebarLink: {
    color: 'white',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '20px',             
    cursor: "pointer",
  },
  logo: {
    fontSize: "24px",
    color: "black",
  },
  nav: {
    display: "flex",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "black",
  },
  main: {

  },
  title: {
    color: "darkred",
  },
};

export default Layout;

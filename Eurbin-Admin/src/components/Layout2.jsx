import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";
import dashboard from '../Images/speedometer1.png'
import editProfile from '../Images/edit1.png'
import changePass from '../Images/padlock1.png'
import about from '../Images/information1.png'
import logOut from '../Images/exit1.png'
import logo from '../Images/EURBinLogo.png'

import ModalConfirmation from './ModalConfirmation';

function Layout2() {

  const [greetingName, setGreetingName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem('username');
    if (email) {
      setGreetingName(email);
    }
  }, []);
  /*EDIT PROFILE*/
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const handleOpenEPModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEPModal = () => {
    setIsEditProfileModalOpen(false);
  };


  /*CHANGE PASS*/
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
    window.location.href = "./"; 
  };
  const cancelLogout = () => setIsLogoutConfirmationOpen(false);  

  return (
    <>

      <div className="container">
      <aside className="sidebard">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="logo" />
        </div>
          <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem}>
            <Link 
              to="/BinStatus" 
              className={location.pathname === "/BinStatus" || location.pathname === "/Activity2" ? "active-page" : "inactive-page"} 
              style={{ display: "inline-flex", gap: "20px" }}>
              <img className="dashboardIcon" src={dashboard} alt="Dashboard Icon" />
              <span className="sidebarText">Dashboard</span>
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
              to="/About2" 
              className={location.pathname === "/About2" ? "active-page" : "inactive-page"} 
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

      {/* LOGOUT CONFIRMATION MODAL */}
      <ModalConfirmation
        isOpen={isLogoutConfirmationOpen}
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}  // Confirm logout
        onCancel={cancelLogout}    // Cancel logout
      />

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


export default Layout2;
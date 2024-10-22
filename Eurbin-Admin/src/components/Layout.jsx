import React, { useState, useEffect } from "react";
import { Outlet, Link , Navigate} from "react-router-dom";

import user from '../Images/user.png'
import bottle from '../Images/bottle.png'
import co2 from '../Images/co2.png'
import point from '../Images/point.png'
import dashbboard from '../Images/speedometer.png'
import analytics from '../Images/analysis.png'
import userManagement from '../Images/people.png'
import rewardManagement from '../Images/reward.png'
import editProfile from '../Images/edit.png'
import changePass from '../Images/padlock.png'
import about from '../Images/information.png'
import logOut from '../Images/exit.png'
import content from '../Images/content.png'

import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";


function Layout() {
 
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [greetingName, setGreetingName] = useState('');

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



  const logout = ()=>
    {
      window.localStorage.clear();
      console.log("Token cleared");
      window.location.href = "./"
      console.log(window.localStorage.getItem('token'));
    }



  return (
    <>
      <header className="header">
        <p className="header-title">EURBin</p>
        <p style={{  color: 'white', fontFamily: 'Poppins', fontSize: 20, fontWeight: 600 }}>Hello, {greetingName}!</p>
    
       
      </header>

      <div className="container">
      <aside style={styles.sidebar}>
        <ul style={styles.sidebarList}>

        <li style={styles.sidebarItem}>
          <Link to="/Dashboard2" style={styles.sidebarLink}>
            <span role="img" aria-label="dashboard">
              <img className="icons" src={dashbboard}/>
            </span> 
            Dashboard
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/Analytics2" style={styles.sidebarLink}>
            <span role="img" aria-label="analytics">
              <img className="icons" src={analytics}/>
            </span> 
            Analytics
          </Link>
        </li>
        <li style={styles.sidebarItem}>
              <Link to="/ManageUser" style={styles.sidebarLink}>
                <span role="img" aria-label="instructions">
                  <img className="icons" src={userManagement}/>
                </span>
                User Management
              </Link>
            </li>
        <li style={styles.sidebarItem}>
          <Link to="/Manage" style={styles.sidebarLink}>
            <span role="img" aria-label="management">
              <img className="icons" src={rewardManagement}/>
            </span> Reward Management 
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/ContentManagement" style={styles.sidebarLink}>
            <span role="img" aria-label="management">
              <img className="icons" src={content}/>
            </span> Content Management
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <a onClick={handleOpenEPModal}  style={styles.sidebarLink}>
            <span role="img" aria-label="edit-profile">
              <img className="icons" src={editProfile}/>
            </span> Edit Profile
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <a onClick={handleOpenCPModal}  style={styles.sidebarLink}>
            <span role="img" aria-label="change-password">
              <img className="icons" src={changePass}/>
            </span> Change Password
          </a>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/About" style={styles.sidebarLink}>
            <span role="img" aria-label="about">
            <img className="icons" src={about}/>
            </span> About
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <a onClick= {logout}to="/" style={styles.sidebarLink}>
            <span role="img" aria-label="logout">
            <img className="icons" src={logOut}/>  
            </span> Logout
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
    width: '300px',
    height: '100vh',
    backgroundColor: '#800000',
    color: 'white',
    padding: '20px',
    paddingTop: "6vh",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
  },
  sidebarItem: {
    marginBottom: "20px",
  },
  sidebarLink: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginLeft: "20px",
    cursor: "pointer", // Add pointer cursor for clickable items
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

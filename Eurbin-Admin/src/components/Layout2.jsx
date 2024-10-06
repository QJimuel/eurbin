import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";
import dashbboard from '../Images/speedometer.png'
import analytics from '../Images/analysis.png'
import userManagement from '../Images/people.png'
import rewardManagement from '../Images/reward.png'
import editProfile from '../Images/edit.png'
import changePass from '../Images/padlock.png'
import about from '../Images/information.png'
import logOut from '../Images/exit.png'
import content from '../Images/content.png'

function Layout2() {
  /*EDIT PROFILE*/
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  // const [formData, setFormData] = useState({ name: "" });

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
        <h1 className="header-title">EURBin</h1>
      </header>

      <div className="container">
        <aside style={styles.sidebar}>
          <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem}>
            <Link to="/BinStatus" style={styles.sidebarLink}>
              <span role="img" aria-label="dashboard">
                <img className="icons" src={dashbboard}/>
              </span> 
              Bin Status
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
    width: "300px",
    height: "100vh",
    backgroundColor: "#800000",
    color: "white",
    padding: "20px",
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


export default Layout2;
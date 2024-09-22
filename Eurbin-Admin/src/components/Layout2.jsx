import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";

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

  return (
    <>
      <header className="header">
        <h1 className="header-title">LAYOUT2</h1>
      </header>

      <div className="container">
        <aside style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem}>
              <Link to="/BinStatus" style={styles.sidebarLink}>
                <span role="img" aria-label="bin-status">
                  🗑️
                </span>{" "}
                Bin Status
              </Link>
            </li>
            <li style={styles.sidebarItem}>
              <a onClick={handleOpenEPModal} style={styles.sidebarLink}>
                <span role="img" aria-label="edit-profile">
                  ✏️
                </span>{" "}
                Edit Profile
              </a>
            </li>
            <li style={styles.sidebarItem}>
              <a onClick={handleOpenCPModal} style={styles.sidebarLink}>
                <span role="img" aria-label="change-password">
                  🔒
                </span>{" "}
                Change Password
                </a>
            </li>
            <li style={styles.sidebarItem}>
              <Link to="/About" style={styles.sidebarLink}>
                <span role="img" aria-label="about">
                  ❔
                </span>{" "}
                About
              </Link>
            </li>
            <li style={styles.sidebarItem}>
              <Link to="/Login" style={styles.sidebarLink}>
                <span role="img" aria-label="logout">
                  🚪
                </span>{" "}
                Logout
              </Link>
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
    opacity: 0.94,
    color: "white",
    padding: "20px",
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
    padding: "20px",
  },
  title: {
    color: "darkred",
  },
};

export default Layout2;

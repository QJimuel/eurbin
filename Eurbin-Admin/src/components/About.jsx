import { Outlet, Link } from "react-router-dom";
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

import { useEffect, useState } from 'react';
import axios from 'axios';

import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";


function About() {
    
  
      const logout = ()=>
        {
          window.localStorage.clear();
          console.log("Token cleared");
          window.location.href = "./"
          console.log(window.localStorage.getItem('token'));
        }
  
  
        const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    
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

    return (
        <>

<header className="header">
        <h1 className="header-title">EURBin</h1>
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
          <a onClick= {logout}to="/Login" style={styles.sidebarLink}>
            <span role="img" aria-label="logout">
            <img className="icons" src={logOut}/>  
            </span> Logout
          </a>
        </li>
        </ul>
      </aside>


        <div style={styles.container}>
        <div style={styles.about}>
            <div style={styles.aboutText}>
                <h1 style={styles.header1}>About EURBin</h1>
                <p style={styles.paragraph1}>
                    EURBin is an innovative solution aimed at promoting sustainable waste management through the use of IoT technology. This smart bin accepts plastic bottles and rewards users with Smart Points (SP) that can be exchanged for tangible rewards at the MSEUF Health and Safety Office.
                </p>
            </div>
            <div style={styles.aboutImage}>
                <img src={bottle} style={styles.image} />
            </div>
        </div>

        <div style={styles.instructionContent}>
          <h2 style={styles.subHeader}>How to Use EURBin</h2>
          <div style={styles.iContentScrollable}>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 1</b>
              <p style={styles.stepP} >Locate the EURBin.</p>
            </div>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 2</b>
              <p style={styles.stepP} >Deposit your plastic bottle into the bin.</p>
            </div>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 3</b>
              <p style={styles.stepP}>Receive a redeemable code displayed on the bin.</p>
            </div>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 4</b>
              <p style={styles.stepP}>Open the EURBin mobile app.</p>
            </div>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 5</b>
              <p style={styles.stepP}>Enter the redeemable code to earn Smart Points (SP).</p>
            </div>
            <div style={styles.step}>
              <img src={bottle} style={styles.iImage} />
              <b>Step 6</b>
              <p style={styles.stepP}>Exchange your Smart Points for exciting rewards!</p>
            </div>
          </div>
        </div>

            <h2 style={styles.subHeader}>Benefits of Using EURBin</h2>
            <p style={styles.paragraph}>
                By using EURBin, you contribute to reducing plastic waste, promoting recycling, and fostering a sustainable environment. Every bottle recycled brings us one step closer to a cleaner planet!
            </p>

            <h2 style={styles.subHeader}>FAQs</h2>
            <ul style={styles.paragraph}>
                <li><strong>What types of bottles can be recycled?</strong> Any plastic bottle that is accepted by the EURBin.</li>
                <li><strong>How do I redeem my Smart Points?</strong> Simply enter the code in the mobile app to get your rewards.</li>
            </ul>

            <h2 style={styles.subHeader}>Contact Us</h2>
            <p style={styles.paragraph}>
                For more information or support, please contact us at: <a href="mailto:eurbinmmq@gmail.com">support@eurbin.com</a>
            </p>

            <h2 style={styles.subHeader}>Future Plans</h2>
            <p style={styles.paragraph}>
                We plan to expand EURBin to more locations and introduce new features in our app to enhance user experience.
            </p>

            <h2 style={styles.subHeader}>Meet the Team</h2>
            <p style={styles.paragraph}>
                Our team is composed of passionate individuals dedicated to making a difference in waste management and environmental sustainability.
            </p>
        </div>
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
  container: {
    maxHeight: '90vh', // Limit the height for scrollability
    overflowY: 'auto', // Enable vertical scrolling
    width: '86%',
    overflowX: 'hidden',
    paddingLeft: "5%"
  },
  about: {
      display: 'flex',
      justifyContent: 'space-between',  
      alignItems: 'center',             
      marginTop: '5vh',
  },
  aboutText: {
      flexBasis: '50%',
   
  },
  aboutImage: {
      flexBasis: '50%',  
      marginRight: '-10vw',
  },
  header: {
      fontSize: '36px',
      color: '#800000',
      fontWeight: '900',  
      marginBottom: '20px',
  },
  header1: {
      fontSize: '3vw',
      fontFamily: 'Poppins',
      color: '#800000',
      fontWeight: '600',  
      marginBottom: '20px',
  },
  subHeader: {
    fontSize: '2vw',
    marginTop: '2vw',
    color: '#800000',
  },
  
  /*INSTRUCCTION CSS*/
  instructionContent: {
    marginLeft: '0%',
    marginTop: '3%',
    overflowY: 'hidden', // Keep vertical scroll
    overflowX: 'hidden', // Hide horizontal scroll
    marginBottom: '10vh',
  },
  iContentScrollable: {
    display: 'flex',         
    flexWrap: 'nowrap',        
    overflowX: 'auto',         
    scrollbarWidth: 'none',
    fontSize: '1.5vw',
    marginTop: '5vh',
    width: '90%',
  },
  step: {
    minWidth: '35%',     
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  stepP: {
    marginLeft: 30,
  },
  iImage: {
    width: '100%',         
     maxHeight: '80%',
    marginBottom: '3vh',
  },
  /*END INSTRUCCTION CSS*/
  
  paragraph1: {
      fontSize: '1.5vw',
      fontWeight: '600',
  },
  paragraph: {
      fontSize: '1.3vw',
      color: '#555',
      lineHeight: '1.6',
  },
  image: {
      maxWidth: '80%',    
      height: 'auto',
  },
  sidebar: {
    width: '257px',
    height: '100vh',
    backgroundColor: '#800000',
    color: 'white',
    padding: '20px',
    paddingTop: "6vh",
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
  },
  sidebarItem: {
    marginBottom: '20px',
  },
  sidebarLink: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',             
    marginLeft: '20px',
    cursor: "pointer",
  },
  logo: {
    fontSize: '24px',
    color: 'black',
  },
  nav: {
    display: 'flex',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '10px',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'black',
  },
  main: {
    padding: '20px',
  },
  title: {
    color: 'darkred',
  },
  
  // header: {
  //     textAlign: 'center',
  //     fontSize: '2.5em',
  //     marginBottom: '20px',
  //     color: '#800000',
  // },   
};

export default About;

import { Outlet, Link } from "react-router-dom";
import user1 from '../Images/user.png'
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

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { colors } from "@mui/material";


function DashboardLayout() {
  const API_URL = 'https://eurbin.vercel.app/transactions';
  const total_API_URL = 'https://eurbin.vercel.app/total/highest';
  const user_API_URL = 'https://eurbin.vercel.app/user';

  const [transactions, setTransactions] = useState([]);
  const [totals, settotals] = useState({});
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    fetchTotal();
    fetchUser();
  }, []);

  const fetchTotal = async () => {
    try {
      const response = await axios.get(total_API_URL);
      if (response.status === 200 && response.data.highestTotals) {
        // Set the state with the highestTotals object
        settotals(response.data.highestTotals);
      } else {
        console.error('Unexpected data format:', response.data);
        alert('An error occurred: Unexpected data format');
      }
    } catch (err) {
      console.error('Error fetching totals:', err);
      alert('An error occurred while fetching totals');
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(user_API_URL);
    
      if (response.status === 200 && response.data.users) {

        const activeUsers = response.data.users.filter(user => user.isActive);
            setUser(activeUsers);
    
      } else {
        console.error('Unexpected data format:', response.data);
        alert('An error occurred: Unexpected data format');
      }
    } catch (err) {
      console.error('Error fetching totals:', err);
      alert('An error occurred while fetching totals');
    }
  };


  useEffect(() => {
    fetchTransactions();
  }, []);

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(API_URL);
          if (response.status === 200 && Array.isArray(response.data.transactions)) {
            setTransactions(response.data.transactions.filter(transaction => transaction.isAccepted === true || transaction.isAccepted === false));
          } else {
            console.error('Unexpected data format:', response.data);
            alert('An error occurred: Unexpected data format');
            }
          } catch (err) {
            console.error('Error fetching transactions:', err);
            alert('An error occurred while fetching transactions');
          }
    };

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

      
      const getDepartmentData = () => {
        const departmentCounts = {
          CCMS: 0,
          CIHTM: 0,
          CNAS: 0,
          CME: 0,
          CCJC: 0,
          CAS: 0,
          CED: 0,
        };
    
        user.forEach(u => {
          if (departmentCounts[u.department] !== undefined) {
            departmentCounts[u.department]++;
          }
        });
    
        // Prepare data for the pie chart
        return Object.entries(departmentCounts).map(([department, count]) => ({
          name: department,
          value: count,
        }));
      };
    
      const departmentData = getDepartmentData();

      const percentComputaion = () => {
        const percent = Math.ceil((totals.highestTotalBottle / 500) * 100); 
        return `${percent}%`; // Return as a string with a percentage sign
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

      

        <div className="dashboardBox">

          <div className="rmdHeaders1">

            <h1 className="dHeader"> Dashboard </h1>
              
            <div className="pasokLang">
            <h1 className="dTitle">EURBin Status:</h1>
              <div style={styles.binLevelStyle}>
                
                  <div style={styles.binPercentStyle}>
                      <p style={styles.percent}>{percentComputaion()}</p>
                  </div>
              </div>


            </div>
          
           

          </div>

          

            <div className="dbParent">

                <div className="dashboardBox1">
                <div className="dbox">
                    <img src={user1} alt="" />
                    <div>
                    <b>{totals.highestTotalUser}</b>
                    <p>Total Users</p>
                    </div>
                </div>
                </div>

                <div className="dashboardBox1">
                <div className="dbox">
                    <img src={bottle} alt="" />
                    <div>
                    <b>{totals.highestTotalBottle}</b>
                    <p>Total Bottles</p>
                    </div>
                </div>
                </div>

                <div className="dashboardBox1">
                <div className="dbox">
                    <img src={co2} alt="" />
                    <div>
                    <b> {totals.highestTotalCo2} kg</b>
                    <p>Total CO₂</p>
                    </div>
                </div>
                </div>

                <div className="dashboardBox1">
                <div className="dbox">
                    <img src={point} alt="" />
                    <div>
                    <b>{totals.highestTotalSmartPoints}</b>
                    <p>Total Points</p>
                    </div>
                </div>
                </div>

            </div>
            


            <div className="dataBox">
        
            
            <div className="userActivityBox">
              <h1 className="dTitle">Recent Transaction</h1>

                


          <table className="uaTable2">
          <thead>
              <tr className="uaGrey">
                <th className="tableHead">User ID</th>
                <th className="tableHead">Reward Name</th>
                <th className="tableHead">Price</th>
                <th className="tableHead">Reference No.</th>
                <th className="tableHead" >Status</th>
              </tr>
          </thead>

          </table>
            
            <div className="uaContainer">
              

                <table className="uaTable">
                   
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.userId}</td>
                                <td>{transaction.transactionName}</td>
                                <td>{transaction.transactionPrice}</td>
                                <td>{transaction.referenceNo}</td>
                                <td className="action-buttons">
                                      {transaction.isAccepted === true ? (
                                          <span className="status" style={{ color: '#4CAF50' }}>Accepted</span>
                                      ) : transaction.isAccepted === false ? (
                                          <span className="status" style={{ color: '#F44336' }}>Declined</span>
                                      ) : (
                                          <span className="status">Pending</span>
                                      )}
                                  </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            </div>  







          <div style={{ width: '100%', height: 300, justifyContent:'center', textAlign:'center'}}>
            <h3>User Distribution by Department</h3>
            <ResponsiveContainer>
              
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={110
                  }
                  dataKey="value"
                >
                  {
                    departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9f40', '#4bc0c0', '#36a2eb'][index % 7]} />
                    ))
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

         
        
        
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


        
       
    </div>
    

    
    </>
  );
}


const styles = {
  header: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    marginTop: '15%', 
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
  binLevelStyle:{
    padding: '1%',
    height: '30px',
    width: '130px',
    borderRadius: '10px',
    border: 'solid 1px black',
  },

  binPercentStyle:{
    display: 'flex',
    height: '100%',
    width:'80%',
    backgroundColor: '#800000',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  percent:{
    color: 'white'
  }
};

export default DashboardLayout;

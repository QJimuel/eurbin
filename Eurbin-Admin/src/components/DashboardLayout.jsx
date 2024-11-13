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
  const collected_API_URL = 'http://localhost:7000/collected'; 

  const [transactions, setTransactions] = useState([]);
  const [totals, settotals] = useState({});
  const [user, setUser] = useState([]);
  const [greetingName, setGreetingName] = useState('');
  const [collectedOffset, setCollectedOffset] = useState(0);
  const MAX_BOTTLES = 500;
  const [collectedData, setCollectedData] = useState([]);

  useEffect(() => {
    fetchTotal();
    fetchUser();
    fetchCollectedData();
    const email = localStorage.getItem('username');
    if (email) {
      setGreetingName(email);
    }
  }, []);


  const [error, setError] = useState(null);


    const fetchCollectedData = async () => {

      
    
      
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await axios.get(collected_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        
        if (response.status === 200 && response.data.collectedBottles) {
          // Extract the collectedBottles array
          const collectedBottles = response.data.collectedBottles;
          console.log('Collected Bottles:', collectedBottles);
          // Calculate the difference in bottle count for each entry
          const formattedData = collectedBottles.map((item, index) => {
            const previousBottleCount = index > 0 ? collectedBottles[index - 1].bottleCount : 0;
            const bottleCountDifference = item.bottleCount - previousBottleCount;
            
            return {
              date: new Date(item.date).toLocaleDateString(),
              bottleCountDifference: bottleCountDifference, // Difference between current and previous bottleCount
            };
          });
          console.log('Formatted Data:', formattedData);
          // Assuming you're setting the state here
          setCollectedData(formattedData);
        } else {
          console.error('Unexpected data format:', response.data);
          alert('An error occurred: Unexpected data format');
        }
      } catch (err) {
        console.error('Error fetching collected data:', err);
        alert('An error occurred while fetching collected data');
      }
    };


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
      const token = localStorage.getItem('token'); // Adjust this according to your implementation

      const response = await axios.get(user_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
    
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
        const storedOffset = Number(localStorage.getItem('collectedOffset')) || 0;
        const effectiveTotal = Math.max(0, totals.highestTotalBottle - storedOffset);
        const percent = Math.min(100, Math.ceil((effectiveTotal / MAX_BOTTLES) * 100));
        return `${percent}%`;
    };
      
    
    
      
      
      const handleCollectedClick = async () => {
        const token = localStorage.getItem('token');
        try {
            // Prepare the payload with collectedOffset as bottleCount
            const newBottles = totals.highestTotalBottle - collectedOffset;
       
            const payload = {
                bottleCount: newBottles,
            };
    
            // Send POST request to /collected endpoint
            const response = await fetch('https://eurbin.vercel.app/collected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Bottle data saved:', data); // Log the response for confirmation

            setCollectedOffset(totals.highestTotalBottle);
            localStorage.setItem('collectedOffset', totals.highestTotalBottle);
    
            // Optionally, you can update the collectedOffset or any other state based on the response here.
        } catch (error) {
            console.error('Error posting collected bottles:', error.message);
        }
    };
    
    
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
              <button onClick={handleCollectedClick}>Collected</button>

              


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
        
            {/*
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




  */}
         <div style={{ width: '100%', height: 300, justifyContent:'center', textAlign:'center'}}>
<h3>Collected Bottle Counts from Bins</h3>
<ResponsiveContainer width="100%" height={350}>
      <BarChart data={collectedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bottleCountDifference" fill={colors.blue[500]} />
      </BarChart>
    </ResponsiveContainer>
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

            <div style={{ width: '100%', height: '350px', position: 'absolute', bottom: '0', zIndex: -1 }}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgba(239, 64, 64, 1)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 255)', stopOpacity: .1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad1)" d="M0,288L48,272C96,256,192,224,288,192C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,112C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
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
    width: '253px',
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

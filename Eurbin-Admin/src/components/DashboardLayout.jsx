import { Outlet, Link, useLocation } from "react-router-dom";
import logo from '../Images/EURBinLogo.png'
import user1 from '../Images/user.png'
import bottle from '../Images/bottle.png'
import co2 from '../Images/co2.png'
import point from '../Images/point.png'
import dashboard from '../Images/speedometer1.png'
import analytics from '../Images/analysis1.png'
import userManagement from '../Images/people1.png'
import rewardManagement from '../Images/reward1.png'
import editProfile from '../Images/edit1.png'
import changePass from '../Images/padlock1.png'
import about from '../Images/information1.png'
import logOut from '../Images/exit1.png'
import content from '../Images/content1.png'
import ModalConfirmation from './ModalConfirmation';
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
  ScatterChart,
  Scatter
} from 'recharts';
import { colors } from "@mui/material";




function DashboardLayout() {
  const API_URL = 'https://eurbin.vercel.app/transactions';
  const total_API_URL = 'https://eurbin.vercel.app/total/highest';
  const user_API_URL = 'https://eurbin.vercel.app/user';
  const collected_API_URL = 'https://eurbin.vercel.app/collected'; 
  const BOTTLES_API_URL = 'https://eurbin.vercel.app/bottles';

  const [transactions, setTransactions] = useState([]);
  const [totals, settotals] = useState({});
  const [user, setUser] = useState([]);
  const [greetingName, setGreetingName] = useState('');
  const [collectedOffset, setCollectedOffset] = useState(0);
  const MAX_BOTTLES = 100;
  const [collectedData, setCollectedData] = useState([]);
  const location = useLocation();
  const [smallBottleCount, setSmallBottleCount] = useState(0);
  const [largeBottleCount, setLargeBottleCount] = useState(0);
  const [notBotlleCount, setNotBottle] = useState(0);
  const [hoverCollect, setHoverCollect] = useState(false);


  const [selectedOption, setSelectedOption] = useState('perMonth');
  useEffect(() => {
    fetchTotal();
    fetchUser();
    
    fetchBottleData();
    notifyIfBinFull();
    const email = localStorage.getItem('username');
    if (email) {
      setGreetingName(email);
    }

  }, []);

  useEffect(() => {
    // Fetch data based on selected option
    if (selectedOption === 'perMonth') {
        fetchCollectedDataPerMonth();
    } else {
        fetchCollectedData();
    }
}, [selectedOption]);

  const fetchBottleData = async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get(BOTTLES_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        console.log(response.data);  // Log the response to ensure the format
        if (response.status === 200 && Array.isArray(response.data.bottles)) {  // Access bottles array
            const smallBottles = response.data.bottles.filter(bottle => bottle.Size === 'Small').length;
            const largeBottles = response.data.bottles.filter(bottle => bottle.Size === 'Large').length;
            const notBottles = response.data.bottles.filter(bottle => bottle.Size === 'Not Plastic Bottle').length;

            setSmallBottleCount(smallBottles);
            setLargeBottleCount(largeBottles);
            setNotBottle(notBottles);
        } else {
            console.error('Unexpected data format:', response.data);
            alert('An error occurred: Unexpected data format');
        }
    } catch (err) {
        console.error('Error fetching bottle data:', err);
        alert('An error occurred while fetching bottle data');
    }
};


  const [error, setError] = useState(null);

  
  const fetchCollectedDataPerMonth = async () => {
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

            // Find the latest bottleCount from collectedBottles
            const latestBottleCount = collectedBottles.length
                ? collectedBottles.reduce((latest, item) =>
                    new Date(item.date) > new Date(latest.date) ? item : latest
                  ).bottleCount
                : 0;

            // Save the latest bottleCount to localStorage
            localStorage.setItem('collectedOffset', latestBottleCount);
            console.log('Updated collectedOffset in localStorage:', latestBottleCount);

            // Group by month and year, keeping the latest entry for each month
            const groupedData = collectedBottles.reduce((acc, item) => {
                const date = new Date(item.date);
                const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format as "MM-YYYY"

                // Store only the latest bottleCount for each month
                if (!acc[monthYear] || new Date(acc[monthYear].date) < new Date(item.date)) {
                    acc[monthYear] = {
                        date: item.date,
                        bottleCount: item.bottleCount,
                    };
                }
                return acc;
            }, {});

            // Format the grouped data for the chart, calculating the bottleCount difference
            let previousMonthCount = 0;
            const formattedData = Object.keys(groupedData).map(monthYear => {
                const [month, year] = monthYear.split('-');
                const currentBottleCount = groupedData[monthYear].bottleCount;

                // Calculate the difference for the current month
                const bottleCountDifference = previousMonthCount === 0 ? currentBottleCount : currentBottleCount - previousMonthCount;

                // Update the previous month count for the next iteration
                previousMonthCount = currentBottleCount;

                return {
                    date: `${month}-${year}`,  // "MM-YYYY" format
                    bottleCountDifference: bottleCountDifference,  // Difference in bottle count
                };
            });

            console.log('Formatted Data:', formattedData);
            // Update the state with the formatted data
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


const fetchCollectedData = async () => {
  try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await axios.get(collected_API_URL, {
          headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
      });

      if (response.status === 200 && response.data.collectedBottles) {
          const collectedBottles = response.data.collectedBottles;
          console.log('Collected Bottles:', collectedBottles);

          // Find the latest bottleCount and store it in localStorage
          const latestBottleCount = collectedBottles.length
              ? collectedBottles.reduce((latest, item) =>
                  new Date(item.date) > new Date(latest.date) ? item : latest
                ).bottleCount
              : 0;

          localStorage.setItem('collectedOffset', latestBottleCount);
          console.log('Updated collectedOffset in localStorage:', latestBottleCount);

          // Map collected data directly for chart
          let previousBottleCount = 0;
          const formattedData = collectedBottles.map((item) => {
              const date = new Date(item.date).toLocaleDateString(); // Format as readable date
              const bottleCountDifference = previousBottleCount === 0 
                  ? item.bottleCount 
                  : item.bottleCount - previousBottleCount;

              previousBottleCount = item.bottleCount;

              return {
                  date, // Format: "MM/DD/YYYY"
                  bottleCountDifference,
              };
          });

          console.log('Formatted Data:', formattedData);
          setCollectedData(formattedData); // Update the state with formatted data
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
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get(total_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
          },
        });
    
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


  /*useEffect(() => {
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
    };  */
    const handleLogout = () => setIsLogoutConfirmationOpen(true); 
    const confirmLogout = () => {
      window.localStorage.clear();
      console.log("Token cleared");
      window.location.href = "./";  // Redirect to login page
    };
    const cancelLogout = () => setIsLogoutConfirmationOpen(false);


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
          CME: 0,
          CCJC: 0,
          CAS: 0,
          CED: 0,
          CNAHS: 0,
          CAFA: 0,
          CENG: 0,
          CBA:0
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

      const percentComputation = () => {
        const storedOffset = Number(localStorage.getItem('collectedOffset')) || 0;
        const effectiveTotal = Math.max(0, (smallBottleCount + largeBottleCount + notBotlleCount) - storedOffset);
        const percent = Math.min(100, Math.ceil((effectiveTotal / MAX_BOTTLES) * 100));
        
        console.log(percent);
    
    
        return `${percent}%`;
    };

    const notifyIfBinFull = async () => {
      const percent = percentComputation(); // Call the synchronous function
  
      if (percent == "80%") {
          try {
              await axios.post('https://eurbin.vercel.app/admin/notify-bin-full');
              console.log('Admins notified about bin being almost full.');
          } catch (error) {
              console.error('Failed to notify admins:', error);
          }
      }
  };

    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

    const handleConfirm = () => {
      setIsConfirmationModalOpen(true); 
    };
  
    const handleCancel = () => {
        setIsConfirmationModalOpen(false); 
    };
      
    

    
    
      
      
      const handleCollectedClick = async () => {
        const token = localStorage.getItem('token');
        try {
            // Prepare the payload with collectedOffset as bottleCount
            const newBottles = (smallBottleCount + largeBottleCount + notBotlleCount) - collectedOffset;
       
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
            setIsConfirmationModalOpen(false);
    
            setCollectedOffset((smallBottleCount + largeBottleCount + notBotlleCount ));
            localStorage.setItem('collectedOffset', (smallBottleCount + largeBottleCount + notBotlleCount));
    
            // Optionally, you can update the collectedOffset or any other state based on the response here.
        } catch (error) {
            console.error('Error posting collected bottles:', error.message);
        }
    };
    
    
  return (
    <>


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
            className={location.pathname === "/ManageUser" ? "active-page" : "inactive-page"} 
            style={{ display: "inline-flex", gap: "20px", alignItems: "center" }}>
            <img className="userMIcon" src={userManagement} alt="User Management Icon" />
            <span className="sidebarText">User Management</span>
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link 
            to="/Manage" 
            className={location.pathname === "/Manage" ? "active-page" : "inactive-page"} 
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

        <div className="dashboardBox">
        <header className="header">
        <p className="header-title"></p>
        <p style={{  color: 'white', fontFamily: 'Poppins', fontSize: 20, fontWeight: 600, paddingTop: '10px' }}></p>
        </header>

          <div className="rmdHeaders1">

            <h1 className="dHeader"> Dashboard </h1>
              
            <div className="pasokLang">
            <h1 className="dTitle">EURBin Status:</h1>
            <div style={styles.binLevelStyle}>
              <p style={styles.percent}>{percentComputation()}</p>
                <div 
                    style={{
                        ...styles.binPercentStyle, 
                        width: `${percentComputation()}` // Adjust width dynamically
                    }}
                > 
                </div>
            </div>

            <button 
              onClick={handleConfirm}
              style={
                  percentComputation() === '0%' 
                      ? { ...styles.collectButton, ...styles.disabledButton } 
                      : hoverCollect 
                          ? { ...styles.collectButton, ...styles.collectButtonHover } 
                          : styles.collectButton
              }
              onMouseEnter={() => setHoverCollect(true)}
              onMouseLeave={() => setHoverCollect(false)}
              disabled={percentComputation() === '0%'}
              >
                  {percentComputation() === '0%' ? 'Collected' : 'Collect'}
              </button>  
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
            <b>{smallBottleCount + largeBottleCount}</b>
            <p>Total Bottles</p>
        </div>
    </div>
</div>

<div className="dashboardBox1">
    <div className="dbox">
        <img src={co2} alt="" />
        <div>
            <b>  {(
                    smallBottleCount * 0.1 + 
                    largeBottleCount * 0.2
                ).toFixed(2)}{" "}
                kg</b>
            <p>Total CO₂</p>
        </div>
    </div>
</div>

<div className="dashboardBox1">
    <div className="dbox">
        <img src={point} alt="" />
        <div>
            <b>{Number(totals.highestTotalSmartPoints).toFixed(2)}</b>
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

  <div style={{ width: '80%', height: 300, justifyContent: 'center', textAlign: 'center' }}>
    <h3>Collected Waste Counts</h3>
    <div className="sort-container" style={{ marginBottom: '10px', marginRight: '260px' }}>
                <label htmlFor="dataType">Waste: </label>
                <select
                    id="dataType"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="perMonth">Per Month</option>
                    <option value="perCollected">Per Collected</option>
                </select>
            </div>

    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={collectedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {/* Remove CartesianGrid to hide the grid */}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={({ payload }) => {
                if (payload && payload.length) {
                    return (
                        <div className="custom-tooltip">
                            <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                        </div>
                    );
                }
                return null;
            }} />
            <Legend />
            <Bar 
                dataKey="bottleCountDifference" 
                fill="#8884d8" 
                barSize={30} // Adjust the width of the bars
                name= "Waste Count"
            />
        </BarChart>
    </ResponsiveContainer>
</div>





          <div style={{ width: '60%', height: 300, justifyContent:'center', textAlign:'center'}}>
            <h3>User Distribution by Department</h3>
            <ResponsiveContainer>
    <PieChart>
        <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
                percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
            }
            outerRadius={110}
            dataKey="value"
            stroke="#ffffff" // White stroke for segment separation
            strokeWidth={2}
        >
            {departmentData.map((entry, index) => (
                <Cell
                    key={`cell-${index}`}
                    fill={[
                        '#ff6384', // Red
                        '#36a2eb', // Blue
                        '#cc65fe', // Purple
                        '#ffce56', // Yellow
                        '#ff9f40', // Orange
                        '#4bc0c0', // Teal
                        '#9966ff', // Violet
                        '#ff5a5e', // Coral Red
                        '#5ad3d1', // Cyan
                        '#ffd700', // Gold
                    ][index % 10]} // Cycles through colors
                />
            ))}
        </Pie>
        <Tooltip />
        <Legend
            align="center"
            verticalAlign="middle"
            layout="vertical"
            iconType="square" // Set legend icon to square
            wrapperStyle={{
                marginLeft: '-250px', // Reduces the gap between legend and chart
            }}
            formatter={(value, entry, index) => (
                <span style={{ color: '#4a4a4a' }}>
                    {departmentData[index]?.name || value}
                </span>
            )}
        />
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

<ModalConfirmation
        isOpen={isLogoutConfirmationOpen}
        message="Are you sure you want to logout?"
        onConfirm={confirmLogout}  // Confirm logout
        onCancel={cancelLogout}    // Cancel logout
      />

        <ModalConfirmation
            isOpen={isConfirmationModalOpen}
            message="Are you sure you want to collect the bin?"
            onConfirm={handleCollectedClick}
            onCancel={handleCancel}
        />


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
  binLevelStyle: {
    padding: '1%',
    height: '30px',
    width: '130px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#D3D3D3',
    position: 'relative', 
    overflow: 'hidden', 
  },
  binPercentStyle: {
    display: 'flex',
    height: '100%',
    background: 'linear-gradient(to right, #800000, #ff7b7b)', // Gradient from light to dark red
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    transition: 'width 0.3s ease-in-out', // Smooth transition for dynamic width
  },
  percent: {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    paddingTop: '2px',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '15px', 
    fontWeight: 'bold',
    pointerEvents: 'none',
  },
  collectButton: {
    display: 'block',
    backgroundColor: '#800000',  
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    paddingTop: '12.5px',
    paddingBottom: '9px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
    width: '20%',
  },
  collectButtonHover: {
    backgroundColor: '#A00000', 
  },
  disabledButton: {
    opacity: 0.5, // Example: make the button look faded when disabled
    pointerEvents: 'none', // Prevent interaction when disabled
  },
};

export default DashboardLayout;

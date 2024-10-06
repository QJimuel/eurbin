import React, { useEffect, useState } from 'react';
import dashbboard from '../Images/speedometer.png'
import analytics from '../Images/analysis.png'
import userManagement from '../Images/people.png'
import rewardManagement from '../Images/reward.png'
import editProfile from '../Images/edit.png'
import changePass from '../Images/padlock.png'
import about from '../Images/information.png'
import logOut from '../Images/exit.png'
import content from '../Images/content.png'


import { Outlet, Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart
} from 'recharts';
import axios from 'axios';

import EditProfileModal from "./EditProfileModal";
import ChangePassModal from "./ChangePassModal";

function Analytics2() {
  const total_API_URL = 'https://eurbin.vercel.app/total';
  const highest_API_URL = 'https://eurbin.vercel.app/total/highest';
  const user_API_URL = 'https://eurbin.vercel.app/user';
  const reward_API_URL = 'https://eurbin.vercel.app/rewards';
  const transaction_API_URL = 'https://eurbin.vercel.app/transactions';

  const [selectedDepartment, setSelectedDepartment] = useState(null);


  const [totals, settotals] = useState([]);
  const [highTotals, setHightotals] = useState({});
  const [user, setUser] = useState([]);
  const [reward, setRewards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [rewardTransactionData, setRewardTransactionData] = useState([])

  const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#33B5FF', // Sky Blue
    
    '#FFC300', // Yellow
    '#FF33F6', // Magenta
    '#33FFF6', // Cyan
    '#FF8433', // Orange
    '#A033FF', // Purple
    '#33FF87', // Light Green
    '#FF5733', // Coral
    '#FFB633', // Gold
    '#8B33FF', // Indigo
    '#33B5FF', // Sky Blue
    '#B2FF33', // Lime Green
    '#FF33A8', // Fuchsia
    '#33B8FF', // Light Blue
    '#FF5E33', // Salmon
    '#C2FF33', // Light Yellow
    '#FF9A33', // Apricot
    '#FF33A8', // Pink
  ];

  useEffect(() => {
    fetchReward();
    fetchTotal();
    fetchHighestTotal();
    fetchUser();
   
    fetchTransactions();
  }, []);

  const fetchTotal = async () => {
    try {
      const response = await axios.get(total_API_URL);
    
      if (response.status === 200 && Array.isArray(response.data.total)) {
        settotals(response.data.total);
      } else {
        console.error('Unexpected data format:', response.data);
        alert('An error occurred: Unexpected data format');
      }
    } catch (err) {
      console.error('Error fetching totals:', err);
      alert('An error occurred while fetching totals');
    }
  };

  const fetchHighestTotal = async () => {
    try {
      const response = await axios.get(highest_API_URL);
      
      if (response.status === 200 && response.data.highestTotals) {
        setHightotals(response.data.highestTotals);
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

  const fetchReward = async () => {
    try {
        
        const response = await axios.get(reward_API_URL);
        if (response.status === 200 && Array.isArray(response.data.rewards)) {
            setRewards(response.data.rewards);
            console.log('Rewards fetched successfully:', response.data.rewards);

            await calculateRewardTransactions(response.data.rewards);
            console.log(rewardTransactionData) 
        } else {
            console.error('Unexpected data format:', response.data);
            alert('An error occurred: Unexpected data format');
        }
    } catch (err) {
        console.error('Error fetching rewards:', err);
        alert('An error occurred while fetching rewards');
    }
}

const fetchTransactions = async () => {
  try {
    const response = await axios.get(transaction_API_URL);
    console.log('Transaction response:', response); // Log the entire response
    
    if (response.status === 200 && Array.isArray(response.data.transactions)) {
      setTransactions(response.data.transactions);
      return response.data.transactions; // Return the fetched transactions
    } else {
      console.error('Unexpected data format:', response.data);
      alert('An error occurred: Unexpected data format');
      return []; // Return an empty array on error to prevent further issues
    }
  } catch (err) {
    console.error('Error fetching transactions:', err);
    alert('An error occurred while fetching transactions');
    return []; // Return an empty array on error
  }
};
const calculateRewardTransactions = async (rewards) => {
  const transactions = await fetchTransactions(); // Await the transaction fetching

  // Ensure transactions is an array
  if (!Array.isArray(transactions)) {
    console.error('Expected an array of transactions, but got:', transactions);
    return; // Exit if the data is not as expected
  }

  const rewardCounts = rewards.map(reward => {
    const transactionCount = transactions.filter(transaction => transaction.transactionName === reward.RewardName).length;

    return {
      rewardName: reward.RewardName,
      transactionCount,
    };
  });

  setRewardTransactionData(rewardCounts);
  console.log('Calculated reward transactions:', rewardCounts);
};


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('default', { month: 'short', year: 'numeric' })}`;
  };

  const processData = (data) => {
    // Define all months of the year with default values
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Initialize a map with all months and default values
    const monthlyData = months.reduce((acc, month) => {
      acc[`${month} 2024`] = {
        formattedDate: `${month} `,
        totalUser: 0,
        totalBottle: 0,
        totalCo2: 0,  // Add totalCo2 here
      };
      return acc;
    }, {});

    // Process the data to get the highest values for each month
    data.forEach(item => {
      const date = new Date(item.date);
      const monthYear = `${date.toLocaleDateString('default', { month: 'short' })} ${date.getFullYear()}`;

      if (monthlyData[monthYear]) {
        // Update the highest value for the current month
        monthlyData[monthYear].totalUser = Math.max(monthlyData[monthYear].totalUser, item.totalUser || 0);
        monthlyData[monthYear].totalBottle = Math.max(monthlyData[monthYear].totalBottle, item.totalBottle || 0);
        monthlyData[monthYear].totalCo2 = Math.max(monthlyData[monthYear].totalCo2, item.totalCo2 || 0); // Add this line
      }
    });

    // Extract and sort the data
    const sortedMonthlyData = Object.values(monthlyData)
      .sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

    // Adjust values for each month
    let lastMonthData = { totalUser: 0, totalBottle: 0, totalCo2: 0 }; // Initialize totalCo2

    return sortedMonthlyData.map((monthData, index) => {
      // Calculate the difference between the current month and the last month
      const currentMonthUser = monthData.totalUser - lastMonthData.totalUser;
      const currentMonthBottle = monthData.totalBottle - lastMonthData.totalBottle;
      const currentMonthCo2 = monthData.totalCo2 - lastMonthData.totalCo2; // Add this line

      // Update last month's data for the next iteration
      lastMonthData = {
        totalUser: monthData.totalUser,
        totalBottle: monthData.totalBottle,
        totalCo2: monthData.totalCo2, // Add this line
      };

      // Ensure values don't go negative
      return {
        formattedDate: monthData.formattedDate,
        totalUser: Math.max(currentMonthUser, 0),
        totalBottle: Math.max(currentMonthBottle, 0),
        totalCo2: Math.max(currentMonthCo2, 0), // Add this line
      };
    });
};


  
  const formattedData = processData(totals);

  const logout = () => {
    window.localStorage.clear();
    console.log("Token cleared");
    window.location.href = "./";
    console.log(window.localStorage.getItem('token'));
  };

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const handleOpenEPModal = () => setIsEditProfileModalOpen(true);
  const handleCloseEPModal = () => setIsEditProfileModalOpen(false);

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const handleOpenCPModal = () => setIsChangePassModalOpen(true);
  const handleCloseCPModal = () => setIsChangePassModalOpen(false);

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

        <div className='analyticsBox'>
          <h2 className="dHeader">Analytics</h2>

          <div className="boxes" style={styles.boxes}>
            <div className="co2Box" style={styles.co2Box}>
              <p>Highest CO2: {highTotals.highestTotalCo2}</p>
            </div>

            <div className="bottleKgBox" style={styles.bottleKgBox}>
              <p>Highest Bottle (kg): {(highTotals.highestTotalBottle / 50)}</p>
            </div>
          </div>

          <div className='graphs'>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="formattedDate" tickFormatter={(tick) => tick} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalUser" fill="#800000" />
                <Bar dataKey="totalBottle" fill ="#36a2eb" />
                <Bar dataKey="totalCo2" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

      
    <br />
    <br />
    <br />
    <br />
            <h3>User Distribution by Department</h3>
            <div style={{ width: '100%', height: 300 }}>

              
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={departmentData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={110}
        dataKey="value"
        onClick={(entry) => setSelectedDepartment(entry.name)} // Drill down feature
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

  <br />
    <br />
    <br />
    <br />



  
</div>
{selectedDepartment && (
  <div>
    <h3>{selectedDepartment} User Details</h3>

    <div className="table-container">
      <table className="w3-table-all">
        <thead>
          <tr className="w3-light-grey">
            <th>Username</th>
            <th>Plastic Bottle</th>
            <th>Program</th>
            <th>CO2</th>
          </tr>
        </thead>
        <tbody>
          {user
            .filter(u => u.department === selectedDepartment) // Filter users by selected department
            .map((u, index) => (
              <tr key={index}>
                <td>{u.userName}</td>
                <td>{u.plasticBottle}</td>
                <td>{u.program}</td>
                <td>{u.co2}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <button onClick={() => setSelectedDepartment(null)}>Back to Departments</button>
  </div>
)}


<br />
    <br />
   

    <h3>Transactions per Reward</h3>


<ResponsiveContainer width="100%" height={400}>
  <BarChart data={rewardTransactionData} layout="vertical">
    <CartesianGrid strokeDasharray="3 3" />
    <YAxis dataKey="rewardName" type="category" angle={-65} textAnchor="end" />
    <XAxis type="number" />
    <Tooltip />
    <Legend />
    
    <Bar dataKey="transactionCount" barSize={40}>
      {
        rewardTransactionData.map((reward, index) => (
          <Cell 
            key={reward.rewardName} 
            fill={colors[index % colors.length]} // Assign unique color to each bar
          />
        ))
      }
    </Bar>
  </BarChart>
</ResponsiveContainer>


       
          </div>
        </div>

        

        <main style={styles.main}>
          <Outlet />
        </main>
      </div>

      {/*  EDIT PROFILE MODAL */}
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
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    marginTop: '15%', 
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
  boxes: {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '20px',
    gap: 20,
    padding: 20,
  },
  co2Box: {
    backgroundColor: '#f2f2f2',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '20px',
    width: '100%',
  },
  bottleKgBox: {
    backgroundColor: '#f2f2f2',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: '20px',
    width: '100%',
  },
};

export default Analytics2;

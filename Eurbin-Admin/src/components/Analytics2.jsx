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
    AreaChart,
    Area
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
    const [selectedMonth, setSelectedMonth] = useState(null); 

    const [selectedDepartment1, setSelectedDepartment1] = useState("");
    const [selectedProgram, setSelectedProgram] = useState(null);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedYearLevel, setSelectedYearLevel] = useState("");

    const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];


    const [selectedReward, setSelectedReward] = useState(null); // Store the selected reward name
    const [rewardTransactions, setRewardTransactions] = useState([]); // Store the selected reward transactions



    const [totals, settotals] = useState([]);
    const [highTotals, setHightotals] = useState({});
    const [user, setUser] = useState([]);
    const [reward, setRewards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [rewardTransactionData, setRewardTransactionData] = useState([])

    const [greetingName, setGreetingName] = useState('');

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


    const monthNames = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    const departments = [
      "CIHTM",
      "CCMS",
      "CNAS",
      "CME",
      "CCJC",
      "CED",
      "CAS",
      "Staff",
      "ETEEAP",
      "Faculty"
    ];

    useEffect(() => {
      fetchReward();
      fetchTotal();
      fetchHighestTotal();
      fetchUser();
    
      fetchTransactions();
      const email = localStorage.getItem('username');
      if (email) {
        setGreetingName(email);
      }
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
}
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


  const CustomizedTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <h4>{`Date: ${payload[0].payload.formattedDate}`}</h4>
          <p>{`Users: ${payload[0].value}`}</p>
          <p>{`Bottles: ${payload[1].value}`}</p>
          <p>{`CO2: ${payload[2].value}`}</p>
        </div>
      );
    }
    return null;
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

    const maxValue = Math.max(...rewardTransactionData.map(reward => reward.transactionCount));


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

    function getMonthFromDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
      return `${year}-${month}`;
    }

    const getUserCountByProgram = () => {
      const programCount = {};
  
      user
        .filter(u => u.department === selectedDepartment)
        .forEach(u => {
          programCount[u.program] = (programCount[u.program] || 0) + 1;
        });
  
      // Convert the object into an array for the BarChart
      return Object.keys(programCount).map(program => ({
        program,
        userCount: programCount[program],
      }));
    };

    const userCountData = selectedDepartment ? getUserCountByProgram() : [];

    const getUsersByProgram = (program) => {
      return user.filter(u => u.department === selectedDepartment && u.program === program);
    };

    const handleLineClick = (data) => {
      console.log("Clicked Data:", data); // Debugging log
    
      // Accessing the active label directly
      const rewardName = data.activeLabel.trim(); // Use activeLabel directly
    
      // Filter transactions based on the clicked reward name
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.transactionName.trim() === rewardName
      );
    
      setSelectedReward(rewardName);
      setRewardTransactions(filteredTransactions);
    
      console.log("Filtered Transactions:", filteredTransactions); // Verify the result
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

      <div className='analyticsBox'>
          <div className="rmdHeaders1"> 
            <h1 className="anaHeader">Analytics</h1>
          </div>
          <div className="boxes" style={styles.boxes}>
            <div className="co2Box" style={styles.co2Box}>
              <p style={styles.boxText}> Highest CO2: { !isNaN(Number(highTotals.highestTotalCo2)) ? Number(highTotals.highestTotalCo2).toFixed(2) : '0.00' }</p>
            </div>
            <div className="bottleKgBox" style={styles.bottleKgBox}>
              <p style={styles.boxText}>Highest Bottle (kg): {(highTotals.highestTotalBottle / 50)}</p>
            </div>
          </div>
            
            <div className='graphs'>

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '300px', justifyContent: 'space-around' }}>        
            <div style={{  flex: 1 }}>
           
            <ResponsiveContainer width="95%" height={300}>
  <h3>Monthly Contributions Overview</h3>
  <AreaChart
    data={formattedData}
    onClick={(data, index) => {
      const clickedMonthName = data.activeLabel.trim(); // Example: "Oct"
      const year = '2024'; // You can fetch this dynamically based on the data

      // Convert "Oct" to "2024-10"
      const selectedMonth = `${year}-${monthNames[clickedMonthName]}`;

      setSelectedMonth(selectedMonth);
    }}
  >
  
  <CartesianGrid strokeDasharray="1 0" stroke="#ccc" horizontal={true} vertical={false} />
    <XAxis
      dataKey="formattedDate"
      tickFormatter={(tick) => tick}
      tick={{ fill: '#000', fontSize: 12 }} // Customize tick label color and size
      axisLine={{ stroke: '#fff', strokeWidth: .5 }} // Customize axis line color and width
      tickLine={{ stroke: '#fff', strokeWidth: .5 }}
    />
    <YAxis
      tick={{ fill: '#000', fontSize: 12 }} // Customize tick label color and size
      axisLine={{ stroke: '#fff', strokeWidth: 1 }} // Customize axis line color and width
      tickLine={{ stroke: '#fff', strokeWidth: 1 }}
      
      
    />
    <Tooltip content={<CustomizedTooltip />} />
    <Legend />

    <Area
      type="monotone"
      dataKey="totalBottle"
      stroke="#8B33FF"
      fill="#8B33FF"
      strokeWidth={1}
      dot={{ r: 4 }}
      activeDot={{ r: 8 }}
      isAnimationActive={true}
    />
    <Area
      type="monotone"
      dataKey="totalCo2"
      stroke="#82ca9d"
      fill="#82ca9d"
      strokeWidth={1}
      dot={{ r: 4 }}
      activeDot={{ r: 8 }}
      isAnimationActive={true}
    />
    <Area
      type="monotone"
      dataKey="totalUser"
      stroke="#2B0100"
      fill="#2B0100"
      strokeWidth={1}
      dot={{ r: 4 }}
      activeDot={{ r: 8 }}
      isAnimationActive={true}
    />
  </AreaChart>
</ResponsiveContainer>

    <br />
      <br />
      <br />
      <br />
</div>
{selectedMonth && (
  <div>
    <h3>Contributions in {selectedMonth}</h3>

    <div>
      <label htmlFor="roleFilter">Filter by Role: </label>
      <select
        id="roleFilter"
        value={selectedRole}
        onChange={(e) => {
          setSelectedRole(e.target.value);
          setSelectedYearLevel(""); // Reset year level when role changes
        }}
      >
        <option value="">All Roles</option>
        <option value="Staff">Staff</option>
        <option value="Faculty">Faculty</option>
        <option value="Student">Student</option>
        <option value="ETEEAP">ETEEAP</option>
      </select>
    </div>

    {selectedRole === "Student" && (
      <div>
        <label htmlFor="yearLevelFilter">Filter by Year Level: </label>
        <select
          id="yearLevelFilter"
          value={selectedYearLevel}
          onChange={(e) => setSelectedYearLevel(e.target.value)}
        >
          <option value="">All Year Levels</option>
          {yearLevels.map((yearLevel, index) => (
            <option key={index} value={yearLevel}>
              {yearLevel}
            </option>
          ))}
        </select>
      </div>
    )}

    {/* Hide the department filter if the selected role is Staff or ETEEAP */}
    {(selectedRole !== "Staff" && selectedRole !== "ETEEAP") && (
      <div>
        <label htmlFor="departmentFilter">Filter by Department: </label>
        <select
          id="departmentFilter"
          value={selectedDepartment1}
          onChange={(e) => setSelectedDepartment1(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
    )}

    <div className="table-container-analytics">
      <table className="w3-table-all">
        <thead>
          <tr className="w3-light-grey">
            <th>Username</th>
            <th>Plastic Bottle</th>
            <th>Program</th>
            <th>CO2 Contribution</th>
          </tr>
        </thead>
        <tbody>
          {user
            .filter((u) => {
              const userMonth = getMonthFromDate(u.creationDate); // Returns "YYYY-MM"
              const matchesMonth = userMonth === selectedMonth; // Check month

              // Check if the user matches the selected role
              const matchesRole = selectedRole ? u.role === selectedRole : true; // If no role is selected, include all

              // Check if the user matches the selected department (if any)
              const matchesDepartment = selectedDepartment1
                ? u.department === selectedDepartment1
                : true; // If no department is selected, include all

              // Check if the user matches the selected year level (if role is Student)
              const matchesYearLevel = selectedRole === "Student"
                ? selectedYearLevel ? u.yearLevel === selectedYearLevel : true // Include all if no year level selected
                : true;

              // Additional checks for specific roles
              const isEteeap = u.role === "ETEEAP";
              const isFaculty = u.role === "Faculty";

              // Conditions for filtering
              return (
                matchesMonth &&
                matchesRole &&
                (isEteeap || isFaculty || matchesDepartment) &&
                matchesYearLevel
              ); // Include ETEEAP and Faculty regardless of department/year level
            })
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
    <button onClick={() => setSelectedMonth(null)} style={{ marginLeft: '450px' }}>Back to Graph</button>
  </div>
)}

     </div>   
      <br />
      <br />
      <br />
      <br />
              <h3>User Distribution by Department</h3>

      <div style={{ display: 'flex', justifyContent: 'space-around', height: '300px', marginRight: '50px'}}>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer  height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={125}
              dataKey="value"
              onClick={(entry) => setSelectedDepartment(entry.name)} // Drill down feature
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9f40', '#4bc0c0', '#36a2eb'][index % 7]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      
        {selectedDepartment && (
          <>
            
            <ResponsiveContainer width="50%" height="100%">
            <h3>{selectedDepartment} User Programs</h3>
              <BarChart data={userCountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="userCount" 
                  fill="#36a2eb" 
                  onClick={(data) => {
                    setSelectedProgram(data.program); // Set the selected program
                  }}
                />
              </BarChart>
              <button onClick={() => setSelectedDepartment(null) } style={{ marginLeft: '400px' }}>Back to Department</button>
            </ResponsiveContainer>
          

           
          </>
        )}
    
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
     {/* Display user details when a bar is clicked */}
     {selectedProgram && (
              <div style={{ marginTop: '20px' }}>
                <h4>Users in {selectedProgram}</h4>
                <div className="table-container-analytics">
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
                        {getUsersByProgram(selectedProgram).map((u, index) => (
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
                </div>
                <button onClick={() => setSelectedProgram(null)} style={{ marginLeft: '980px' }} >Back to Programs</button>
              </div>
            )}
  <br />
      <br />
    

      <h3>Transactions per Reward</h3>


      <ResponsiveContainer width="96%" height={400}>
  <LineChart data={rewardTransactionData} layout="horizontal" onClick={(e) => handleLineClick(e)}>
    <CartesianGrid strokeDasharray="3 0" vertical={false} horizontal={true} stroke="#ccc" />
    <XAxis 
      dataKey="rewardName" 
      type="category" 
      textAnchor="start" 
      padding={{ left: 30, right: 30 }}
      tick={{ fill: '#000', fontSize: 12 }}
      axisLine={{ stroke: '#fff', strokeWidth: 1 }}
      tickLine={{ stroke: '#fff', strokeWidth: 1 }}
    />
    <YAxis 
      type="number" 
      domain={[0, maxValue + 1]}
      allowDecimals={false}
      tick={{ fill: '#000', fontSize: 12 }}
      axisLine={{ stroke: '#fff', strokeWidth: 1 }}
      tickLine={{ stroke: '#fff', strokeWidth: 1 }}
    />
    <Tooltip />
    <Legend />
    <Line
  type="monotone"
  dataKey="transactionCount"
  stroke="#FF8433"
  strokeWidth={4}
  dot={{ r: 8 }} // Normal dot size
  activeDot={{ r: 12 }} // Enlarged on hover
   // Attach onClick here
/>

  </LineChart>
</ResponsiveContainer>

<div className="table-container-analytics">
  {selectedReward && (
    <>
      <h3>Transactions for: {selectedReward}</h3>
      <table className="w3-table-all">
        <thead>
          <tr className="w3-light-grey">
            <th>ID</th>
            <th>User ID</th>
            <th>Transaction Name</th>
            <th>Price</th>
            <th>Reference No</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rewardTransactions.length > 0 ? (
            rewardTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.userId}</td>
                <td>{transaction.transactionName}</td>
                <td>{transaction.transactionPrice}</td>
                <td>{transaction.referenceNo}</td>
                <td>{transaction.isAccepted ? 'Accepted' : 'Pending'}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="w3-button w3-blue" onClick={() => setSelectedReward(null)} style={{ marginLeft: '940px', marginBottom: '20px' }}>Back to Line Graph</button>
    </>
  )}
</div>



        
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
      marginLeft: '5%',
      marginRight: '5%',
      display: 'flex',
      justifyContent: 'end',
      marginBottom: '20px',
      gap: 20,
      padding: 20,
    },

    co2Box: {
      backgroundColor: '#800000',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontSize: '20px',
      width: '100%',
    },

    boxText: {
      color: 'white', // This style will be applied to the <p> tag
    },
    
    bottleKgBox: {
      backgroundColor: '#800000',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      fontSize: '20px',
      width: '100%',
    },
  };

  export default Analytics2;
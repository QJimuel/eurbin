import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';
import smallPlastic from '../Images/smallPlastic.jpg';
import largePlastic from '../Images/largePlastic.jpg';
import notBottle from '../Images/notbottle.png';
import ModalConfirmation from './ModalConfirmation';

function BinStatus() {

    const API_URL = 'https://eurbin.vercel.app/transactions';
    const BOTTLES_API_URL = 'https://eurbin.vercel.app/bottles';
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [smallBottleCount, setSmallBottleCount] = useState(0);
    const [largeBottleCount, setLargeBottleCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [notBottleCount, setNotBottle] = useState(0);
    const [greetingName, setGreetingName] = useState('');


    const [totals, settotals] = useState({});
    const [collectedOffset, setCollectedOffset] = useState(0);
    const MAX_BOTTLES = 100;
    const [collectedData, setCollectedData] = useState([]);
    const [hoverCollect, setHoverCollect] = useState(false);


    const total_API_URL = 'https://eurbin.vercel.app/total/highest';
    const collected_API_URL = 'https://eurbin.vercel.app/collected'; 
  
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  
    const handleConfirm = () => {
      setIsConfirmationModalOpen(true); 
    };
  
    const handleCancel = () => {
        setIsConfirmationModalOpen(false); 
    };

    useEffect(() => {
        fetchCollectedData();
        fetchBottleData();
        fetchTotal();
        const email = localStorage.getItem('username');
        if (email) {
          setGreetingName(email);
        }
    }, []);

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

    const fetchBottleData = async () => {
        try {
            const token = localStorage.getItem('token');  // Get the token from localStorage
            
            // If no token is found, alert the user
            if (!token) {
                alert('No token found. Please log in.');
                return;
            }
    
            // Make the API request with the token in the Authorization header
            const response = await axios.get(BOTTLES_API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in the headers
                }
            });
    
            // Log the response to ensure it has the expected structure
            console.log('Bottle data response:', response.data);
    
            // Check if the response is valid and contains the 'bottles' array
            if (response.status === 200 && Array.isArray(response.data.bottles)) {
                // Count the small and large bottles
                const smallBottles = response.data.bottles.filter(bottle => bottle.Size === 'Small').length;
                const largeBottles = response.data.bottles.filter(bottle => bottle.Size === 'Large').length;
                const notBottles = response.data.bottles.filter(bottle => bottle.Size === 'Not Plastic Bottle').length;
    
                setSmallBottleCount(smallBottles);
                setLargeBottleCount(largeBottles);
                setNotBottle(notBottles);
            } else {
                // Handle unexpected data format
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            // Handle any errors in fetching the bottle data
            console.error('Error fetching bottle data:', err);
            alert('An error occurred while fetching bottle data');
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

    const percentComputation = () => {
        const storedOffset = Number(localStorage.getItem('collectedOffset')) || 0;
        const effectiveTotal = Math.max(0, (smallBottleCount + largeBottleCount + notBottleCount) - storedOffset);
        const percent = Math.min(100, Math.ceil((effectiveTotal / MAX_BOTTLES) * 100));
        return `${percent}%`;
    };

    const handleCollectedClick = async () => {
        const token = localStorage.getItem('token');
        try {
            const newBottles = (smallBottleCount + largeBottleCount + notBottleCount) - collectedOffset;
       
            const payload = {
                bottleCount: newBottles,
            };
    
            const response = await fetch('https://eurbin.vercel.app/collected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(payload),
            });

            setIsConfirmationModalOpen(false);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Bottle data saved:', data); 

            setCollectedOffset(totals.highestTotalBottle);
            localStorage.setItem('collectedOffset', totals.highestTotalBottle);
    
        } catch (error) {
            console.error('Error posting collected bottles:', error.message);
        }
    };
    
    return<>
    <p style={{ color: 'white', fontFamily: 'Poppins', fontSize: 20, fontWeight: 600, marginTop: '-30px', marginLeft: '88%', whiteSpace: 'nowrap' }}>Hello, {greetingName}!</p>


    <h1 className='headings'>Bin Management</h1>

        <div style={{paddingTop: '10px'}} className="rmdHeaders">
        <div className="pasokLang">
            <h1 className="dTitle">EURBin Status:</h1>
            <div style={styles.binLevelStyle}>
              <p style={styles.percent}>{percentComputation()}</p>
                <div 
                    style={{
                        ...styles.binPercentStyle, 
                        width: `${percentComputation()}`
                    }}
                > 
                </div>
            </div>

            
            </div>
            <div className="activityButton">
                <Link to="/Activity2" className="activityLink">
                    <button>Activity</button>
                </Link>
            </div>
        </div>

        <ModalConfirmation
            isOpen={isConfirmationModalOpen}
            message="Are you sure you want to collect the bin?"
            onConfirm={handleCollectedClick}
            onCancel={handleCancel}
        />

        <div className="table-container">
                <table className="w3-table-all"  >
                    <thead>
                        <tr className="w3-light-grey">
                            <th>Waste</th>
                            <th>Size</th>
                            <th>Quantity</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td>
                                <img
                                    src={smallPlastic}
                                    alt="Small Bottle"
                                    style={{ width: '40px', height: '100px', borderRadius: '10px' }}
                                />
                            </td>
                            <td>Small Bottle</td>
                            <td>{smallBottleCount}</td> {/* Display small bottle quantity */}
                     
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src={largePlastic}
                                    alt="Large Bottle"
                                    style={{ width: '40px', height: '100px', borderRadius: '10px' }}
                                />
                            </td>
                            <td>Large Bottle</td>
                            <td>{largeBottleCount}</td> {/* Display large bottle quantity */}
                    
                        </tr>

                        <tr>
                            <td>
                                <img
                                    src={notBottle}
                                    alt="None Plastic Bottles"
                                    style={{ width: '50px', height: '100px', borderRadius: '10px' }}
                                />
                            </td>
                            <td>None Plastic Bottles</td>
                            <td>{notBottleCount}</td> {/* Display large bottle quantity */}
                         
                        </tr>
                    </tbody>
                </table>
            </div>


   
</> ;
    
}

const styles = {
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
export default BinStatus;
import { Outlet, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import smallPlastic from '../Images/smallPlastic.jpg'
import largePlastic from '../Images/largePlastic.jpg'
import notBottle from '../Images/notbottle.png';


function Activity2() {

    const API_URL = 'https://eurbin.vercel.app/bottles';
    const [bottle, setBottles] = useState([]);
    const [greetingName, setGreetingName] = useState('');

    useEffect(() => {
        fetchBottle(); 
        const email = localStorage.getItem('username');
        if (email) {
          setGreetingName(email);
        }
    }, []);

    const fetchBottle = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
    
            if (response.status === 200 && Array.isArray(response.data.bottles)) {
                setBottles(response.data.bottles);
                console.log('Bottles fetched successfully:', response.data.bottles);
            } else {
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            console.error('Error fetching bottles:', err);
            alert('An error occurred while fetching bottles');
        }
    };
    

    const location = useLocation();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }

    return (
        <>
        <p style={{ color: 'white', fontFamily: 'Poppins', fontSize: 20, fontWeight: 600, marginTop: '-30px', textAlign: 'right', paddingRight: '10px'}}>Hello {greetingName}</p>
            <h1 className='headings'>Bin Management</h1>

            

            <div style={{paddingTop: '21px'}}className="rmdHeadersAct2">
            <div className="activityButton">      
                <Link to="/Activity2" >
                    <button className={location.pathname === "/Activity2" ? "active-btn" : "inactive-btn"} >
                    Activity
                    </button>
                </Link>
            </div>
        </div>

            <div className="table-containerAct2">
                <table className="w3-table-all">
                    <thead>
                        <tr className="w3-light-grey">
                            <th>User</th>
                            <th>Bottle</th>
                            <th>Size</th>
                            <th>Redeem Code</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping over bottles data */}
                        {bottle.length > 0 ? (
                            bottle.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.userId ? item.userId : "none"}</td>
                                    <td>
                                        <img
                                            src={
                                                item.Size === "Small" 
                                                    ? smallPlastic 
                                                    : item.Size === "Large" 
                                                    ? largePlastic 
                                                    : notBottle
                                            }
                                            alt={
                                                item.Size === "Small" 
                                                    ? "Small Bottle" 
                                                    : item.Size === "Large" 
                                                    ? "Large Bottle" 
                                                    : "Not a Plastic Bottle"
                                            }
                                            style={{ width: '40px', height: '100px', borderRadius: '10px' }}
                                        />
                                    </td>
                                    <td>{item.Size}</td>
                                    <td>{item.Code}</td>
                                    <td>{formatDate(item.date)}</td> {/* Format date */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No bottles found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Activity2;
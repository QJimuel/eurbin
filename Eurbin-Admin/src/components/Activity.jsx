import { Outlet, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import smallPlastic from '../Images/smallPlastic.jpg'
import largePlastic from '../Images/largePlastic.jpg'


function Activity() {

    const API_URL = 'https://eurbin.vercel.app/bottles';
    const [bottle, setBottles] = useState([]);

    useEffect(() => {
        fetchBottle(); 
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
            <h1 className='headings'>Management</h1>

            <nav className="nav">
                <ul className="navList">
                    <li>
                        <Link to="/Manage">
                            <button className={location.pathname === "/Manage" ? "active-btn" : "inactive-btn"}>
                                Reward Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Request">
                            <button className={location.pathname === "/Request" ? "active-btn" : "inactive-btn"}>
                                Requesting for Reward
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Transaction">
                            <button className={location.pathname === "/Transaction" ? "active-btn" : "inactive-btn"}>
                                Transaction
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Recycleables">
                            <button className={location.pathname === "/Recycleables" ? "active-btn" : "inactive-btn"}>
                                Recycleable Materials Data
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="rmdHeadersAct2">
           
            <div className="activityButton">      
                <Link to="/Activity" >
                    <button className={location.pathname === "/Activity" ? "active-btn" : "inactive-btn"} >
                    Activity
                    </button>
                </Link>
            </div>
        </div>

            <div style={{height: '100%', paddingBottom: '150px'}} className="table-container">
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
                                            src={item.Size === "Small" ? smallPlastic : largePlastic} 
                                            alt={item.Size === "Small" ? "Small Bottle" : "Large Bottle"} 
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

export default Activity;

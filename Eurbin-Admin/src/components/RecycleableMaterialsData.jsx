import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';
import smallPlastic from '../Images/smallPlastic.jpg'
import largePlastic from '../Images/largePlastic.jpg'


function RecycleableData() {

    const API_URL = 'https://eurbin.vercel.app/transactions';
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


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

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return<>
  
  <h1 className='headings'>Management</h1>

  <nav className="nav">
            <ul className="navList">
            <li >
                <Link to="/Manage" >
                <button className={location.pathname === "/Manage" ? "active-btn" : "inactive-btn"}>
                        Reward Management
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/Request" >
                <button className={location.pathname === "/Request" ? "active-btn" : "inactive-btn"}>
                        Requesting for Reward
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/Transaction" >
                <button className={location.pathname === "/Transaction" ? "active-btn" : "inactive-btn"}>
                        Transaction
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/Recycleables" >
                <button className={location.pathname === "/Recycleables" ? "active-btn" : "inactive-btn"}>
                        Recycleable Materials Data
                    </button>
                </Link>
            </li>
            </ul>
        </nav>

        <div className="rmdHeaders">
            <p>EURBin Status: </p>
            <div className="binLevel">
                <div className="binPercent">
                    <p>80%</p>
                </div>
            </div>
            <div className="activityButton">
                <Link to="/Activity" className="activityLink">
                    <button>Activity</button>
                </Link>
            </div>
        </div>

        <div className="table-container">
                <table className="w3-table-all">
                    <thead>
                        <tr className="w3-light-grey">
                            <th>Waste</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Date</th>
                           
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                        </tr>
                   
                    </tbody>
                </table>
            </div>


   
</> ;
    
}
export default RecycleableData;
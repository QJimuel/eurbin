import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';

function RequestReward() {
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
                setTransactions(response.data.transactions.filter(transaction => transaction.isAccepted !== true && transaction.isAccepted !== false));
            } else {
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            console.error('Error fetching transactions:', err);
            alert('An error occurred while fetching transactions');
        }
    };
    
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    const handleAccept = async (id) => {
        try {
            await axios.put(
                `${API_URL}/${id}`,
                { isAccepted: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Add the token to the headers
                    }
                }
            );
    
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction._id === id
                        ? { ...transaction, isAccepted: true }
                        : transaction
                )
            );
        } catch (err) {
            console.error('Error accepting transaction:', err);
            alert('An error occurred while accepting the transaction');
        }
    };
    
    const handleDecline = async (id) => {
        try {
            await axios.put(
                `${API_URL}/${id}`,
                { isAccepted: false },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Add the token to the headers
                    }
                }
            );
    
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction._id === id
                        ? { ...transaction, isAccepted: false }
                        : transaction
                )
            );
        } catch (err) {
            console.error('Error declining transaction:', err);
            alert('An error occurred while declining the transaction');
        }
    };
    
    

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by Ref No."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="table-container">
                <table className="w3-table-all">
                    <thead>
                        <tr className="w3-light-grey">
                            <th>User ID</th>
                            <th>Reward Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Reference No.</th>
                            <th>Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
  {filteredTransactions.length > 0 ? (
    filteredTransactions.map((transaction) => (
      <tr key={transaction._id}>
        <td>{transaction.userId}</td>
        <td>{transaction.transactionName}</td>
        <td>{transaction.transactionPrice}</td>
        <td>{formatDate(transaction.date)}</td>
        <td>{transaction.referenceNo}</td>
        <td className="rrBtn">
            {transaction.isAccepted === true ? (
                <span className="status">Accepted</span>
            ) : transaction.isAccepted === false ? (
                <span className="status">Declined</span>
            ) : (
                <>
                <Link to="/Transaction" style={{ textDecoration: 'none' }}>
                    <button
                    className={location.pathname === "/Transaction"}
                    style={{ backgroundColor: '#4CAF50' }} 
                    onClick={() => handleAccept(transaction._id)}
                    >
                    Accept
                    </button>
                </Link>
                <Link to="/Transaction" style={{ textDecoration: 'none' }}>
                    <button
                    className={location.pathname === "/Transaction"}
                    style={{ backgroundColor: '#F44336' }} 
                    onClick={() => handleDecline(transaction._id)}
                    >
                    Decline
                    </button>
                </Link>
                </>
            )}
        </td>

      </tr>
    ))
  ) : (
    
      <td colSpan="6" style={{ textAlign: "center", fontSize: "30px", padding: "80px", border: "none"}}>
        No data yet
      </td>
  
  )}
</tbody>

                </table>
            </div>
        </>
    );
}

export default RequestReward;

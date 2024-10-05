import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Transaction() {
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }
    

    


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.userId}</td>
                                <td>{transaction.transactionName}</td>
                                <td>{transaction.transactionPrice}</td>
                                <td>{formatDate(transaction.date)}</td>
                                <td>{transaction.referenceNo}</td>
                                <td>
                                    {transaction.isAccepted === true ? (
                                        <span className='status' style={{ color: '#4CAF50' }}>Accepted</span>
                                    ) : transaction.isAccepted === false ? (
                                        <span className='status' style={{ color: '#F44336' }}>Declined</span>
                                    ) : (
                                        <>  
                                        </>
                                    )}
                                </td>
                              
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Transaction;

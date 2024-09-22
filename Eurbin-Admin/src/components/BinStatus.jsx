import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';

function BinStatus() {

    const API_URL = 'https://eurbin.vercel.app/transactions';
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
  
  <h1 className='headings'>Bin Management</h1>

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
                            <th>User ID</th>
                            <th>Reward Name</th>
                            <th>Price</th>
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
                                <td>{transaction.referenceNo}</td>
                                <td className="action-buttons">
                                    {transaction.isAccepted === true ? (
                                        <span className='status'>Accepted</span>
                                    ) : transaction.isAccepted === false ? (
                                        <span className='status'>Declined</span>
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


   
</> ;
    
}
export default BinStatus;
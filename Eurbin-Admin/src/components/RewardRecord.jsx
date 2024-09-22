import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";

function RewardRecord() {
    const API_URL = 'http://eurbin.vercel.app/rewards';
    const [Reward, setRewards] = useState([]);

    const location = useLocation();  


    /*
    useEffect(() => {
        fetchReward();
    }, []); // Add an empty dependency array to ensure this runs only once on mount

    const fetchReward = async () => {
        try {
            const response = await axios.get(API_URL);

            if (response.status === 200 && Array.isArray(response.data.rewards)) {
                setRewards(response.data.rewards);
            } else {
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            console.error('Error fetching rewards:', err);
            alert('An error occurred while fetching rewards');
        }
    };*/

    return (
      <>
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
      
      <br />
      
      
      <div className="table-container">
          <table className="w3-table-all">
              <thead>
                  <tr className="w3-light-grey">
                      <th>Reward</th>
                      <th>Reward Name</th>
                      <th>Category</th>
                      <th>Quantity<div style={{ fontSize: '10px', color: 'black' }}></div></th>
                      <th> Price <div style={{ fontSize: '10px', color: 'black' }}>(Smart Points)</div></th>
                  </tr>
              </thead>
              <tbody>
                  {Reward.map(reward => (
                      <tr key={reward._id}>
                          <td>🖼️</td>
                          <td>{reward.RewardName}</td>
                          <td>{reward.Category}</td>
                          <td>{reward.Quantity}</td>
                          <td>{reward.Price}</td>
                          <td>
                              <button onClick={() => handleEditClick(reward)}>Edit</button>
                              <button onClick={() => deleteReward(reward._id)}>Delete</button>
                          </td> 
                      </tr>
                  ))}
              </tbody>
          </table>
  
          </div>
          {/* 
          <table className="w3-table-all">
              <thead>
                  <tr className="w3-light-grey">
                      <th>Reward</th>
                      <th>Reward Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {Reward.map(reward => (
                      <tr key={reward._id}>
                          <td>🖼️</td>
                          <td>{reward.RewardName}</td>
                          <td>{reward.Category}</td>
                          <td>{reward.Quantity}</td>
                          <td>{reward.Price}</td>
                          <td>
                              <button onClick={() => handleEditClick(reward)}>Edit</button>
                              <button onClick={() => deleteReward(reward._id)}>Delete</button>
                          </td> 
                      </tr>
                  ))}
              </tbody>
          </table>
          <br /><br /><br />
          <h1>Edit Reward</h1>
          <table>
              <tbody>
                  <tr>
                      <td><label>Reward Name: </label></td>
                      <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                  </tr>
                  <tr>
                      <td>Reward Category: </td>
                      <td><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /></td>
                  </tr>
                  <tr>
                      <td>Reward Quantity: </td>
                      <td><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                  </tr>
                  <tr>
                      <td>Reward Price: </td>
                      <td><input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
                  </tr>
                  <tr>
                      <td>
                          <button onClick={rewardId ? updateReward : createReward}>
                              {rewardId ? 'Update' : 'Create'}
                          </button>
                      </td>
                  </tr>
              </tbody>
          </table>
          */}
      </>
  );
}

export default RewardRecord;

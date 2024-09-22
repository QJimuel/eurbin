import axios from 'axios';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function AddReward() {

    const API_URL = 'https://eurbin.vercel.app//rewards';
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const createReward = async () => {
        if (!name || !category || !quantity || !price) {
            alert('All fields are required');
            return;
        }
        try {
            const rawInput = {
                RewardName: name,
                Category: category,
                Quantity: quantity,
                Price: price
            };

            const response = await axios.post(API_URL, rawInput);

            if (response.status === 201) {
                clearInput();
                alert('Reward added successfully');
            } else {
                alert('Failed to add reward');
            }
        } catch (err) {
            console.error('Error creating reward:', err);
            alert('An error occurred while adding the reward');
        }
    };

    const clearInput = () => {
        setName('');
        setCategory('');
        setQuantity('');
        setPrice('');
    };

    return (
        <>
                
          <nav>
            <ul >
            <li >
                <Link to="/Record" >
                  <button >
                    <span role="img" aria-label="record">📋</span> Record
                  </button>
                </Link>
              </li>
              <li >
                <Link to="/Manage" >
                  <button >
                    <span role="img" aria-label="edit">✏️</span> Edit Reward
                  </button>
                </Link>
              </li>
              <li >
                <Link to="/Add" >
                  <button >
                    <span role="img" aria-label="add">➕</span> Add Reward
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
      
            <h1>Create Reward</h1>
            <table>
                <tbody>
                    <tr>
                        <td><label>Reward Name:</label></td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Reward Category:</td>
                        <td><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Reward Quantity:</td>
                        <td><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Reward Price:</td>
                        <td><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><button onClick={createReward}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default AddReward;

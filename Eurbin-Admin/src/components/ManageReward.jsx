import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import Modal from './Modal'; // Import the Modal component

function ManageReward() {
    const API_URL = 'https://eurbin.vercel.app/rewards';

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
  
    const [rewardId, setRewardId] = useState(null);
    const [Reward, setRewards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [isEditing, setIsEditing] = useState(false); // New state to differentiate between adding and editing
    const [modalTitle, setModalTitle] = useState('Add Reward');

    const location = useLocation();  

    useEffect(() => {
        fetchReward(); 
    }, []); // Run only once on component mount
    
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
    }

    const createReward = async () => {
        try {
            const rawInput = {
                RewardName: name,
                Category: category,
                Quantity: parseInt(quantity, 10),
                Price: parseFloat(price)
            };

            const response = await axios.post(API_URL, rawInput);

            if (response.status === 201) {
                await fetchReward();
                clearInput();
                setIsModalOpen(false); // Close modal after creating
            }
        } catch (err) {
            console.error('Error creating reward:', err);
            alert('An error occurred while creating the reward');
        }
    } 

    const updateReward = async () => {
        try {
            const rawInput = {
                RewardName: name,
                Category: category,
                Quantity: parseInt(quantity, 10),
                Price: parseFloat(price)
            };

            const response = await axios.put(`${API_URL}/${rewardId}`, rawInput);

            if (response.status === 200) {
                await fetchReward();
                clearInput();
            }
        } catch (err) {
            console.error('Error updating reward:', err);
            alert('An error occurred while updating the reward');
        }
    };


   

    const handleAddClick = () => {
        clearInput(); // Clear inputs before adding new reward
        setIsModalOpen(true); // Open modal when "Add" button is clicked
        setModalTitle('Add Reward');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close modal
    };

    const clearInput = () => {
        setName('');
        setCategory('');
        setQuantity('');
        setPrice('');
        setRewardId(null); // Reset rewardId as well
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'price':
                setPrice(value);
                break;
            default:
                break;
        }
    };

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

        
        

        
        <div className="header-buttons">
            <button onClick={handleAddClick}> Add </button>
            <Link to="/Edit" className="activityLink">
                <button> Edit </button>
            </Link>
        </div>

        {/* Modal for Add/Edit Reward */}
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={isEditing ? updateReward : createReward} // Check if editing or adding
            formData={{ name, category, quantity, price }}
            onChange={handleChange}
            modalTitle={modalTitle}
        />

        
        
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
                        </tr>
                    ))}
                </tbody>
            </table>
    
            </div>
            
        </>
    );
}

export default ManageReward;

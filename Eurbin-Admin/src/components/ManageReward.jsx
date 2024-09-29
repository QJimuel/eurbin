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
    const [image, setImage] = useState(null); // State for the image
  
    const [rewardId, setRewardId] = useState(null);
    const [rewards, setRewards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Reward');

    const location = useLocation();  

    useEffect(() => {
        fetchRewards(); 
    }, []); 

    const fetchRewards = async () => {
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
            const formData = new FormData();
            formData.append('RewardName', name);
            formData.append('Category', category);
            formData.append('Quantity', parseInt(quantity, 10));
            formData.append('Price', parseFloat(price));
            if (image) {
                formData.append('Image', image); // Append image if exists
            }

            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                await fetchRewards();
                clearInput();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error('Error creating reward:', err);
            alert('An error occurred while creating the reward');
        }
    } 

    const updateReward = async () => {
        try {
            const formData = new FormData();
            formData.append('RewardName', name);
            formData.append('Category', category);
            formData.append('Quantity', parseInt(quantity, 10));
            formData.append('Price', parseFloat(price));
            if (image) {
                formData.append('Image', image); // Append image if exists
            }

            const response = await axios.put(`${API_URL}/${rewardId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                await fetchRewards();
                clearInput();
                setIsModalOpen(false); // Close modal after updating
            }
        } catch (err) {
            console.error('Error updating reward:', err);
            alert('An error occurred while updating the reward');
        }
    };

    const handleAddClick = () => {
        clearInput(); 
        setIsModalOpen(true);
        setModalTitle('Add Reward');
        setIsEditing(false); // Set editing state to false
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    };

    const clearInput = () => {
        setName('');
        setCategory('');
        setQuantity('');
        setPrice('');
        setImage(null); // Reset image
        setRewardId(null); 
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
            case 'image':
                setImage(e.target.files[0]); // Update the image
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
                onSubmit={isEditing ? updateReward : createReward}
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
                            <th>Quantity</th>
                            <th>Price (Smart Points)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rewards.map(reward => (
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

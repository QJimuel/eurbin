import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import Modal from './Modal'; // Import the Modal component
import ModalConfirmation from './ModalConfirmation';

function ManageReward() {
    const API_URL = 'https://eurbin.vercel.app/rewards';

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [rewardId, setRewardId] = useState(null);
    const [Reward, setRewards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Reward');
    const [sortOption, setSortOption] = useState(''); 

    const location = useLocation();  

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetchReward(); 
    }, []);
    
    const fetchReward = async () => {
        try {
            console.log('Fetching rewards...');
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
    
            if (response.status === 200 && Array.isArray(response.data.rewards)) {
                setRewards(response.data.rewards);
                console.log('Rewards fetched successfully:', response.data.rewards);
            } else {
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            console.error('Error fetching rewards:', err);
            alert('An error occurred while fetching rewards');
        }
    };
    

    const createReward = async () => {
        try {
            console.log('Creating reward with data:', { name, category, quantity, price, selectedImage });
            const formData = new FormData();
            formData.append('RewardName', name);
            formData.append('Category', category);
            formData.append('Quantity', parseInt(quantity, 10));
            formData.append('Price', parseFloat(price));
            if (selectedImage) {
                formData.append('Image', selectedImage);
                console.log('Image added to formData:', selectedImage.name);
            }
    
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` 
                }
            });
    
            if (response.status === 201) {
                console.log('Reward created successfully:', response.data);
                await fetchReward();
                clearInput();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error('Error creating reward:', err.response || err);
            alert('An error occurred while creating the reward');
        }
    };
    
    const updateReward = async () => {
        try {
            console.log('Updating reward with ID:', rewardId);
    
            const formData = new FormData();
            formData.append('RewardName', name);
            formData.append('Category', category);
            formData.append('Quantity', parseInt(quantity, 10));
            formData.append('Price', parseFloat(price));
    
            if (selectedImage) {
                formData.append('Image', selectedImage); // Add the selected image if available
                console.log('Image added to formData for update:', selectedImage.name);
            }
    
            const response = await axios.put(`${API_URL}/${rewardId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` 

                }
            });
    
            if (response.status === 200) {
                console.log('Reward updated successfully:', response.data);
                await fetchReward();
                clearInput();
                setIsModalOpen(false);
            }
        } catch (err) {
            console.error('Error updating reward:', err.response || err);
            alert('An error occurred while updating the reward');
        }
    };

 
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
        const [hoverAdd, setHoverAdd] = useState(false);
        const [hoverEdit, setHoverEdit] = useState(false);
    const handleAddClick = () => {
            setIsModalOpen(true); 
        };
    
        const handleCreateClick = () => {
            setIsConfirmationModalOpen(true); 
        };
    
        const handleConfirm = () => {
            createReward();  
            setIsConfirmationModalOpen(false); 
        };
    
        const handleCancel = () => {
            setIsConfirmationModalOpen(false); 
        };
    
        const handleCloseModal = () => {
            setIsModalOpen(false);
            clearInput(); // Clear inputs when closing the modal
        };

    const clearInput = () => {
        setName('');
        setCategory('');
        setQuantity('');
        setPrice('');
        setSelectedImage(null); // Clear selected image
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
            default:
                break;
        }
    };

    const handleImageChange = (file) => {
        console.log('Selected image:', file.name);
        setSelectedImage(file); // Update selected image
    };

    const sortRewards = (rewards) => {
        switch (sortOption) {
            case 'rewardName':
                return [...rewards].sort((a, b) => a.RewardName.localeCompare(b.RewardName));
            case 'quantity':
                return [...rewards].sort((a, b) => a.Quantity - b.Quantity);
            default:
                return rewards; 
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
            <button
                onClick={handleAddClick}
                className={hoverAdd ? "hButton hButtonHover addButton" : "hButton addButton"}
                onMouseEnter={() => setHoverAdd(true)}
                onMouseLeave={() => setHoverAdd(false)}
            >
                Add
            </button>
            <Link
                to="/Edit"
                className={hoverEdit ? "hButton hButtonHover editButton activityLink" : "hButton editButton activityLink"}
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
            >
                Edit
            </Link>
        </div>

        {/* Modal for Add/Edit Reward */}
    
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleCreateClick}
            formData={{ name, category, quantity, price }}
            onChange={handleChange}
            onImageChange={handleImageChange}
            modalTitle={modalTitle}
        />

       
        <ModalConfirmation
            isOpen={isConfirmationModalOpen}
            message="Are you sure you want to create this reward?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />

        <div className="table-container">
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>Reward Image</th>
                        <th>Reward Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price (Smart Points)</th>
                    </tr>
                </thead>
                <tbody>
                {sortRewards(Reward).map(reward => (
                    <tr key={reward._id}>
                        <td>
                            <img 
                                src={reward.Image} 
                                alt={reward.RewardName} 
                                style={{ width: '70px', height: '70px', borderRadius: '10px' }} 
                            />
                        </td>
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
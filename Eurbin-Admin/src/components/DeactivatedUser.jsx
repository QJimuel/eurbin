
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import ModalUser from './ModalUser';

function DeactivatedUser() {
    const API_URL = 'https://eurbin.vercel.app/user';
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUser();
      }, []);
    
      const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token'); // Adjust this according to your implementation

            const response = await axios.get(user_API_URL, {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            });
        
          if (response.status === 200 && response.data.users) {
            const activeUsers = response.data.users.filter(user => !user.isActive);
            setUser(activeUsers);
      
          } else {
            console.error('Unexpected data format:', response.data);
            alert('An error occurred: Unexpected data format');
          }
        } catch (err) {
          console.error('Error fetching totals:', err);
          alert('An error occurred while fetching totals');
        }
      };

      function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }

    const handleRowClick = (user) => {
        setSelectedUser(user); 
        setIsModalOpen(true);  
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null); 
    };

    
    return<>
        <h1 className="headings"> User Management </h1>

        <nav className="nav">
            <ul className="navList">
            <li >
                <Link to="/ManageUser" >
                <button className={location.pathname === "/ManageUser" ? "active-btn" : "inactive-btn"}>
                        Active Users
                    </button>
                </Link>
            </li>
            <li >
                <Link to="/DeactivatedUser" >
                <button className={location.pathname === "/DeactivatedUser" ? "active-btn" : "inactive-btn"}>
                        Deactivated Users
                    </button>
                </Link>
            </li>
            <li >
                <Link to="" >
                <button className={location.pathname === "/Transaction" ? "active-btn" : "inactive-btn"}>
                        T
                    </button>
                </Link>
            </li>
            <li >
                <Link to="" >
                <button className={location.pathname === "/Recycleables" ? "active-btn" : "inactive-btn"}>
                        Re
                    </button>
                </Link>
            </li>
            </ul>
        </nav>
      <br/>
      <br/>
      <br/>
         
       


        <div className="table-container">
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Year Level</th>
                        <th>Creation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map(item => (
                        <tr key={user._id} onClick={() => handleRowClick(item)}>
        
                            <td>{item.userId}</td>
                            <td>{item.userName}</td>
                            <td>{item.email}</td>
                            <td>{item.department}</td>
                            <td>{item.yearLevel}</td>
                            <td>{formatDate(item.creationDate)}</td>
                            
                            
                        </tr>
                    ))}
                </tbody>
            </table>
    
            </div>

            <ModalUser 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                user={selectedUser} 
                button= "Activate"
            />
    
    </> ;
    
}
export default DeactivatedUser;
import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalAddContent from './ModalAddContent'; 

function ContentManagement() {
    const API_URL = 'https://eurbin.vercel.app/contents';

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [contentId, setContentId] = useState(null);
    const [contents, setContents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('Add Content');

    useEffect(() => {
        fetchContents();
    }, []); 
    const fetchContents = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
    
            if (response.status === 200 && Array.isArray(response.data.content)) {
                setContents(response.data.content); 
            } else {
                console.error('Unexpected data format:', response.data);
                alert('An error occurred: Unexpected data format');
            }
        } catch (err) {
            console.error('Error fetching contents:', err);
            alert('An error occurred while fetching contents');
        }
    };
    
    
    const updateIsPosted = async (contentId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            
            const response = await axios.patch(
                `${API_URL}/${contentId}`,
                { isPosted: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Add the token as a Bearer token in the header
                    }
                }
            );
    
            if (response.status === 200) {
                await fetchContents(); 
            }
        } catch (err) {
            console.error('Error updating content:', err);
            alert('An error occurred while updating the content');
        }
    };

    const token = localStorage.getItem('token'); // Retrieve token from local storage

    const disableContent = async (contentId) => {
        try {
            const response = await axios.patch(
                `${API_URL}/disable/${contentId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Add the token to the headers
                    }
                }
            );

            if (response.status === 200) {
                await fetchContents();
            }
        } catch (err) {
            console.error('Error disabling content:', err);
            alert('An error occurred while disabling the content');
        }
    };

    const deleteContent = async (contentId) => {
        try {
            const response = await axios.delete(`${API_URL}/${contentId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the headers
                }
            });

            if (response.status === 200) {
                await fetchContents(); // Refresh the contents list after deletion
            }
        } catch (err) {
            console.error('Error deleting content:', err);
            alert('An error occurred while deleting the content');
        }
    };

    const createContent = async () => {
        try {
            const newContent = {
                subject,
                description,
            };

            const response = await axios.post(API_URL, newContent, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the headers
                }
            });

            if (response.status === 201) {
                await fetchContents(); 
                clearInput();
                setIsModalOpen(false); 
            }
        } catch (err) {
            console.error('Error creating content:', err);
            alert('An error occurred while creating the content');
        }
    };


    const clearInput = () => {
        setSubject('');
        setDescription('');
        setContentId(null); 
    };

    const handleAddClick = () => {
        clearInput(); 
        setIsModalOpen(true); 
        setModalTitle('Add Content');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <h1 className='headings'>Content Management</h1>

            <div className="header-buttons">
                <button onClick={handleAddClick}>Add Content</button>
            </div>

            <ModalAddContent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={createContent}
                subject={subject}
                setSubject={setSubject}
                description={description}
                setDescription={setDescription}
            />

            <div className="table-container">
                <table className="w3-table-all">
                    <thead>
                        <tr className="w3-light-grey">
                            <th>Content ID</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map(content => (
                            <tr key={content._id}>
                                <td>{content.contentId}</td>
                                <td>{content.subject}</td>
                                <td>{content.description}</td>
                                <td>{new Date(content.date).toLocaleString()}</td>
                                <td className="cmBtnCont">
                                    {!content.isPosted ? (
                                        <button 
                                            className="cmBtn" 
                                            style={{ backgroundColor: '#4CAF50' }} 
                                            onClick={() => updateIsPosted(content.contentId)}
                                        >
                                            Enable
                                        </button>
                                    ) : (
                                        <button 
                                            className="cmBtn" 
                                            style={{ backgroundColor: '#F44336' }} 
                                            onClick={() => disableContent(content.contentId)}
                                        >
                                            Disable
                                        </button>
                                    )}
                                    <button 
                                        className="cmBtn" 
                                        style={{ backgroundColor: '#F44336' }} 
                                        onClick={() => deleteContent(content.contentId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ContentManagement;

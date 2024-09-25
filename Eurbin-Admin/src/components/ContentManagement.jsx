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
            const response = await axios.get(API_URL);
            console.log('API Response:', response.data); 

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
            const response = await axios.patch(`${API_URL}/${contentId}`, { isPosted: true });
    
            if (response.status === 200) {
                await fetchContents(); 
            }
        } catch (err) {
            console.error('Error updating content:', err);
            alert('An error occurred while updating the content');
        }
    };

    const disableContent = async (contentId) => {
        try {
            const response = await axios.patch(`${API_URL}/disable/${contentId}`);
    
            if (response.status === 200) {
                await fetchContents(); // Refresh the contents list
            }
        } catch (err) {
            console.error('Error disabling content:', err);
            alert('An error occurred while disabling the content');
        }
    };
    

    const createContent = async () => {
        try {
            const newContent = {
                subject,
                description,
            };

            const response = await axios.post(API_URL, newContent);

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

            {/* Modal for Add Content */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {contents.map(content => (
                            <tr key={content._id}>
                                <td>{content.contentId}</td>
                                <td>{content.subject}</td>
                                <td>{content.description}</td>
                                <td>{new Date(content.date).toLocaleString()}</td>

                                {!content.isPosted ? (
                                    <button onClick={() => updateIsPosted(content.contentId)}>Post</button>
                                ) :(
                                    <button  onClick={() => disableContent(content.contentId)}>Disable</button>
                                )}
                                            
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ContentManagement;
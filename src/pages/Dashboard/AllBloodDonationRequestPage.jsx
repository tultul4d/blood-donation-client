import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

;

const AllBloodDonationRequestPage = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get('/requests')
            .then(res => setRequests(res.data))
            .catch(err => console.error('Error fetching requests:', err));
    }, [axiosSecure]);

    const handleStatusChange = (id, status) => {
        axiosSecure.put(`/requests/${id}/status`, { status })
            .then(() => {
                const updatedRequests = requests.map(req => req._id === id ? { ...req, status } : req);
                setRequests(updatedRequests);
            })
            .catch(err => console.error('Error updating request status:', err));
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/requests/${id}`)
            .then(() => {
                const updatedRequests = requests.filter(req => req._id !== id);
                setRequests(updatedRequests);
            })
            .catch(err => console.error('Error deleting request:', err));
    };

    return (
        <section>
            <h2>All Blood Donation Requests {requests.length} </h2>
            <div className="request-list">
                {requests.map(request => (
                    
                    <div key={request._id} className="request-card">
                    <h2></h2>
                        <h3>{request.recipientName}</h3>
                        <p>{request.location}</p>
                        <p>{request.donationDate}</p>
                        <p>Status: {request.status}</p>
                        <button onClick={() => handleStatusChange(request._id, 'inprogress')}>Mark In Progress</button>
                        <button onClick={() => handleStatusChange(request._id, 'done')}>Mark Done</button>
                        <button onClick={() => handleDelete(request._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllBloodDonationRequestPage;

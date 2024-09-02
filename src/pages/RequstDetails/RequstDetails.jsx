import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const RequstDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        fetch(`http://localhost:5000/request/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Request not found');
                }
                return res.json();
            })
            .then((data) => {
                setRequest(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleDonateClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleConfirmDonation = () => {
        fetch(`http://localhost:5000/request/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ donationStatus: 'In Progress', donorName: user.displayName, donorEmail: user.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRequest(data);
                setIsModalOpen(false);
            })
            .catch((error) => console.error('Error updating donation status:', error));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!request) return <p>Request not found.</p>;

    return (
        <div className="container mx-auto items-center w-auto p-6 bg-slate-300 rounded-lg mt-6 mb-6">
            <h1 className="text-xl font-bold mb-6 text-center">Donation Request</h1>
            <div className='flex justify-around'>
                <p><strong>Recipient Name:</strong> {request.recipientName}</p>
                <p><strong>Date:</strong> {request.donationDate}</p>
                <p><strong>Time:</strong> {request.donationTime}</p>
            </div>
            <div className='flex justify-around mt-8'>
                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                <p><strong>Full Address:</strong> {request.fullAddress}</p>
            </div>
            <div className='text-center mt-10'>
                <p><strong>Message:</strong> {request.requestMessage}</p>
            </div>
            <div className="text-center">
                <button onClick={handleDonateClick} className="btn btn-primary mt-6">Donate</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="font-bold text-lg mb-4">Confirm Donation</h2>
                        <p><strong>Donor Name:</strong> {user?.displayName}</p>
                        <p><strong>Donor Email:</strong> {user?.email}</p>
                        <div className="flex justify-end mt-6">
                            <button onClick={handleConfirmDonation} className="btn btn-primary mr-2">Confirm</button>
                            <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequstDetails;

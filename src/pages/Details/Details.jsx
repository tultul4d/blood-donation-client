import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

const Details = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext)// Assumed you have an Auth context to get the logged-in user
    const [request, setRequest] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/request/${id}`)
            .then(res => res.json())
            .then(data => {
                setRequest(data);
            })
            .catch(error => console.error('Error fetching request:', error));
    }, [id]);

    const handleDonate = () => {
        setModalIsOpen(true);
    };

    const handleConfirmDonation = () => {
        // Update the request status to 'inprogress'
        fetch(`http://localhost:5000/request/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ donationStatus: 'inprogress', donorName: user.name, donorEmail: user.email })
        })
        .then(res => res.json())
        .then(data => {
            setRequest(data);
            setModalIsOpen(false);
        })
        .catch(error => console.error('Error updating request:', error));
    };

    if (!request) {
        return <div>Loading...</div>;
    }
    return (
        <div className="request-details">
        <h2 className="text-2xl mb-4">Donation Request Details</h2>
        <p>Recipient Name: {request.recipientName}</p>
        <p>Location: {request.recipientDistrict}</p>
        <p>Date: {request.donationDate}</p>
        <p>Time: {request.donationTime}</p>
        <p>Message: {request.requestMessage}</p>
        <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Donate
        </button>

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <h2>Confirm Donation</h2>
            <form>
                <div>
                    <label>Donor Name</label>
                    <input type="text" value={user?.name} readOnly className="border p-2 w-full" />
                </div>
                <div>
                    <label>Donor Email</label>
                    <input type="email" value={user?.email} readOnly className="border p-2 w-full" />
                </div>
                <button type="button" onClick={handleConfirmDonation} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                    Confirm
                </button>
            </form>
        </Modal>
    </div>
    );
};

export default Details;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";


const Donor = () => {

    const [donationRequests, setDonationRequests] = useState([]);
    const [userName, setUserName] = useState('');
    const [request, setRequest] = useState([]); // Fetch from user context or API
    const { user } = useContext(AuthContext);
    // const remaining = donationRequests.filter(donor => donor.email === user?.email);
    // console.log(remaining);

    useEffect(() => {
        // Fetch the donor's name and donation requests (limit 3)
        fetch('http://localhost:5000/request')
            .then(response => response.json())
            .then(data => {
                const userRequests = data.filter(request => request.requesterEmail === user?.email);
                // Take only the 3 most recent requests
                setDonationRequests(userRequests.slice(0, 3));
                // Fetch donor's name
                setUserName('Donor Name');
            });
    }, [user?.email]);


    const changeStatus = (id, newStatus) => {
        fetch(`http://localhost:5000/request/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => response.json())
            .then(data => {
                // Optionally update the UI after a successful status change
                setDonationRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: newStatus } : request
                    )
                );
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleDelete = (id) => {
        // First, optimistically update the state by removing the item
        const updatedRequest = donationRequests.filter(request => request._id !== id);
        setDonationRequests(updatedRequest);
    
        // Then, make the delete request to the server
        fetch(`http://localhost:5000/request/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(() => {
                console.log('Request deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting request:', error);
    
                // Optionally, roll back the state if the delete request fails
                setDonationRequests(prevRequests => [...prevRequests, donationRequests.find(request => request._id === id)]);
            });
    };
    

    // const handleDelete = (id) => {
    //     fetch(`http://localhost:5000/request/${id}`, { method: 'DELETE' })
    //         .then(res => res.json())
    //         .then(() => {
    //             const updatedRequest = request.filter(request => request._id !== id);
    //             setRequest(updatedRequest);
    //         })
    //         .catch(error => console.error('Error deleting blog:', error));
    // };
    console.log(userName);
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6">Welcome, {user?.displayName
            }!</h1>

            {donationRequests.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-6 text-left text-gray-700">Recipient Name</th>
                                <th className="py-3 px-6 text-left text-gray-700">Location</th>
                                <th className="py-3 px-6 text-left text-gray-700">Date</th>
                                <th className="py-3 px-6 text-left text-gray-700">Time</th>
                                <th className="py-3 px-6 text-left text-gray-700">Status</th>
                                <th className="py-3 px-6 text-left text-gray-700">Donor Info</th>
                                <th className="py-3 px-6 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donationRequests.map(request => (
                                <tr key={request.id} className="border-b">
                                    <td className="py-3 px-6">{request.

                                        hospitalName}</td>
                                    <td className="py-3 px-6">{` ${request.fullAddress}`}</td>
                                    <td className="py-3 px-6">{request.
                                        donationDate}</td>
                                    <td className="py-3 px-6">{request.
                                        donationTime}</td>
                                    <td className="py-3 px-6">{request.
                                        donationStatus}</td>
                                    <td className="py-3 px-6">{request.
                                        donationStatus === 'inprogress' && `${request.donorName}, ${request.donorEmail}`}</td>
                                    <td className="py-3 px-6 space-x-2">
                                        {request.
                                            donationStatus === 'inprogress' && (
                                                <>
                                                    <button
                                                        onClick={() => changeStatus(request.id, 'done')}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                                    >
                                                        Done
                                                    </button>
                                                    <button
                                                        onClick={() => changeStatus(request.id, 'canceled')}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        <Link to={`/dashboard/edit/${request._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                                            Edit
                                        </Link>
                                        {/* <button
                                            onClick={() => deleteRequest(request.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button> */}

                                        <button className="btn btn-outline btn-info mt-10" onClick={() => handleDelete(request._id)}>Delete</button>
                                        <Link to={`/dashboard/details/${request.id}`} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No donation requests yet.</p>
            )}
            {/* <Link to="/dashboard/my-donation-requests" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                View My All Requests
            </Link> */}
        </div>
    );
};

export default Donor;
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";


const AllRequst = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const [userName, setUserName] = useState('');
    const { user } = useContext(AuthContext);
    useEffect(() => {
        // Fetch the donor's name and donation requests (limit 3)
        fetch('http://localhost:5000/request')
            .then(response => response.json())
            .then(data => {
                const userRequests = data.filter(request => request.requesterEmail === user?.email);
                // Take only the 3 most recent requests
                setDonationRequests(userRequests);
                // Fetch donor's name
                setUserName('Donor Name');
            });
    }, [user?.email]);

    // const changeStatus = (id, newStatus) => {
    //     fetch(`http://localhost:5000/request/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ status: newStatus }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Optionally update the UI after a successful status change
    //             setDonationRequests(prevRequests =>
    //                 prevRequests.map(request =>
    //                     request.id === id ? { ...request, status: newStatus } : request
    //                 )
    //             );
    //             console.log(data);
    //         })
    //         .catch(error => {
    //             console.error('Error updating status:', error);
    //         });
    // };

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
    return (
        <div className="p-6  min-h-screen rounded-xl mt-10 ml-5 bg-slate-200">
            <div className="hero bg-teal-600 mt-2   rounded-lg">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="lg:text-4xl md:text-sm text-sm font-mono">Welcome Our Donor</h1>
      <h2 className="text-xl font-mono">{
                user?.displayName ? user.displayName : 'back'
            }</h2> 
      
    </div>
  </div>
</div>

            {/* {donationRequests.length > 0 ? ( */}
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
                                        donationStatus === 'Pending' && `${request.
                                            requesterName}, ${request.
                                                requesterEmail}`}</td>
                                    <td className="py-3 px-6 space-x-2">
                                        
                                        <Link to={`/dashboard/edit/${request._id}`} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600">
                                            Edit
                                        </Link>
                                        

                                        <button className="btn btn-outline btn-info mt-2" onClick={() => handleDelete(request._id)}>Delete</button>
                                        <Link to={`/dashboard/view/${request._id}`} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            {/* ) : (
                <p>No donation requests yet.</p>
            )} */}
            <Link to="/addRequst" className="mt-4 inline-block bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-700">
                Go Back Requst
            </Link>
        </div>
    );
};

export default AllRequst;
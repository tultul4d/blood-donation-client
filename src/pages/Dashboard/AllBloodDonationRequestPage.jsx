import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const AllBloodDonationRequestPage = () => {
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);
    const [filter, setFilter] = useState("all"); // State for filtering

    const fetchDonationRequests = async () => {
        try {
            const response = await axiosSecure.get('/request');
            setDonationRequests(response.data);
        } catch (error) {
            console.error('Error fetching donation requests:', error);
        }
    };

    useEffect(() => {
        fetchDonationRequests();
    }, []);

    // Filter the donation requests based on the selected filter
    const filteredRequests = donationRequests.filter(request => 
        filter === "all" || request.donationStatus === filter
    );

    const changeStatus = (id, status) => {
        axiosSecure.put(`/request/${id}/status`, { status })
            .then(response => {
                const updatedRequests = donationRequests.map(request => 
                    request._id === id ? { ...request, donationStatus: status } : request
                );
                setDonationRequests(updatedRequests);
            })
            .catch(error => console.error('Error updating request status:', error));
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/request/${id}`)
            .then(() => {
                setDonationRequests(prevRequests => 
                    prevRequests.filter(request => request._id !== id)
                );
            })
            .catch(error => {
                console.error('Error deleting request:', error);
            });
    };

    return (
        <section>
            <div>
                <SectionTitle
                    heading="All Blood Donation Requests"
                    subHeading="Manage and review all donation requests"
                />

                {/* Filter Options as Button-like elements */}
                <div className="mb-4 space-x-2">
                    {["all", "Pending", "In Progress", "Completed", "Canceled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg 
                            ${filter === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
                            hover:bg-blue-600 transition-all duration-150`}
                        >
                            {status === "all" ? "All" : status}
                        </button>
                    ))}
                </div>

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            {/* <th>Hospital Name</th> */}
                            <th>Recipient location</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    {/* <td>{request.hospitalName}</td> */}
                                    <td>{request.fullAddress}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>{request.donationStatus}</td>
                                    <td className="py-3 px-6 space-x-2">
                                        {request.donationStatus === 'Pending' && (
                                            <>
                                                {/* <button
                                                    onClick={() => changeStatus(request._id, 'In Progress')}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                                                >
                                                    In Progress
                                                </button>
                                                <button
                                                    onClick={() => changeStatus(request._id, 'Completed')}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                                >
                                                    Completed
                                                </button>
                                                <button
                                                    onClick={() => changeStatus(request._id, 'Canceled')}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                                >
                                                    Cancel
                                                </button> */}
                                            </>
                                        )}
                                        <Link to={`/dashboard/edit/${request._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-outline btn-info mt-10"
                                            onClick={() => handleDelete(request._id)}
                                        >
                                            Delete
                                        </button>
                                        <Link to={`/dashboard/view/${request._id}`} className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No donation requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllBloodDonationRequestPage;

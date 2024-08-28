import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const AllBloodDonationRequestPage = () => {
    const axiosSecure = useAxiosSecure();
    const [donationRequests, setDonationRequests] = useState([]);
    console.log(donationRequests);

    const donationRequestss = async () => {
        try{
            const request = await axiosSecure.get('/request');
            setDonationRequests(request.data);

        }
        catch (error) {
            // clg 
        }
    };

    useEffect(() => {
        donationRequestss();
    }, [])
    

    const changeStatus = (id, newStatus) => {
        axiosSecure.put(`/request${id}`, { status: newStatus })
            .then(() => {
                setDonationRequests(prevRequests =>
                    prevRequests.map(request =>
                        request._id === id ? { ...request, donationStatus: newStatus } : request
                    )
                );
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/request${id}`)
            .then(() => {
                setDonationRequests(prevRequests => prevRequests.filter(request => request._id !== id));
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
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient Name</th>
                            <th>Hospital Name</th>
                            <th>Full Address</th>
                            <th>Donation Date</th>
                            <th>Donation Time</th>
                            <th>Donation Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donationRequests.length > 0 ? (
                            donationRequests.map((request, index) => (
                                <tr key={request._id}>
                                    <td>{index + 1}</td>
                                    <td>{request.recipientName}</td>
                                    <td>{request.hospitalName}</td>
                                    <td>{request.fullAddress}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>{request.donationStatus}</td>
                                    <td className="py-3 px-6 space-x-2">
                                        {request.donationStatus === 'Pending' && (
                                            <>
                                                <button
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
                                                </button>
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

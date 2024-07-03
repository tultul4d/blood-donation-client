import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const DonationRequest = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/request')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched data:', data); // Debugging
                const pendingRequests = data.filter(request => request.donationStatus === 'pending');
                console.log('Pending requests:', pendingRequests); // Debugging
                setRequests(pendingRequests);
            })
            .catch(error => console.error('Error fetching requests:', error));
    }, []);
    return (
       <section>
         <SectionTitle 
            heading= "Pending Blood Donation Requests"
            subHeading="best problroewihg  "
           ></SectionTitle>
        <div className="requests-page">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests.map(request => (
                    <motion.div 
                        key={request._id} 
                        className="border p-4 rounded"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl">{request.recipientName}</h3>
                        <p>Location: {request.recipientDistrict}</p>
                        <p>Date: {request.donationDate}</p>
                        <p>Time: {request.donationTime}</p>
                        <Link to={`/detail/${request._id}`} className="text-blue-500">
                            View
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
       </section>
    );
};

export default DonationRequest;
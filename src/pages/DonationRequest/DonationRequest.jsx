import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


const DonationRequest = () => {
    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        fetch('https://blood-donation-server-five.vercel.app/request')
            .then(res => res.json())
            .then(data => {
                // console.log('Fetched data:', data); 
                const pendingRequests = data.filter(request => request.donationStatus === 'Pending');
                // console.log('Pending requests:', pendingRequests); 
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
                        <h3 className="text-xl font-mono"> <span className="text-xl font-semibold">Recipient Name:</span>  {request.recipientName}</h3>
                        <p className="text-xl font-mono"><span className="text-xl font-semibold" >Location
                        </span>  {request.recipientDistrict}</p>
                        <p className="text-xl font-mono"><span className="text-xl font-semibold" >Date:</span> {request.donationDate}</p>
                        <p className="text-xl font-mono"><span className="text-xl font-semibold">Time:</span> {request.donationTime}</p>
                        <Link to={`/details/${request._id}`} className="text-blue-500">
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
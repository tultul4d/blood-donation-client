import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const RequestUpdate = () => {
    const request = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const recipientName = form.recipientName.value;
        const hospitalName = form.hospitalName.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const fullAddress = form.fullAddress.value;

        // Check if the volunteer is updating the donation status
        let donationStatus = request.donationStatus; // Default to existing status
        if (request.role === 'volunteer') {
            donationStatus = form.donationStatus.value;
        }

        const updated = {recipientName, hospitalName, fullAddress, donationDate, donationTime, donationStatus };

        fetch(`https://blood-donation-server-five.vercel.app/request/${request._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updated)
        })
        .then(res => res.json())
        .then(() => {
            navigate('/dashboard/donor');
        })
        .catch(error => console.error('Error updating request:', error));
    };

    return (
    <section>
        <SectionTitle
                heading="Update Form Our Requst"
                subHeading="Update  "
            ></SectionTitle>
        <div className="mt-10 ml-16">
            <form onSubmit={handleUpdate}>
                <h2 className="text-xl font-semibold">Name</h2>
            <input 
            
                    type="text" 
                    className="w-full" 
                    name="recipientName" 
                    defaultValue={request?.recipientName} 
                    placeholder="recipientName " 
                    required 
                />
                <br />
                <h2 className="text-xl font-semibold">HospitalName</h2>
                <input 
                    type="text" 
                    className="w-full" 
                    name="hospitalName" 
                    defaultValue={request?.hospitalName} 
                    placeholder="Hospital Name" 
                    required 
                />
                <br />
                <h2 className="text-xl font-semibold">FullAddress</h2>
                <input 
                    type="text" 
                    className="w-full"
                    name="fullAddress" 
                    defaultValue={request?.fullAddress} 
                    placeholder="Full Address" 
                    required 
                />
                <br />
                <h2 className="text-xl font-semibold">DonationDate</h2>
                <input 
                    type="text" 
                    className="w-full"
                    name="donationDate" 
                    defaultValue={request?.donationDate} 
                    placeholder="Donation Date" 
                    required 
                />
                <br />
                <h2 className="text-xl font-semibold">DonationTime</h2>
                <input 
                    type="text" 
                    className="w-full"
                    name="donationTime" 
                    defaultValue={request?.donationTime} 
                    placeholder="Donation Time" 
                    required 
                />
                <br />
               <h2 className="text-xl font-semibold">Status</h2>
                {request.role === 'volunteer' && (
                    <select name="donationStatus" defaultValue={request?.donationStatus} className="w-full">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                )}
                <br />
                <button type="submit" className="btn mt-5">Update</button>
            </form>
        </div>
    </section>
    );
};

export default RequestUpdate;

// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from 'react';
// import Modal from 'react-modal';
import {  useNavigate, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';


const RequstDetails = ({ currentUser }) => {
  const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch donation request details by ID
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
        if (!currentUser) {
            navigate('/login');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleConfirmDonation = () => {
        fetch(`http://localhost:5000/request/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'inprogress', donorName: currentUser.name, donorEmail: currentUser.email }),
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

      
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{request.recipientName} Donation Request</h1>
            <p><strong>Location:</strong> {request.location}</p>
            <p><strong>Date:</strong> {request.date}</p>
            <p><strong>Time:</strong> {request.time}</p>
            <p><strong>Hospital:</strong> {request.hospitalName}</p>
            <p><strong>Full Address:</strong> {request.fullAddress}</p>
            <p><strong>Message:</strong> {request.requestMessage}</p>

            <button onClick={handleDonateClick} className="btn btn-primary mt-6">Donate</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-box">
                        <h2 className="font-bold text-lg">Confirm Donation</h2>
                        <p><strong>Donor Name:</strong> {currentUser.name}</p>
                        <p><strong>Donor Email:</strong> {currentUser.email}</p>
                        <div className="modal-action">
                            <button onClick={handleConfirmDonation} className="btn btn-primary">Confirm</button>
                            <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                        </div>
                    </div>
                 
                </div>
            )}
        </div>
    );
};
    // const request = useLoaderData();
    // console.log(request);
    // // const { id } = useParams();
    // // const [request, setRequest] = useState(null);
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const donorName = 'Logged In User Name'; 
    // const donorEmail = 'loggedinuser@example.com';
  
    // useEffect(() => {
    //   fetch(`http://localhost:5000/request/${id}`)
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw new Error(`HTTP error! status: ${res.status}`);
    //       }
    //       return res.json();
    //     })
    //     .then((data) => setRequest(data))
    //     .catch((error) => {
    //       console.error('Error fetching request:', error);
    //       return error.response ? error.response.text() : null;
    //     })
    //     .then((text) => {
    //       console.log('Raw response text:', text);
    //     });
    // }, [id]);
//   console.log(data);

//   const handleDonate = () => {
//     setModalIsOpen(true);
//   };

//   const handleConfirmDonation = () => {
//     fetch(`http://localhost:5000/request/${_id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         donorName,
//         donorEmail,
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setRequest(data);
//         setModalIsOpen(true);
//       })
//       .catch((error) => console.error('Error updating request:', error));
//   };

//   if (!request) {
//     return <div>Loading...</div>;
//   }
   
//     // const request = useLoaderData();
//     return (
//         <div className="request-details">
//       <h2 className="text-2xl mb-4">Donation Request Details</h2>
//       <p>Recipient Name: {request.requesterName}</p>
//       {/* <p>Location: {request.recipientDistrict}, {request.recipientUpazila}</p> */}
//       <p>Date: {request.requesterName}</p>
//       <p>Time: {request.requesterName}</p>
//       {/* <p>Message: {request.requestMessage}</p> */}
//       {/* <p>Status: {request.donationStatus}</p> */}
//       {/* {request.donationStatus === 'pending' && (
//         <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Donate
//         </button>
//       )} */}
//       <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Donate
//         </button>

  

// <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//         <h2>Confirm Donation</h2>
//         <form>
//           <div>
//             <label>Donor Name</label>
//             <input type="text" value={donorName}  className="border p-2 w-full" />
//           </div>
//           <div>
//             <label>Donor Email</label>
//             <input type="email" value={donorEmail}   className="border p-2 w-full" />
//           </div>
//           <button
//             type="button"
//             onClick={handleConfirmDonation}
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//           >
//             Confirm
//           </button>
//         </form>
//       </Modal>
//     </div>
//     );
// };

export default RequstDetails;

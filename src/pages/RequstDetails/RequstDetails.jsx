// import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';


const RequstDetails = () => {
    const { id } = useParams();
  const [request, setRequest] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const donorName = 'Logged In User Name'; 
  const donorEmail = 'loggedinuser@example.com';


  useEffect(() => {
    fetch(`http://localhost:5000/request/${id}`)
      .then((res) => {
        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }
        return res.json();
      })
      .then((data) => setRequest(data))
      .catch((error) => console.error('Error fetching request:', error));
  }, [id]);

  const handleDonate = () => {
    setModalIsOpen(true);
  };

  const handleConfirmDonation = () => {
    fetch(`http://localhost:5000/request/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        donorName,
        donorEmail,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setRequest(data);
        setModalIsOpen(true);
      })
      .catch((error) => console.error('Error updating request:', error));
  };

  if (!request) {
    return <div>Loading...</div>;
  }
   
    // const request = useLoaderData();
    return (
        <div className="request-details">
      <h2 className="text-2xl mb-4">Donation Request Details</h2>
      <p>Recipient Name: {request.requesterName}</p>
      {/* <p>Location: {request.recipientDistrict}, {request.recipientUpazila}</p> */}
      <p>Date: {request.requesterName}</p>
      <p>Time: {request.requesterName}</p>
      {/* <p>Message: {request.requestMessage}</p> */}
      {/* <p>Status: {request.donationStatus}</p> */}
      {/* {request.donationStatus === 'pending' && (
        <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Donate
        </button>
      )} */}
      <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Donate
        </button>

  

<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Confirm Donation</h2>
        <form>
          <div>
            <label>Donor Name</label>
            <input type="text" value={donorName}  className="border p-2 w-full" />
          </div>
          <div>
            <label>Donor Email</label>
            <input type="email" value={donorEmail}   className="border p-2 w-full" />
          </div>
          <button
            type="button"
            onClick={handleConfirmDonation}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Confirm
          </button>
        </form>
      </Modal>
    </div>
    );
};

export default RequstDetails;

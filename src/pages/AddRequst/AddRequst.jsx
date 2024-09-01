import { useContext, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";


const AddRequst = () => {

    const { user } = useContext(AuthContext)

    

    const [requesterName, setRequesterName] = useState('');
    // const [thumbnail, setThumbnail] = useState('');
    const [requesterEmail, setRequesterEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientDistrict, setRecipientDistrict] = useState('');
    const [recipientUpazila, setRecipientUpazila] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donationTime, setDonationTime] = useState('');
    const [requestMessage, setRequestMessage] = useState('');
    // const [donationStatus, setDonationStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequst = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            recipientName,
            recipientDistrict,
            fullAddress,
            donationDate,
            donationTime,
            requestMessage,
         
            hospitalName,
            recipientUpazila,
            donationStatus: 'pending',


        };
        fetch('http://localhost:5000/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequst)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/dashboard/donor');
            })
            .catch(error => console.error('Error adding blog:', error));
    };
    return (
        <section>
            <SectionTitle
                heading="Form Our Requst"
                subHeading="Add Requst  "
            ></SectionTitle>
            <div className="container">
                <div className="formWrapper">
                    {/* <h2 className="heading  text-center mt-10 text-3xl font-semibold ">Add Blog</h2> */}
                    <form onSubmit={handleSubmit} className="form">
                        <div className="formGroup">
                            <label className="label text-base font-serif text-slate-900">
                                requesterName</label>
                            <input
                                type="text"
                                value={
                                    user?.displayName}
                                onChange={(e) => setRequesterName(e.target.value)}
                                required
                                disabled
                                className="input w-full"
                            />
                        </div>
                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                RequesterEmail</label>
                            <input
                                type="text"
                                value={user?.email} 
                                onChange={(e) => setRequesterEmail(e.target.value)}
                                required
                                disabled
                                className="input w-full"
                            />
                        </div>

                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                RecipientName</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setRecipientName(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>
                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">recipientDistrict</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setRecipientDistrict(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>
                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                recipientUpazila</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setRecipientUpazila(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>

                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">

                                hospitalName</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setHospitalName(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>


                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                fullAddress</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setFullAddress(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>

                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                donationDate</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setDonationDate(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>
                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                donationTime</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setDonationTime(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>
                        <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                requestMessage</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setRequestMessage(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div>
                        {/* <div className="formGroup">

                            <label className="label text-base font-serif text-slate-900">
                                donationStatus</label>
                            <input
                                type="text"
                                // value={thumbnail} 
                                onChange={(e) => setDonationStatus(e.target.value)}
                                required
                                className="input w-full"
                            />
                        </div> */}



                        {/* <div className="formGroup">
                        <label className="label text-base font-serif text-slate-900">Content</label>
                        <JoditEditor 
                            value={content} 
                            onChange={(newContent) => setContent(newContent)} 
                            className="editor"
                        />
                    </div> */}
                        <button type="submit" className="button text-center w-auto mt-10" style={{
                            display: 'block',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#fff',
                            backgroundColor: '#28a745',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            marginTop: '20px',
                        }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}>Create</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddRequst;

import { data } from "autoprefixer";
import {  useLoaderData, useNavigate } from "react-router-dom";


const RequstUpdate = () => {
    const request = useLoaderData();
    const navigate = useNavigate();
    const handleUpdate = event =>{
        event.preventDefault();
        const form = event.target;
        const hospitalName = form.hospitalName.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const donationStatus = form.donationStatus.value;
        const fullAddress = form.fullAddress.value;
        // const fullAddress = form.fullAddress.value;
        // console.log(name, date);
        const updated = {hospitalName, fullAddress, donationDate, donationTime, donationStatus}
        
        fetch(`http://localhost:5000/request/${request._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updated)

        })
        .then(res => res.json())
        .then(data => {
            navigate('/dashboard/donor');
        })
        .catch(error => console.error('Error adding blog:', error));
    };
  console.log(data);
   
    return (
        <div>
            {/* <h3>Update infomm {loadedProduct.name}</h3> */}
            <form onSubmit={handleUpdate}>
                <input type="text" className="w-full" name="hospitalName"  defaultValue={request?.hospitalName}/>
                <br />
                <input type="text" name="fullAddress"  defaultValue={request?.fullAddress}/>
                <br />
                <input type="text" name="donationDate"  defaultValue={request?.donationDate}/>
                <br />
                <input type="text" name="donationTime"  defaultValue={request?.donationTime}/>
                <br />
                   <input type="text" name="donationStatus"  defaultValue={request?.donationStatus}/>
                   <button><input className="btn"     type="submit" value="Update" /></button>
                
            </form>

        </div>
    );
};

export default RequstUpdate;
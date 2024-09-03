

const RequestItem = ({item}) => {
    const {recipientName, recipientDistrict, donationDate, donationTime,
      donationStatus} =item;
    return (
        <div className="  bg-gray-200  shadow-xl rounded-lg mb-10 p-6  ">
  
  <div className="card-body items-center text-slate-950 mb-8">
    <h2 className=""> <span className="font-semibold mb-10" >Name:</span>  {recipientName}</h2>
    <div className="flex flex-1 "><p>  <span className="font-semibold gap-2">District:</span> {recipientDistrict}</p>
    </div>
    <p> <span className="font-semibold">Status:</span>  {donationStatus}</p>
  </div>
 
  <div className="flex justify-around -mt-5 ">
    <p> <span className="font-semibold">Date:</span> {donationDate}</p>
    <p> <span className="font-semibold">Time:</span> {donationTime}</p>
    </div>
</div>
    );
};

export default RequestItem;
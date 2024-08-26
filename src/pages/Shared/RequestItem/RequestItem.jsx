

const RequestItem = ({item}) => {
    const {recipientName, recipientDistrict, donationDate, donationTime,
      donationStatus} =item;
    return (
        <div className="  bg-slate-900  shadow-xl rounded-lg mb-10  ">
  
  <div className="card-body items-center text-slate-200">
    <h2 className="card-title">{recipientName}</h2>
    <div className="flex flex-1 "><p>  <span className="font-semibold gap-2">District:</span>{recipientDistrict}</p>
    </div>
    <p> <span className="font-semibold">Status:</span>{donationStatus}</p>
  </div>
 
  <div className="flex justify-around -mt-5 text-slate-200">
    <p> <span className="font-semibold">Date:</span>{donationDate}</p>
    <p> <span className="font-semibold">Time:</span>{donationTime}</p>
    </div>
</div>
    );
};

export default RequestItem;